const { contentManagementClient } = require('./contentManagementClient');
const { attempt, createLogger, sleep, withFields } = require('./helpers');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

const logger = createLogger('migrate_11_facts_from_ashes');

logger.info('1. Starting 11 Facts import script...');

async function getElevenFactsFromAshesAndCreatePagesInContentful(environment) {
  // Get the raw HTML from here: https://www.dosomething.org/us/about/here-are-all-11-facts
  logger.info('2. Getting raw HTML from 11 Facts list page');
  const rawFactsList = await JSDOM.fromURL(
    'https://www.dosomething.org/us/about/here-are-all-11-facts',
    '',
  );

  // Select all the 11 Facts link elements
  const factsLinksHTML = [
    ...rawFactsList.window.document.querySelectorAll(
      '.container__block > ul > li > a',
    ),
  ];
  logger.info('3. Got HTML from 11 Facts list page');

  // Push the each 11 Facts url into an array
  let factsLinks = [];
  factsLinksHTML.map(factPage => {
    factsLinks.push(factPage.href);
  });

  // Get the HTML from the urls and push into array & at the same time get the slugs
  logger.info(
    '4. Getting HTML from each 11 Facts page: ' + factsLinks.length + ' total',
  );
  let factsHtml = [];
  let allSlugs = [];

  for (i = 0; i < factsLinks.length; i++) {
    let html = await JSDOM.fromURL(factsLinks[i], '');
    let splitUrl = factsLinks[i].split('/');
    allSlugs.push(splitUrl[splitUrl.length - 1]);
    factsHtml.push(html);
  }
  logger.info('5. Got HTML from all 11 Facts pages');

  // Format the HTML into the markdown that we want for the page body for each 11 Facts page
  let allMarkdown = [];
  let allTitles = [];
  let boilerplate =
    'Welcome to [DoSomething.org](https://www.dosomething.org), a global movement of 6 million young people making positive change, online and off! The 11 facts you want are below, and the sources for the facts are at the very bottom of the page. After you learn something, Do Something! Find out how to [take action here](https://www.dosomething.org/us/campaigns).\n\n';
  let turndownService = new TurndownService();

  logger.info('6. Starting to format markdown');
  factsHtml.map(factHtml => {
    // Grab the title and add to array of all titles
    let title = [
      ...factHtml.window.document.querySelectorAll('.header__title'),
    ];
    title = turndownService.turndown(title[0]);
    allTitles.push(title);

    // Grab the 11 facts themselves
    let elevenFacts = [...factHtml.window.document.querySelectorAll('ol > li')];

    // Grab the sources
    let sources = [
      ...factHtml.window.document.querySelectorAll(
        'ul.js-footnote-hidden > li',
      ),
    ];

    // Make a counter so we can number the facts
    let counter = 1;

    // Store the markdown for this page here
    let markdown = boilerplate;

    // For each fact, format it!
    elevenFacts.map(fact => {
      // Turn the source into markdown
      source = turndownService.turndown(sources[counter - 1]);

      // Remove the numbers and newlines from the beginning of the source
      let noNewLines = source.split('\n');
      let plainSource = noNewLines[noNewLines.length - 1];

      // Put it all together!
      markdown +=
        counter +
        '. ' +
        turndownService.turndown(fact) +
        '^[' +
        plainSource +
        ']' +
        '\n';

      counter++;
    });

    // Add the markdown for this particular page into the master markdown array holding all 11 Facts pages
    allMarkdown.push(markdown);
    logger.info(
      'finished formatting markdown for page number: ' + allMarkdown.length,
    );
  });

  if ((!allMarkdown.length === allSlugs.length) === allTitles.length) {
    logger.info(
      'FAILURE!!!!!!! Got different numbers of titles, markdown entries, and slugs.',
    );
    logger.info('Titles: ' + allTitles.length);
    logger.info('Markdown entries: ' + allMarkdown.length);
    logger.info('Slugs: ' + allSlugs.length);
    return;
  }

  logger.info('7. Creating Contentful pages for each 11 Facts page');
  for (i = 0; i < allMarkdown.length; i++) {
    let factPage = await attempt(() =>
      environment.createEntry(
        'page',
        withFields({
          internalTitle: allTitles[i],
          title: allTitles[i],
          slug: 'facts/' + allSlugs[i],
          content: allMarkdown[i],
        }),
      ),
    );

    if (!factPage) {
      logger.info(
        'FAILURE!!!!!!! Failed to create Page in Contentful for ' +
          allTitles[i],
      );

      return;
    }

    logger.info(
      '-   Created Fact Page! ' + allTitles[i] + ` [ ID: ${factPage.sys.id}]`,
    );

    // Publish the newly created page
    const publishedFactPage = await attempt(() => factPage.publish());
    if (!publishedFactPage) {
      logger.info(
        'FAILURE!!!!!!! Failed to PUBLISH Page in Contentful for ' +
          allTitles[i] +
          ` [ ID: ${factPage.sys.id}]`,
      );

      return;
    }
    logger.info(
      '    -   Published Fact Page! ' +
        allTitles[i] +
        ` [ ID: ${factPage.sys.id}]`,
    );
  }
}

// Call the above function and pass it the environment
contentManagementClient.init(getElevenFactsFromAshesAndCreatePagesInContentful);
