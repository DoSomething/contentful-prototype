# Sixpack A/B Testing

## Overview

The Phoenix platform has the capability of running a variety of A/B Test Experiments to gather insight on what small changes on the web experience between a set of variants perform better. The overall aim is to find what small changes lead to more conversions from our existing website visitor traffic.

## How It Works

To perform all these A/B Test Experiments, we utilize an open-source, language-agnostic A/B testing framework called [Sixpack](https://github.com/sixpack/sixpack). Sixpack runs as an instance on a server that Phoenix communicates with to exchange data and also pass along information to Sixpack regarding successful conversions on different experiments.

To communicate with the Sixpack server, Phoenix has a `Sixpack` service class located in `/resources/assets/services/Sixpack.js`. This class is only instantiated _once_ during the page request cycle, and contains a key-value store of all the current experiments running on the current page being viewed.

## Test Types

Depending on the context for the kind of test being performed, there are 2 test approaches that Phoenix supports, A/B Tests executed in code, or A/B Tests executed using our Contentful CMS.

### Code Tests

If a Sixpack A/B Test intends to experiment with layout changes, color variatons, or other design or feature variations, these experiments are best executed entirely in code and set up by one of the developers on the team.

[Code Tests](sixpack-code-tests.md)

### Contentful Tests

If a Sixpack A/B Test intends to experiment with content copy changes, content asset changes, or visual order of blocks on a page, these experiments are best executed within the Contentful CMS by a content editor, using the `SixpackExperiment` content type to help set the experiment up.

[Contentful Tests](sixpack-contentful-tests.md)

## Usage Tips

When testing to confirm that an experiment is set up properly, you can **force** a specific alternative by passing a URL parameter in the URL:

```text
http://example.com?sixpack-force-experiment_name=name_of_alternative_to_show
```

The forced alternative will not end up sending any data to Sixpack, so it will not affect the conversion!
