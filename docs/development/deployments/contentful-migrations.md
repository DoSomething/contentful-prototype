# Contentful Migrations

We utilize the [Contentful Migrations CLI](https://github.com/contentful/migration-cli) to help with managing changes to our content models on Contentful. The Migration CLI allows us to create migration scripts that programmatically make the changes to a content type when they are run. Keeping changes to our content models in code allows us to better track our changes over time, and also allows modifying all instances of a content type in one fell swoop!

However, we need to establish a proper process for how we run these migrations, since we currently do not have a system in place to run these migration scripts as part of our build and deploy steps. Once we have fine-tuned our process we will be looking into adding it as a step in our deploys.

## Process

For the time being, follow these steps when creating Contentful migrations and subsequently running them:

### 1) Create the migration file

Create a new migration file in `/contentful/migrations`.

Use the following the naming convention `20XX_XX_XX_001_what_this_migration_does.js`. If there are multiple migrations created on a single calendar date, just keep increasing the three digit reference number `001`.

### 2) Perform a test run of the migration.

Run the migration from the project root using:

```bash
$ contentful-migration --space-id $SPACE_ID --access-token $CONTENTFUL_MANAGEMENT_ACCESS_TOKEN contentful/migrations/2018_02_23_001_what_this_migration_does.js
```

If you have a `.contentfulrc.json` file setup in your home directory you can ommit specifying the `--access-token`.

You can obtain your user specific access token on Contentful within the Space Settings > API Keys > Personal Access Tokens.

When the Migration CLI runs, it will parse the script supplied, validate it, and then show you an execution plan if everything looks ok. Fix any errors, but DO NOT apply the migration when it prompts you.

### 3) Push up a pull request with the migration script

Instead of applying the migration, push up a pull request with the script. Make sure to also include any necessary code updates to account for the changes if either the code deploys before the script or the script is run before the code. Keep in mind that the migration script, once run will affect all content, including that on Production. So don't run a script that changes a content type without supporting code updates and deploys that would otherwise break the site!

### 4) Merge approved pull request

### 5) Run and apply the migration script

### Pro Tip

Since, unlike the migration CLI, there is no way to initially run the script to see if it's valid. You might want to first go about testing with a dummy (staging / personal) Contentful Space to ensure your script will behave as intended!
