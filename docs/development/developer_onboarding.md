# Developer Onboarding

## Install and Set Up Phoenix (next)
You can follow the [instructions](installation.md) to install and set up Phoenix (next) in your local development environment.

However, before running `php artisan phoenix:setup`, you are going to need a few permissions so that you can set the correct application keys and secrets for proper access.


### Northstar
For the most part, you can use the staging **Northstar** URL for your development environment: `https://northstar-thor.dosomething.org`

To gain access to an ID and SECRET, you will need to have the proper permissions set on your DoSomething account. Let a developer on the team know if you are unable to access [Aurora (staging)](https://aurora-thor.dosomething.org/clients).


### Contentful
Be sure to setup your [Contentful account](https://www.contentful.com/sign-up/) and request access to the project **Phoenix** project space, so that you can set the proper _Contentful Space ID_ and _Contentful API Key_ in your setup.

Once you gain access to Contentful and the **Phoenix** space, you can find the values you need in the **Space settings** tab and click on **API Keys** in Contentful. Then select the **Phoenix Next - local development** token.


### .ENV (noun: /Dot EE EN VEE/)
Here's an example of how a typical `.env` file might look for a developer (with `random-string` replacing any auth data):

```
APP_ENV=local
APP_KEY=random-string
APP_DEBUG=true
APP_LOG_LEVEL=debug
APP_URL=http://phoenix.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=phoenix
DB_USERNAME=homestead
DB_PASSWORD=secret

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
SESSION_DRIVER=file
QUEUE_DRIVER=sync

CONTENTFUL_CONTENT_API_KEY=random-string
CONTENTFUL_USE_PREVIEW_API=false
CONTENTFUL_CONTENT_DELIVERY_API_KEY=random-string
CONTENTFUL_CONTENT_PREVIEW_API_KEY=some-other-random-string
CONTENTFUL_SPACE_ID=random-string
CONTENTFUL_CACHE=false

GLADIATOR_URL=https://gladiator-thor.dosomething.org
GLADIATOR_API_KEY=random-string

NORTHSTAR_URL=https://northstar-thor.dosomething.org
NORTHSTAR_AUTHORIZATION_ID=random-string
NORTHSTAR_AUTHORIZATION_SECRET=random-string

PHOENIX_URL=http://phoenix.test
PHOENIX_LEGACY_URL=https://thor.dosomething.org
PHOENIX_LEGACY_USERNAME=random-string
PHOENIX_LEGACY_PASSWORD=random-string

ROGUE_URL=https://rogue-thor.dosomething.org
ROGUE_API_KEY=random-string

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
REDIS_DB_NUMBER=1

MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

SIXPACK_ENABLED=true
SIXPACK_BASE_URL=http://phoenix.test:5000
SIXPACK_COOKIE_PREFIX=phoenix_next_local_sixpack
SIXPACK_TIMEOUT=null

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=

GOOGLE_ANALYTICS_ID=
FACEBOOK_APP_ID=random-string
CUSTOMER_IO_ID=
PUCK_URL=
```


### Preview API
For you local development environment, it may be helpful to use the **Content Preview API - access token** instead of the **Content Delivery API - access token**, so you can access unpublished, or "draft mode" work from Contentful. If you choose to do so, be sure to set the `CONTENTFUL_USE_PREVIEW_API` to `true` in your `.env` file.

### Contentful Caching
By default, the application is set up to cache Campaigns records fetched from Contentful for 15 mins. This can be frustrating when in active development mode, so feel free to set the `CONTENTFUL_CACHE` key to `false` in your `.env` file.

### Access and Permissions
There are a couple of other applications and sites that you will want access to for development:

- The [Dosomething Team](https://dashboard.heroku.com/teams/dosomething/overview) on [Heroku](https://www.heroku.com/) (To access Preview Apps, and more).
- The [Dosomething Organization](https://app.wercker.com/dosomething) on [Wercker](https://app.wercker.com) (To access and re-trigger auto builds for _Pull Requests_).


## Tips and Tidbits 🍩

### Staging Environment
Once a _Pull Request_ is merged, a deploy to our staging environment is automatically triggered.

The staging environment can be accessed at [https://phoenix-preview.dosomething.org](https://phoenix-preview.dosomething.org).

### Review Apps
When a Pull Request is submitted, a temporary deploy is made from the feature branch. Read more about this in the [Heroku documentation for Review Apps](https://github.com/DoSomething/phoenix-next/wiki/Review-apps).
