# Glossary

This is a glossary of the core terms in Phoenix.

For more information about file structure choices and contributing to this codebase, check out our [communal documentation](https://github.com/DoSomething/communal-docs/tree/master/Contributing#js-code)!

## File Naming

### Action

Including `Action` in the name of your file means that component is correlated to a user taking an action within the context of a page in Contentful.

### Artifact

An `Artifact` file is one that contains things like icons, svgs etc to be used within other components and do _not_ contain business logic.

### Block

Files classified as a `Block` either directly correlate to a "block" content type within Contentful like the `CurrentClubBlock` (an interface component) or is a component that displays as distinct stacks of rows on a page (`SubmissionGalleryBlock`).

### Page

A `Page` file is a component that correlates to specific page types available on Phoenix. This includes pages available to editors on contentful (`LandingPage`) and pages specific to development (`ErrorPage`).

### Utility

Utility files within `/components/utilities` are reusable items that are typically used inside other components.
