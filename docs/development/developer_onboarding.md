# Developer Onboarding

## Install and Set Up Phoenix (next)

You can follow the [instructions](installation.md) to install and set up Phoenix (next) in your local development environment.

However, before running `php artisan phoenix:setup`, you are going to need a few permissions so that you can set the correct application keys and secrets for proper access.

### Northstar

For the most part, you can use the staging Northstar URL for your development environment: `https://northstar-thor.dosomething.org`

To gain access to an ID and SECRET, you will need to have the proper permissions set on your DoSomething account. Let a developer on the team know if you are unable to access [Aurora (staging)](https://aurora-thor.dosomething.org/clients).

### Contentful

Be sure to setup your [Contentful account](https://www.contentful.com/sign-up/) and request access to the project _Phoenix_ project space, so that you can set the proper _Contentful Space ID_ and _Contentful API Key_ in your setup.

Once you gain access to Contentful and the _Phoenix_ space, you can find the values you need in the **Space settings** tab and click on **API Keys** in Contentful. Then select the **Phoenix Next - local development** token.

### .ENV (noun: /Dot EE EN VEE/)

The `.env` file provides environment specific configurations that can be set differently depending on the environment (local, qa, production, etc). Here is what an [example .env](https://github.com/DoSomething/phoenix-next/blob/master/.env.example) looks like from the repository.

If running the Phoenix setup from scratch, a copy of this `.env.example` file will be made and renamed to `.env`. Make sure to update the new file with the corresponding values you need for your local setup.

### Preview API

For you local development environment, it may be helpful to use the **Content Preview API - access token** instead of the **Content Delivery API - access token**, so you can access unpublished, or "draft mode" work from Contentful. If you choose to do so, be sure to set the `CONTENTFUL_USE_PREVIEW_API` to `true` in your `.env` file.

### Contentful Caching

By default, the application is set up to cache Campaigns records fetched from Contentful for 15 mins. This can be frustrating when in active development mode, so feel free to set the `CONTENTFUL_CACHE` key to `false` in your `.env` file.

### Access and Permissions

There are a couple of other applications and sites that you will want access to for development:

* The [Dosomething Team](https://dashboard.heroku.com/teams/dosomething/overview) on [Heroku](https://www.heroku.com/) (To access Preview Apps, and more).
* The [Dosomething Organization](https://app.wercker.com/dosomething) on [Wercker](https://app.wercker.com) (To access and re-trigger auto builds for _Pull Requests_).

## Tips and Tidbits 🍩

### Preview Environment

Once a _Pull Request_ is merged, a deploy to our staging environment is automatically triggered.

The staging environment can be accessed at [https://phoenix-preview.dosomething.org](https://phoenix-preview.dosomething.org).

### Review Apps

When a Pull Request is submitted, a temporary deploy is made from the feature branch. Read more about this in the [Heroku documentation for Review Apps](https://github.com/DoSomething/phoenix-next/wiki/Review-apps).
