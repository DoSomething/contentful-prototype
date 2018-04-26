const { get } = require('lodash');
const winston = require('winston');

const LOCALE = 'en-US';

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

function createLogger(title) {
  const format = winston.format.printf(
    info => (info.level === 'error' ? `error: ${info.message}` : info.message),
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

module.exports = {
  sleep,
  getField,
  attempt,
  linkReference,
  processEntries,
  createLogger,
  constants: {
    LOCALE,
  },
};
