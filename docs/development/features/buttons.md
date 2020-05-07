# Buttons

## Overview

There are currently two **core** button components and the rest of the more specialized button components extend upon these core buttons.

The two core button components are:

- [LinkButton](./linkbutton) \(renders a basic anchor link element `<a>` that looks like a button\)
- [ElementButton](./elementbutton) \(renders a basic button element `<button>`\)

Some of the specialized buttons that extend from the above core button components are:

- [PrimaryButton](./primarybutton)
- [SecondaryButton](./secondarybutton)
- [ToggleButton](./togglebutton)

We'll review what makes each different and how to use them in the following section.

## Usage Instructions

### LinkButton

The `LinkButton` component is one of the **core** button components and if used it will output a very basic button anchor link `<a>` with minimal styles.

When used, you _should_ use Tailwind classes to further style the button, adding a background color and active|focus|hover states, etc.

This component has two required properties:

- `href`: a URL string for the destination link
- `text`: a string for the button text

Example component use:

```js
import LinkButton from '../utilities/Button/LinkButton';

// stuff

<LinkButton
  attributes={{
    target: '_blank',
    'data-label': 'some_useful_data',
  }}
  className="bg-orange-500 active:bg-orange-700 focus:bg-orange-300 hover:bg-orange-300 px-8 py-4 text-lg"
  href="/"
  onClick={trackAnalyticsEvent}
  text="Click Me!"
/>;
```

Example HTML output:

```html
<a
  class="btn bg-orange-500 active:bg-orange-700 focus:bg-orange-300 hover:bg-orange-300 px-8 py-4 text-lg"
  href="/"
  target="_blank"
  data-label="some_useful_data"
  >Click Me!</a
>
```

Example Rendered output:

![LinkButton Example]('../../.gitbook/assets/link-button-example.png)

#### Important Notes

Anchor links in the browser do not support the `disabled` attribute. If added to an `<a>` it does absolutely nothing and the link can still be clicked, thus the `LinkButton` does not support the `isDisabled` property.

If you need a button that can be disabled in the interface, please use a button component that outputs a `<button>` element, like the [ElementButton](./elementbutton) component.

If the `href` URL passed to the `LinkButton` component is an external URL, the component will automatically add appropriate attributes (`target` and `rel`) and values to allow the link to open in a new browser tab. If you do not want an external link to open in a new browser tab, or alternatively, if you want internal links to open in a new browser tab you can override the default behavior by passing the appropriate attributes and values using the `attributes` property. You can see this in `LinkButton` example above.

### ElementButton

The `ElementButton` component is one of the **core** button components and if used it will output a very basic button element `<button>` with minimal styles.

When used, you _should_ use Tailwind classes to further style the button, adding a background color and active|focus|hover states, etc.

This component has one required property:

- `text`: a string for the button text

Example component use:

```js
import ElementButton from '../utilities/Button/ElementButton';

// stuff

<ElementButton
  attributes={{ 'data-label': 'some_useful_data' }}
  className="bg-orange-500 active:bg-orange-700 focus:bg-orange-300 hover:bg-orange-300 px-8 py-4 text-lg"
  isDisabled={isDisabledCheck}
  isLoading={isLoadingCheck}
  onClick={handleOnClick}
  text="Submit Info"
  type="submit"
/>;
```

Example HTML output:

```html
<button
  class="btn bg-purple-500 active:bg-purple-700 focus:bg-purple-300 hover:bg-purple-300 px-8 py-4 text-lg"
  type="submit"
  data-label="some_useful_data"
>
  Submit Info
</button>
```

Example Rendered output:

![ElementButton Example]('../../.gitbook/assets/element-button-example.png)

#### Important Notes

By default, the `ElementButton` will output a `<button type="button">` with a `type` of `button`. However, you can pass a `type` property to the component to output a submit button for use in forms as we do in the `ElementButton` example above.

### PrimaryButton

### SecondaryButton

### ToggleButton

## Under The Hood

**more to come...**
