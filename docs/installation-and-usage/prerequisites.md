# Prerequisites

To obtain access to the accounts described below, please reach out to someone on the Phoenix platform team via the team's channel in DoSomething chat.

## DoSomething Account

You should have a DoSomething.org account for each of our environments (Dev, QA, Production) and request admin access permissions for them, so you can log in and access Aurora, our Admin platform for each environment.

### Northstar + Aurora

For your development environment you should use the Northstar Development URL: `https://identity-dev.dosomething.org`

Once you have access to [Aurora \(dev\)](https://admin-dev.dosomething.org/clients/dev-oauth), retrieve the Northstar Dev OAuth **Client ID** and **Client Secret** credentials.

{% hint style="info" %}
If switching between the Northstar development environment and your local Northstar environment (or vice versa), you'll need to run `php artisan gateway:key` to pull down the appropriate public key from whichever environment folks are logging in from, so your local Phoenix can validate tokens.
{% endhint %}

## Laravel Homestead

Before getting started, you should have [Homestead](https://github.com/DoSomething/communal-docs/tree/master/Homestead) installed and set up on your computer. Homestead is a pre-packaged Vagrant box that provides a development environment to help get you up and running quickly!

## Contentful CMS

Additionally, we use [Contentful](https://www.contentful.com/) as our content management platform. Request an invitation to the DoSomething Contentful platform and setup an account, along with access to the _Phoenix_ space used for this project.

Within the Phoenix space, in **Settings > API keys > Phoenix \[Developement\]**, you can retrieve the `Space ID`, `Content Delivery API - access token` and the `Content Preview API - access token`, which are used as values for environment variables in Phoenix to properly load the platform in your local browser.

### Preview API

For you local development environment, it may be helpful to use the **Content Preview API - access token** as the value for the `CONTENTFUL_CONTENT_API_KEY` environment variable, instead of the **Content Delivery API - access token**, so you can access unpublished, or "draft mode" work from Contentful. If you choose to do so, be sure to set the `CONTENTFUL_USE_PREVIEW_API` to `true` in your `.env` file, so that the Contentful configuration knows to access preview content.

### Contentful Caching

By default, the application is set up to cache content records fetched from Contentful for a short duration. This can be frustrating when in active development mode and needing to see iterative changes, so feel free to set the `CONTENTFUL_CACHE` key to `false` in your `.env` file.

![DoSomething Bot](../.gitbook/assets/dsbot.png)
