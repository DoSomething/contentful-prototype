# Helper methods

We have two suites of helper methods in the Phoenix codebase.

1. PHP helper methods globally available on the backend PHP application in [app/helpers.php](https://github.com/DoSomething/phoenix-next/blob/4a5f24f5832d701c586f7b06db4483e4b0256676/app/helpers.php)
2. JS helper methods which can be imported from anywhere in our front-end React application in the [resources/assets/helpers](https://github.com/DoSomething/phoenix-next/blob/4a5f24f5832d701c586f7b06db4483e4b0256676/resources/assets/helpers) directory

## JS Helper Methods

We organize our helpers in filenames with logical categories. E.g. methods related to user & authentication information in `helpers/auth`.

We also have a large amount of miscellaneous or otherwise uncategorized methods within the main `helpers/index.js` file.

##### Using/Creating Helper Methods

When a piece of repeatable contained logic (e.g. [a method](https://github.com/DoSomething/phoenix-next/blob/4a5f24f5832d701c586f7b06db4483e4b0256676/resources/assets/helpers/index.js#L425-L433) to generate a user friendly representation of a Contentful Date), our rule of thumb is to first peruse our suite of helpers to see if this functionality already exists as a method (or if our logic can at least utilize an existing one). Otherwise, if a new helper method is necessary (such as when this logic has already been applied elsewhere and can be abstracted), add the new helper method to the appropriate categorized file, or create a new category file (`helpers/[new-category].js`).

## Clean up

Many helper methods remain uncategorized in the main `helpers/index.js` file, if using an existing helper that looks like it can fit in an existing category -- feel free to move it in! If you notice a new logical grouping forming or already existing -- feel free to port them over to the new categorized file!

## Tests (I don't [Jest](https://jestjs.io/))

We're missing tests on many of our existing helper functions. If utilizing an existing helper method - or certainly if adding a new one - we recommend creating an accompanying set of tests. This would either go in the main `helpers/test.js` file for methods in the main `helpers/index.js` file, or in a `helpers/[category-name].test.js` file. (If one doesn't already exist, please feel free to backfill!)
