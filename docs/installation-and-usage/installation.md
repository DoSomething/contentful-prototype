# Installation

## .ENV \(noun: /Dot EE EN VEE/\)

The `.env` file provides environment specific configurations that can be set differently depending on the environment \(local, dev, qa, production, etc\). Here is what an [example .env](https://github.com/DoSomething/phoenix-next/blob/master/.env.example) looks like from the Phoenix repository.

When running the Phoenix `setup` command (as specified below) from scratch, a copy of this `.env.example` file will be made and renamed to `.env`, and it will prompt you to enter some of the environment variable values gathered during the [prerequisites section](prerequisites.md).

{% hint style="info" %}
When the `phoenix:setup` command is run, some values will already be present as defaults based on the `.env.example` file.
{% endhint %}

You will need the following values on hand for the installation process:

- Dev OAuth Client ID
- Dev OAuth Client Secret
- Contentful Space ID
- Contentful API Key (recommended to use the Preview API Key)

## Setup

Fork and clone the [Phoenix repository](https://github.com/DoSomething/phoenix-next) to your computer, and then [add it to your local Homestead](prerequisites#laravel-homestead) installation.

With the above specified environment variable values on hand, start the Homestead Vagrant box, then `ssh` into it, and `cd` into the Phoenix repository location and run:

```bash
# Install dependencies:
$ composer install && npm install

# Configure application & run migrations:
$ php artisan phoenix:setup

# And finally, build the frontend assets:
$ npm start
```

Once the above commands finish executing, you should be able to go to `http://phoenix.test` in your browser and load the Phoenix platform! 🔥
