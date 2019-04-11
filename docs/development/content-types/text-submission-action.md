# Text Submission Action

## Overview

The **Text Submission Action** is one of many different types of available reportback actions a DoSomething member can perform on the platform. It allows a member to submit a reportback post of text they provide, up to a maximum of 500 characters.

![Example Text Submission Action](../../.gitbook/assets/text-submission-action-user-interface.png)

## Content Type Fields

- **Internal Title** | `internalTitle`: This is for our internal Contentful organization and will be how the block shows up in search results, etc. It should include the Year-Month and a distinctive title to help find this content in the system.
- **Action ID** | `actionId`: Specifies the Action ID associated with this action in Rogue (Activity Service).
- **Title** | `title`: This will be displayed as the header within the text submission action block.
- **TextFieldLabel** | `textFieldLabel`: Specifies what the copy for the label on text field should be.
- **Text Field Placeholder Message** | `textFieldPlaceholder`: Specifies what the copy for the placeholder text in the text field should be; should be used to provide some short, helpful text.
- **Button Text** | `buttonText`: Specifies what the copy for the button text should be.
- **Information Title** | `informationTitle`: This will be displayed as the header within the information block.
- **Information Content** | `informationContent`: Specifies what to display as the text copy for the information block.
- **Affirmation Content** | `affirmationContent`: Specifies what to display for the text copy in the affirmation modal that pops up for the user after a successful text submission action is posted to Rogue.
- **Additional Content** | `additionalContent`: JSON content to pass along additional data as needed; use sparingly.

{% hint style="info" %}
Most of the fields above related to user-facing fields that show up in the text submission form will provide sensible defaults if no value is provided, but it is best for the editor to customize these to the campaign.
{% endhint %}

## Technical Notes

There is a dedicated **TextSubmissionAction Entity**, which can be found in `app/Entities/TextSubmissionAction.php`, that collects the data entered into fields for the respective TextSubmissionAction content type entry, when parsing the retrieving item from a Contentful API response and building out the object for the entry.

The Text Submission Action also has a corresponding React component directory which can be found in `resources/assets/components/actions/TextSubmissionAction`.

This directory contains the following files:

- `text-submission-action.scss`: contains additional styles specific to the component.
- `TextSubmissionAction.js`: the React presentational component file.
- `TextSubmissionAction.test.js`: Jest test for the component.
- `TextSubmissionActionContainer.js`: the React container component file that communicates with the Redux store.

When a member submits a text post using the text submission action, the component collects the provided data along with any additional metadata for the post (`campaignId`, `actionId`, `type`, etc) and depending on whether an `actionId` is available, it calls either the `storePost()` action or the `storeCampaignPost()` action respectively.

Both of these action can be found in `resources/assets/actions/posts.js`, where they proceed to attach analytics and sixpack experiment metadata to the payload, and dispatch a POST request to the Phoenix API.

## Additional Information

<!-- Extra information that could be helpful. -->
