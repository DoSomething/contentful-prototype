# Workflow

Our Contentful space has three environments:

- **Master**: Hosts our production content, and used for editorial workflows.

- **QA**: An exact copy of Master, refreshed weekly. Used for QA-ing any new migrations changes before deploying or running on production.

- **Dev**: A sandbox environment consisting of test campaigns, beta content types, and dummy data. Developers can experiment here without breaking anything on the production end or adding clutter to the Master Environment. Migrations and new Content Types and fields can be fleshed out here, before moving forward to QA and Master.

We maintain an export file of each Contentful content type in code, in order to review changes to the Contentful content types changes by pull request.

## Process

To create or edit a content type(s):

1. Create a new branch

2. Make the changes on **Dev** via Contentful UI

3. Export each content type added or edited, saving the migration to the relevant `contentful/content-types` file, e.g. `contentful/content-types/galleryBlock.js`

4. Open a pull request for review.

5. Upon merge, make changes to Contentful QA and Master.

### Update content type

For updates to existing Content types, make the corresponding changes via the Contentful UI on QA and Master.

### New content type

For brand new Content types, it’s easiest to run each new content type migration on qa and master directly from the [Contentful Migrations CLI](https://github.com/contentful/migration-cli). Run the migration from the project root using:

```bash
$ contentful-migration --space-id $SPACE_ID --access-token $CONTENTFUL_MANAGEMENT_ACCESS_TOKEN contentful/content-types/galleryBlock.js
```

If you have a `.contentfulrc.json` file setup in your home directory you can omit specifying the `--access-token`.

You can obtain your user specific access token on Contentful within the Space Settings &gt; API Keys &gt; Personal Access Tokens.
