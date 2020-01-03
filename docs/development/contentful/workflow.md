# Workflow

Our Contentful space has three environments:

- **Master**: Hosts our production content, and used for editorial workflows.

- **QA**: An exact copy of Master, refreshed weekly. Used for QA-ing any new migrations changes before deploying or running on production.

- **Dev**: A sandbox environment consisting of test campaigns, beta content types, and dummy data. Developers can experiment here without breaking anything on the production end or adding clutter to the Master Environment. Migrations and new Content Types and fields can be fleshed out here, before moving forward to QA and Master.

We maintain an export file of each Contentful content type in code, in order to review changes to the Contentful content types changes by pull request.

## Process

To create or edit a content type(s):

1. Make the changes on Dev via Contentful UI

2. Export each content type added or edited, saving the migration to the relevant `contentful/content-types` file, e.g. `contentful/content-types/galleryBlock.js`

3. Open a pull request for review.

4. Upon merge, make changes to Contentful QA and Master.

For updates to existing Content types, make the corresponding changes via the Contentful UI on QA and Master.

For a brand new Content type, it’s easiest to run the new content type migration on qa and master directly from the Migrations CLI:

Run the migration from the project root using:

```bash
$ contentful-migration --space-id $SPACE_ID --access-token $CONTENTFUL_MANAGEMENT_ACCESS_TOKEN contentful/content-types/galleryBlock.js
```

If you have a `.contentfulrc.json` file setup in your home directory you can ommit specifying the `--access-token`.

You can obtain your user specific access token on Contentful within the Space Settings &gt; API Keys &gt; Personal Access Tokens.

When the Migration CLI runs, it will parse the script supplied, validate it, and then show you an execution plan if everything looks ok. Fix any errors, but DO NOT apply the migration when it prompts you.
