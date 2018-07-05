# Photo Submission Action

The `PhotoSubmissionAction` component renders a visual component which allows DoSomething.org members to upload a photo and provide some additional information regarding the photo they are submitting.

![Photo Submission Action component](../../.gitbook/assets/photo-submission-action-component%20%281%29.png)

The component can optionally show or hide the quantity field, which allows members to enter a quantity for campaigns that require collecting items \(e.g. jeans, cards, etc\).

If a campaign uses the **quantity** field, after a member successfully submits a photo submission, the component will display the current total quantity. Showcasing their current quantity makes it easier for returning members to submit photo updates along with updating their new total items collected. When entering an updated quantity, the member should enter their _new total_ items, which needs to be higher than their current displayed total.

## Usage Instructions

The Photo Submission Action consists of the following fields:

_For all the fields below designated as "\(optional\)", a default value will be used if no value is entered._

* **internalTitle** _\(required\)_: the title used internally to find this component in Contentful; please follow helper text displyed under the field for suggested naming convention.
* **title** _\(optional\)_: the title that will show up in the yellow bar atop the Photo Submission Action.
* **captionFieldLabel** _\(optional\)_: the text label for the caption field.
* **captionFieldPlaceholder** _\(optional\)_: the text placeholder in the caption field to provide an example.
* **showQuantityField** _\(optional\)_: toggle to include and show a quantity field.
* **quantityFieldLabel** _\(optional\)_: the text label for the quantity field.
* **quantityFieldPlaceholder** _\(optional\)_: the text placeholder in the quantity field to provide an example.
* **whyParticipatedFieldLabel** _\(optional\)_: the text label for the why participated field.
* **whyParticipatedFieldPlaceholder** _\(optional\)_: the text placeholder in the why participated field to provide an example.
* **buttonText** _\(optional\)_: the text for the submit button in the form action.
* **informationTitle** _\(optional\)_: the title that will show up in the yellow bar atop the information sidebar next to the Photo Submission Action.
* **informationContent** _\(optional\)_: the content in Markdown format that will appear in the information sidebar next to the Photo Submission Action.
* **affirmationContent** _\(optional\)_: the content in Markdown format that is displayed in the affirmation modal pop-up after a successful Photo Submission Action is completed.
* **additionalContent** _\(optional\)_: used to specify additional options in JSON format; currently no options supported.
