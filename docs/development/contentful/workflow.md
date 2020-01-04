# Workflow

We maintain an export file of each Contentful content type in code, in order to use pull requests for reviewing changes to the Contentful content types. The export files are created via the [Contentful CLI](https://github.com/contentful/contentful-cli).

## Environments

Our Contentful space has three environments:

- **Master**: Hosts our production content, and used for editorial workflows.

- **QA**: An exact copy of Master, refreshed weekly. Used for QA-ing any new migrations changes before deploying or running on production.

- **Dev**: A sandbox environment consisting of test campaigns, beta content types, and dummy data. Developers can experiment here without breaking anything on the production end or adding clutter to the Master Environment. Migrations and new Content Types and fields can be fleshed out here, before moving forward to QA and Master.

## Process

To create or edit a Contentful content type(s):

### 1\) Create a new branch

We'll use this branch to open a pull request with or new or updated export file(s) per the content type changes we'll be making.

### 2\) Make the changes on **Dev** via Contentful UI

Use the web interface to create new content type, or add, update, or remove fields from existing content types.

### 3\) Export the changes as migrations

[Create a migration](https://github.com/contentful/contentful-cli/tree/master/docs/space/generate/migration) for each content type added or edited, saving the migration to the relevant `contentful/content-types` file, e.g. `contentful/content-types/galleryBlock.js`

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

### 4\) Create a pull request

Once you've added all changes into the `contentful/content-types` files, open a pull request for review.

### 5\) Upon merge, apply changes to Contentful QA and Master.

Once approved, the content type changes must manually be applied to the QA and Master environments.

#### Update content type

For updates to existing Content types, make the corresponding changes via the Contentful UI on QA and Master.

#### New content type

For brand new Content types, it’s easiest to run the CLI [import](https://github.com/contentful/contentful-cli/tree/master/docs/space/import) command to add new content types to qa and master:

```bash
$ contentful space import  --space-id $SPACE_ID --content-file contentful/content-types/galleryBlock.json
```

## Notes

The migrations found in the `contentful/migrations` directory are from an earlier iteration of this workflow. We no longer add migrations here, but these files [do have value in the sense that they track migrations/content types which haven’t been ported over yet over to the `content-types` dir](https://dosomething.slack.com/archives/CP2D7UGAU/p1578081688027000?thread_ts=1577991900.006100&cid=CP2D7UGAU).
