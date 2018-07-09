# Contentful Content Management API Scripts

## Content Management API Scripts

### Migration CLI - where it works.

Contentful Migration scripts allow us to tamper with the content types themselves. Their structure and schema. Editing field names and validations.

There is also the option to perform transformations on actual content.

However, this is somewhat limited in scope to more direct and straightforward transformation. As opposed to anything more complex in nature or derivative of source entry fields and the link. Though the migration script has the option to perform transformations based on a derived source field, there must be a direct relationship between the source fields and the destination fields.

[This example](https://github.com/contentful/migration-cli/blob/master/examples/12-transform-content.js) is a perfect representation of a typical migration transformation script.

And [this one](https://github.com/contentful/migration-cli/blob/master/examples/15-derive-entry.js) of a more complex derived link transformation.

### Migration CLI - where it doesn't work

But in more advanced cases, the migration script does not provide the flexibility to perform more complex transformations and updates.

For example, we needed to go about porting over a multiple reference field in Campaigns into a new Page entry and then linking that new Page entry to the source campaign.

This is something way beyond the scope of the migration script.

### Content Management API - it's dope

For cases like these, we employ the usage of the [Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/).

The Content Management API affords us the flexibility to fetch specific Entries and access all of their fields, update those fields, create new entries, and provide those new entries with fields based off of some other source.

We use the [JS SDK](https://github.com/contentful/contentful-management.js) for this API, using some basic boilerplate setup across scripts to prevent repetition, but allowing any custom new transformations.

## Usage Instructions

### Process:

#### 1\) Create the script file

Create a new script file in `/contentful/management-api-scripts`.

Use the following the naming convention `20XX_XX_XX_001_what_this_script_does.js`. If there are multiple scripts created on a single calendar date, just keep increasing the three digit reference number `001`.

#### 2\) Basic setup

Import the contentful management api client

```javascript
const { contentManagementClient } = require('./contentManagementClient');
```

Create a callback function which can receive an `environment` parameter \(As well as an optional `args` parameter which will refer to to the command line arguments provided when the script is run\). These will be passed in from the contentManagementClient's `init` method.

```javascript
async function coolScript(environment, args) {
  console.log(args);
  const entities = await environment.getEntities();
  console.log(entities);
}
```

The `environment` param will be a [ContentfulEnvironmentAPI](https://contentful.github.io/contentful-management.js/contentful-management/5.0.0/ContentfulEnvironmentAPI.html) Object, tied to the specified space's `master` environment.

Finally, call the `contentManagementClient`'s `init` method - passing in your callback - to set things in motion:

```javascript
contentManagementClient.init(coolScript);
```

#### 3\) Push up a pull request with the script

Push up a pull request with the script. Make sure to also include any necessary code updates to account for the changes if either the code deploys before the script or the script is run before the code. Keep in mind that the script, once run will affect all content, including that on Production. So don't run a script that changes content without supporting code updates and deploys that would otherwise break the site!

#### 4\) Merge approved pull request

#### 5\) Run and apply the script

Once your script is approved and merged you're ready to run it in any up to date `node.js` environment!

You'll run the file as you would any regular `node.js` file, passing in the Contentful space ID and your access token:

```bash
$ node contentful/content-management-scripts/20XX_XX_001_logs_all_entries.js --space-id $SPACE_ID --access-token $CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
```

If your script utilizes the `processEntries` helper method from `/helpers`, than the script can either be applied to all entries of the provided type through the `--all` flag, or a single entry of the provided type through `--[contentType]-id [id]` \(e.g. `--campaign-id 12345`\).

#### Pro Tips

* Since, unlike the migration CLI, there is no way to initially run the script to see if it's valid. You might want to first go about testing with a dummy \(staging / personal\) Contentful Space to ensure your script will behave as intended!
* There is a suite of helper functions in `./helpers` containing some common logic we found ourselves running with these scripts.

