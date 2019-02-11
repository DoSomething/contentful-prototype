import { has } from 'lodash';
import MarkdownIt from 'markdown-it';
import iterator from 'markdown-it-for-inline';
import markdownItFootnote from 'markdown-it-footnote';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { contentfulImageUrl, isExternal } from '../helpers';

/**
 * Format any Contentful image URLs in Markdown string to resize them.
 *
 * @param  {String} string
 * @return {String}
 */
function formatImageUrls(string) {
  const pattern = /\/\/images\.(ctfassets\.net|contentful\.com).+\.(jpg|png)/g;
  const contentfulImageFormat = url => contentfulImageUrl(url, '1000');

  return string.replace(pattern, contentfulImageFormat);
}

/**
 * Format Standard Markdown to a standard markdown string.
 *
 * @param  {String|Array} markdown
 * @return {String}
 */
function formatStandardMarkdown(markdown) {
  // When directly writing content into a Markdown component, React may pass it as an
  // array of strings; if so, combine them to get the Markdown source!
  const formattedMarkdown = Array.isArray(markdown)
    ? markdown.join('')
    : markdown;

  return formatImageUrls(formattedMarkdown);
}

/**
 * Get a customized instance of MarkdownIt.
 *
 * @return {Object}
 */
function getMarkdownItInstance() {
  const markdownIt = new MarkdownIt();

  markdownIt.use(markdownItFootnote);
  markdownIt.use(iterator, 'url_new_win', 'link_open', (tokens, index) => {
    const token = tokens[index];
    const hrefIndex = token.attrIndex('href');
    const url = token.attrs[hrefIndex][1];

    if (isExternal(url)) {
      token.attrPush(['target', '_blank']);
    }
  });

  return markdownIt;
}

/**
 * Parse RichText Markdown to Markup.
 *
 * @param  {Object} markdown
 * @return {String}
 */
export function parseRichTextMarkdown(markdown) {
  // @TODO: more to come here. Stay tuned!

  return documentToHtmlString(markdown);
}

/**
 * Parse Standard Markdown to Markup.
 *
 * @param  {String|Array} markdown
 * @return {String}
 */
export function parseStandardMarkdown(markdown = '') {
  const markdownIt = getMarkdownItInstance();

  return markdownIt.render(formatStandardMarkdown(markdown));
}

/**
 * Create Markup from provided Markdown.
 *
 * @param  {String|Array|Object} markdown
 * @return {String}
 */
export function createMarkup(markdown) {
  return has(markdown, 'nodeType')
    ? parseRichTextMarkdown(markdown)
    : parseStandardMarkdown(markdown);
}
