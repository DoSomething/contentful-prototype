# Analytics Waypoint

## Overview

The `AnalyticsWaypoint` component provides a way to track user impressions of any feature or block in Phoenix. It tracks if & when the component enters the [viewport](https://www.w3schools.com/css/css_rwd_viewport.asp), and triggers an analytics event to track the impression.

## Usage Instructions

Simply render the `AnalyticsWaypoint` component from the start and and end of the component you'd like to track with the following `props`:

- `name`: Used as the `label` and added as `context.name` for the event
- `context` (_optional_): Used as the `context` for the event

So if we wanted to track users impression of the `ContentBlock` component's start & end:

```js
const ContentBlock = ({ id }) => (
  <>
    <AnalyticsWaypoint
      name="content_block-top"
      context={{blockId: id}}
    />

    {<!-- component specific JSX -->}

    <AnalyticsWaypoint
      name="content_block-bottom"
      context={{blockId: id}}
  <>
);
```

## Under The Hood

The component makes use of the [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer) NPM package which utilizes the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect when the element intersects with the viewport.

It triggers an analytics event with the following properties:

```js
metadata: {
  verb: 'reached',
  noun: 'waypoint',
  target: 'waypoint',
  category: 'waypoint',
  label: [name prop],
},
context: {
  ...context,
  name: [name prop],
},
```
