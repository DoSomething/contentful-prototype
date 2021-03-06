const { get } = require('lodash');
const winston = require('winston');

const LOCALE = 'en-US';

// Convert an int to a string. (Supports 0-10)
function convertNumberToWord(number) {
  switch (number) {
    case 0:
      return 'zero';
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    case 10:
      return 'ten';
    default:
      throw new Error('Number out of range');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getField(entry, field, defaultVal = null) {
  return get(entry.fields[field], LOCALE, defaultVal);
}

// Catch and log any callback errors
function attempt(callback) {
  return callback().catch(error => {
    winston.error(error.message);
  });
}

// Process either a single entry if specified in args, or all entries of provided content type.
async function processEntries(environment, args, entryType, process) {
  const entryId = args[`${entryType}-id`];
  if (entryId) {
    const entry = await attempt(() => environment.getEntry(entryId));

    if (!entry) {
      return;
    }

    await process(environment, entry);
  } else if (args['all']) {
    // We're going to run through pagination, collecting *all* entries for this
    // Content Type (1000 being the API limit). We'll first define our
    // method to grab a single batch from Contentful.
    const fetchEntries = async ({ skip }) =>
      attempt(() =>
        environment.getEntries({
          content_type: entryType,
          limit: 1000,
          skip,
        }),
      );

    // Fetch the initial batch of entries.
    let entries = await fetchEntries({ skip: 0 });

    if (!entries) {
      return;
    }

    // We'll store the cumulative mass of actual entry items in here.
    const entryItems = entries.items;

    // Ok, how many 'pages' do we need to run through to collect *all* entries?
    const pageCount = Math.ceil(entries.total / 1000);

    // For each subsequent page (we've already got the first),
    // fetch its batch of entries.
    for (let i = 1; i < pageCount; i++) {
      const additionalEntries = await fetchEntries({ skip: i * 1000 });

      if (additionalEntries) {
        entryItems.push(...additionalEntries.items);
      }
    }

    // Finally, yield each entry to the provided process function.
    for (let i = 0; i < entryItems.length; i++) {
      const entry = entryItems[i];

      await process(environment, entry);
    }
  }
}

// Generate an Entry Link reference object with provided ID
function linkReference(id) {
  return {
    sys: {
      type: 'Link',
      linkType: 'Entry',
      id,
    },
  };
}

// Configure and return a winston logger object (for easy logging to console and log file with specified title)
function createLogger(title) {
  const format = winston.format.printf(info =>
    info.level === 'error' ? `error: ${info.message}` : info.message,
  );
  const filename = `${__dirname}/logs/${title}_${new Date().getTime()}.txt`;
  winston.configure({
    transports: [
      new winston.transports.File({ filename, format }),
      new winston.transports.Console({ format }),
    ],
  });
  return winston;
}

// Return Contentful formatted fields object
function withFields(fields) {
  const entryFields = {};

  Object.keys(fields).forEach(
    fieldName => (entryFields[fieldName] = { [LOCALE]: fields[fieldName] }),
  );

  return { fields: entryFields };
}

module.exports = {
  sleep,
  getField,
  attempt,
  linkReference,
  processEntries,
  createLogger,
  withFields,
  convertNumberToWord,
  constants: {
    LOCALE,
  },
};
