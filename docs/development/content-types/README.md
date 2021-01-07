# Content Types

This section aims to help clarify some of the logic and nuance within how specified content types were built to work within the platform.

## Mapping Content Types to Graphql Types

Because we work with many of these content types via Graphql, it can hard to keep track of mapping the different names.

When in doubt, please reference the [contentTypeMappings](https://github.com/DoSomething/graphql/blob/d4dae5f7388807cba54de08aeed6aae485d30e41/src/resolvers/contentful/phoenix.js#L22-L59) object in our graphql repository! This should provide an up-to-date list of all graphql types that map to specific Contentful content types.
