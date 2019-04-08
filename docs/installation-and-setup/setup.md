# Setup

## Install and Set Up Phoenix

You can follow the [installation instructions](installation.md) to install and set up Phoenix in your local development environment.

However, before running `php artisan phoenix:setup`, you are going to need a few permissions so that you can set the correct application keys and secret keys for proper access.

### Northstar

For your development environment you should use the Dev Northstar URL: `https://identity-dev.dosomething.org`

To gain access to a _Client ID_ and _Client Secret_, you will need to have the proper permissions set on your DoSomething account. Let a developer on the team know if you are unable to access [Aurora \(dev\)](https://admin-dev.dosomething.org/clients/dev-oauth) to obtain the two values.

### Contentful

Be sure to setup your [Contentful account](https://www.contentful.com/sign-up/) and request access to the _Phoenix_ project space, so that you can set the proper _Contentful Space ID_ and _Contentful API Key_ in your setup.

Once you gain access to Contentful and the _Phoenix_ space, you can find the values you need in the **Settings** tab and click on **Space Settings: API keys** in Contentful. Then click the **Phoenix [Development]** entry to obtain the _Space ID_ and _Content Preview API_ key access token.

### .ENV \(noun: /Dot EE EN VEE/\)

The `.env` file provides environment specific configurations that can be set differently depending on the environment \(local, qa, production, etc\). Here is what an [example .env](https://github.com/DoSomething/phoenix-next/blob/master/.env.example) looks like from the repository.

If running the Phoenix setup from scratch, a copy of this `.env.example` file will be made and renamed to `.env`. Make sure to update the new file with the corresponding values you need for your local setup.

### Preview API

For you local development environment, it may be helpful to use the **Content Preview API - access token** instead of the **Content Delivery API - access token**, so you can access unpublished, or "draft mode" work from Contentful. If you choose to do so, be sure to set the `CONTENTFUL_USE_PREVIEW_API` to `true` in your `.env` file, so that the Contentful configuration knows to access preview content.

### Contentful Caching

By default, the application is set up to cache Campaigns records fetched from Contentful for 15 mins. This can be frustrating when in active development mode, so feel free to set the `CONTENTFUL_CACHE` key to `false` in your `.env` file.

### Access and Permissions

There are a couple of other applications and sites that you will want access to for development:

- The [Dosomething Team](https://dashboard.heroku.com/teams/dosomething/overview) on [Heroku](https://www.heroku.com/) \(To access Preview Apps, Phoenix deployments and more\).
- The [Dosomething Organization](https://app.wercker.com/dosomething) on [Wercker](https://app.wercker.com) \(To access and re-trigger auto builds for _Pull Requests_\).

## Tips and Tidbits 🍩

### Dev & QA Environments

Once a _Pull Request_ is merged, a deploy to our _Development_ and _QA (staging)_ environment is automatically triggered.

The Development environment can be accessed at [https://www-dev.dosomething.org](https://www-dev.dosomething.org).

The QA environment can be accessed at [https://qa.dosomething.org](https://qa.dosomething.org).

### Review Apps

When a Pull Request is submitted, a temporary deploy is made from the feature branch. Read more about this in the [Heroku documentation for Review Apps](https://github.com/DoSomething/phoenix-next/wiki/Review-apps).
