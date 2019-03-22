// Transformation to all 11 facts pages boilerplate copy
// to reflect new brand language describing membership numbers.

const TARGET_COPY = 'a global movement of 6 million young people';
const UPDATED_COPY = 'a global movement of millions of young people';

module.exports = function(migration) {
  migration.transformEntries({
    contentType: 'page',
    from: ['slug', 'content'],
    to: ['content'],
    transformEntryForLocale: function(fromFields, currentLocale) {
      // Filter out non 11 facts pages by slug.
      if (
        !fromFields.slug ||
        !fromFields.slug[currentLocale].startsWith('facts/')
      ) {
        return;
      }

      const content = fromFields.content && fromFields.content[currentLocale];

      // Filter out empty pages.
      if (!content) {
        return;
      }

      // Filter out pages without the target copy.
      if (content.indexOf(TARGET_COPY) === -1) {
        return;
      }

      // Replace target copy with updated copy.
      const updatedContent = content.replace(TARGET_COPY, UPDATED_COPY);

      // Update the content field.
      return { content: updatedContent };
    },
  });
};
