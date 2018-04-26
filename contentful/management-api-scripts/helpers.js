const { get } = require('lodash');

const LOCALE = 'en-US';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getField(entry, field, defaultVal = null) {
  return get(entry.fields[field], LOCALE, defaultVal);
}

// Catch and log any callback errors
function attempt(callback) {
  return callback().catch(error => console.log(error.message));
}

// Process either a single entry if specified in args, or all entries of provided content type.
async function processEntries(
  environment,
  args,
  logStream,
  entryType,
  process,
) {
  const entryId = args[`${entryType}-id`];
  if (entryId) {
    const entry = await attempt(() => environment.getEntry(entryId));

    if (!entry) {
      return;
    }

    return process(environment, entry, logStream);
  } else {
    const entries = await attempt(() =>
      environment.getEntries({
        content_type: entryType,
      }),
    );

    if (!entries) {
      return;
    }

    for (var i = 0; i < entries.items.length; i++) {
      const entry = entries.items[i];
      await process(environment, entry, logStream);
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

// Log content to the log file stream and to console.
function log(stream, content) {
  stream.write(content);
  console.log(content);
}

module.exports = {
  sleep,
  getField,
  attempt,
  linkReference,
  processEntries,
  log,
  constants: {
    LOCALE,
  },
};
