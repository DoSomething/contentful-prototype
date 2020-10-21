# Scholarship Newsletter Popover

The Scholarship Newsletter Popover is a Cta Popover utility that displays the `CtaPopoverEmailForm` for unauthenticated users only, allowing them the opportunity to sign up for our newsletter service. The popover is only displayed on the `/about/easy-scholarships page` or pages configured with `additionalContent.display_scholarship_newsletter_cta_popover`.

! [Example Cta Popover Email Form](../../.gitbook/assets/newsletter-popover-example.png)

The `CtaPopoverEmailForm` will appear after 5 seconds of an unauthenticated visit prompting the user to enter their email address. If the user dismisses the element, the element will not appear for 30 days. How? The `CtaPopoverEmailForm` uses the `handleDismissal` and `handleCompletion` callback methods from the [DismissableElement](https://github.com/DoSomething/phoenix-next/blob/master/docs/development/features/dismissable-element.md#dismissable-element).

`handleDismissal` stores a timestamp of when the element was dismissed. It validates the amount of time passed since the element was dismissed and if it's less than 30 days, the `CtaPopoverEmailForm` will not render.

`handleCompletion` is triggered when the user submits their email and it permanently hides the popover fot that user.

If the user enters their email address, the form will post to Northstar storing these 4 fields of data:

```jsx
        email: emailValue,
        email_subscription_topic: 'scholarships',
        source: 'phoenix-next',
        source_detail: 'scholarship_newsletter-cta_scholarship-page',
```

The user will then be enrolled in our scholarship newsletter subscriptions and see a confirmation for submitting their email.

! [Example Cta Popover Email Form](../../.gitbook/assets/newsletter-popover-affirmation-example.png)
