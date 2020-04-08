import React from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
import MarkdownIt from 'markdown-it';
import iterator from 'markdown-it-for-inline';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import markdownItFootnote from 'markdown-it-footnote';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { contentfulImageUrl, isExternal } from '.';
import ContentfulAsset from '../components/utilities/ContentfulAsset/ContentfulAsset';
import ContentfulEntryLoader from '../components/utilities/ContentfulEntryLoader/ContentfulEntryLoader';

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
 * Cleanup the provided markdown.
 *
 * @param  {String|Array} markdown
 * @return {String}
 */
function cleanupStandardMarkdown(markdown) {
  // When directly writing content into a Markdown component, React may pass it as an
  // array of strings; if so, combine them to get the Markdown source!
  const flattenedMarkdown = Array.isArray(markdown)
    ? markdown.join('')
    : markdown;

  return formatImageUrls(flattenedMarkdown);
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
 * Parse RichText Document to React components.
 *
 * @param  {Object} document
 * @param  {Object} styles
 * @return {String}
 */
export function parseRichTextDocument(
  document,
  classNameByEntry,
  classNameByEntryDefault,
  styles,
) {
  const hyperlinkColor = get(styles, 'hyperlinkColor', null);
  const textColor = get(styles, 'textColor', null);
  const fontSize = get(styles, 'fontSize', null);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1
          className={classnames(classNameByEntryDefault)}
          style={{ color: textColor }}
        >
          <span>{children}</span>
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          className={classnames(classNameByEntryDefault)}
          style={{ color: textColor }}
        >
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3
          className={classnames(classNameByEntryDefault)}
          style={{ color: textColor }}
        >
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4
          className={classnames(classNameByEntryDefault)}
          style={{ color: textColor }}
        >
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5
          className={classnames(classNameByEntryDefault)}
          style={{ color: textColor }}
        >
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6
          className={classnames(classNameByEntryDefault)}
          style={{ color: textColor }}
        >
          {children}
        </h6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) =>
        children[0] ? (
          <div className="base-12-grid">
            <p
              className={classnames(
                'col-start-2 col-span-7',
                classNameByEntryDefault,
              )}
              style={{ color: textColor, fontSize }}
            >
              {children}
            </p>
          </div>
        ) : null,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul
          className={classnames(classNameByEntryDefault, 'text-left', 'list')}
          style={{ color: textColor }}
        >
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol
          className={classnames(classNameByEntryDefault, 'text-left', 'list')}
          style={{ color: textColor }}
        >
          {children}
        </ol>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote
          className={classnames(classNameByEntryDefault, 'list')}
          style={{ color: textColor }}
        >
          {children}
        </blockquote>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: node => (
        <ContentfulEntryLoader
          className={classnames('component-entry', 'mb-6')}
          classNameByEntry={classNameByEntry}
          classNameByEntryDefault={classNameByEntryDefault}
          id={node.data.target.sys.id}
        />
      ),
      [BLOCKS.EMBEDDED_ASSET]: node => (
        <p
          className={classnames(
            classNameByEntryDefault,
            'component-entry',
            'text-center',
          )}
        >
          <ContentfulAsset id={node.data.target.sys.id} />
        </p>
      ),
      [INLINES.HYPERLINK]: node => {
        const external = isExternal(node.data.uri);

        return (
          <a
            href={node.data.uri}
            target={external ? '_blank' : '_self'}
            rel={external ? 'noopener noreferrer' : ''}
            style={{ color: hyperlinkColor }}
          >
            {node.content[0].value}
          </a>
        );
      },
    },
  };

  return documentToReactComponents(document, options);
}

/**
 * Parse Standard Markdown to Markup.
 *
 * @param  {String|Array} markdown
 * @return {String}
 */
export function parseStandardMarkdown(markdown = '') {
  const markdownIt = getMarkdownItInstance();

  return markdownIt.render(cleanupStandardMarkdown(markdown));
}
