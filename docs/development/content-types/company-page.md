# Company Page

## Overview

Displays static organizational 'about' information. Company Pages are accessed via an `/about/:slug` URL. Company Pages display in a wider grid template contrary to article/11-facts pages which have a narrower 'article friendly' layout.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc. (does _not_ display to the user on the company page).

- **Slug**: The URL slug, which we prefix with `/about/`. e.g. `dosomething.org/about/our-team`.

- **Cover Image** _(optional)_: Displays at the top of the page.

- **Title**: The title of the page.

- **Subtitle**: The subtitle of the page

- **Content**: The Rich Text content of the page. This can be content in markdown format, embedded Assets, or valid embedded entry blocks.

## Technical Notes

#### GraphQL

The Company Page is available as a `CompanyPage` in GraphQL.
