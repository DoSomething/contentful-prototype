# Workflow

Our Contentful space has three environments:

- **Master**: Hosts our production content, and used for editorial workflows.

- **QA**: An exact copy of Master, refreshed weekly. Used for QA-ing any new migrations changes before deploying or running on production.

- **Dev**: A sandbox environment consisting of test campaigns, beta content types, and dummy data. Developers can experiment here without breaking anything on the production end or adding clutter to the Master Environment. Migrations and new Content Types and fields can be fleshed out here, before moving forward to QA and Master.

We maintain an export file of each Contentful content type in code, in order to review changes to the Contentful content types changes by pull request. The export files are created via the [Contentful CLI](https://github.com/contentful/contentful-cli).

## Process

To create or edit a content type(s):

1. Create a new branch

2. Make the changes on **Dev** via Contentful UI

3. [Create a migration](https://github.com/contentful/contentful-cli/tree/master/docs/space/generate/migration) for each content type added or edited, saving the migration to the relevant `contentful/content-types` file, e.g. `contentful/content-types/galleryBlock.js`

```bash
$ contentful space generate migration -s $SPACE_ID -e dev -c galleryBlock -f contentful/content-types/galleryBlock.js
```

Upon success, you'll see:

```bash
$ contentful space generate migration -s $SPACE_ID -e dev -c galleryBlock -f contentful/content-types/galleryBlock.js

Fetching content model
Creating migration for content type: 'galleryBlock'
Fetching editor interface
Migration file created at contentful/content-types/galleryBlock.js
```

4. Open a pull request for review.

5. Upon merge, make changes to Contentful QA and Master.

### Update content type

For updates to existing Content types, make the corresponding changes via the Contentful UI on QA and Master.

### New content type

For brand new Content types, it’s easiest to run the CLI [import](https://github.com/contentful/contentful-cli/tree/master/docs/space/import) command to add new content types to qa and master:

```bash
$ contentful space import  --space-id $SPACE_ID --content-file contentful/content-types/galleryBlock.json
```
