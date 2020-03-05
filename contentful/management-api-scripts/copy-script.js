const { join } = require('path');
const { get } = require('lodash');
const parseArgs = require('minimist');
const { isBefore } = require('date-fns');
const contentful = require('contentful-management');
const {
  attempt,
  constants,
  convertNumberToWord,
  createLogger,
  getField,
  processEntries,
  linkReference,
  sleep,
  withFields,
  run,
} = require('./helpers');

const { LOCALE } = constants;

async function runIt() {
  const client = contentful.createClient({
    accessToken: '',
  });
  const space = await client.getSpace('81iqaqpfd8fy');
  const environment = await space.getEnvironment('master');
  const devEnvironment = await space.getEnvironment('dev');

  async function copy(id, isAsset = false) {
    let entry;
    if (isAsset) {
      entry = await attempt(() => environment.getAsset(id));
    } else {
      entry = await attempt(() => environment.getEntry(id));
    }

    const entryType = get(entry, 'sys.contentType.sys.id', entry.sys.type);

    const fieldNames = Object.keys(entry.fields);

    const fieldCopies = {};

    for (let j = 0; j < fieldNames.length; j++) {
      const fieldName = fieldNames[j];

      let field = getField(entry, fieldName);
      if (field) {
        if (Array.isArray(field) && field[0].sys) {
          for (let i = 0; i < field.length; i++) {
            fieldVal = field[i];
            const isFieldAsset = get(fieldVal, 'sys.linkType') === 'Asset';
            const fieldValId = get(fieldVal, 'sys.id');
            if (fieldValId) {
              fieldCopy = await attempt(() => copy(fieldValId, isFieldAsset));
              if (fieldCopy) {
                const fieldCopyLink = linkReference(
                  fieldCopy.sys.id,
                  isFieldAsset ? 'Asset' : 'Entry',
                );
                field[i] = fieldCopyLink;
              }
            }
          }
        } else if (get(field, 'sys.type') === 'Link') {
          const isFieldAsset = field.sys.linkType === 'Asset';
          const fieldEntry = await attempt(() =>
            copy(field.sys.id, isFieldAsset),
          );
          field = linkReference(
            get(fieldEntry, 'sys.id'),
            isFieldAsset ? 'Asset' : 'Entry',
          );
        }

        fieldCopies[fieldName] = field;
      }
    }

    const copyObj = await attempt(() => {
      console.log(entryType);
      if (entryType === 'Asset') {
        return devEnvironment.createAsset(withFields(fieldCopies));
      } else {
        return devEnvironment.createEntry(entryType, withFields(fieldCopies));
      }
    });

    if (copyObj) {
      await attempt(() => copyObj.publish());
    }

    return copyObj;
  }

  copy('6LQzMvDNQcYQYwso8qSkQ8');
}

runIt();

const logger = createLogger('testing');

// const entries = await attempt(() => environment.getAssets({limit: 1000 }));
// if (environment.name === 'dev') {
//  console.log(environment);
//  for (let i = 0; i < entries.items.length; i++) {
//    console.log(i);
//    const entry = entries.items[i];
//    console.log(entry.sys.id, ' ', getField(entry, 'internalTitle'));
//    await attempt( () => entry.unpublish());
//    await attempt(() => entry.delete());
//  }
// }
