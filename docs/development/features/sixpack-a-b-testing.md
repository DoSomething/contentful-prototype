# Sixpack A/B Testing

## Overview

The Phoenix platform has the capability of running a variety of A/B Test Experiments to gather insight on what small changes on the web experience between a set of variants perform better. The overall aim is to find what small changes leads to more conversions from our existing website visitor traffic.

## How It Works

To perform all these A/B Test Experiments, we utilize an open-source, language-agnostic A/B testing framework called [Sixpack](https://github.com/sixpack/sixpack). Sixpack runs as an instance on a server that Phoenix communicates with to exchange data and also pass along data to Sixpack regarding conversions on different experiments.

To communicate with the Sixpack server, Phoenix has a `Sixpack` service class located in `/resources/assets/services/Sixpack.js`.

## Test Types

Depending on the context for the kind of test being performed, there are 2 test types that Phoenix supports:

- [Code Tests](sixpack-code-tests.md)
- [Contentful Tests](sixpack-contentful-tests.md)

## Usage Tips

When testing to confirm that an experiment is set up properly, you can **force** a specific alternative by passing a URL parameter in the URL:

```text
http://example.com?sixpack-force-experiment_name=name_of_alternative_to_show
```

The forced alternative will not end up sending any data to Sixpack, so it will not affect the conversion!
