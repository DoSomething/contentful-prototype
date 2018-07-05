# Share Action

The `ShareAction` component renders a visual component which features an embedded link, and a social share button \(specifically a Facebook or Twitter share button\). Clicking the social share button will trigger the Facebook Share modal or Twitter intent window to open, populated with the embedded link. For Facebook shares, the component includes functionality to track a successful or canceled share, for an automatic Reportback process \(enabling the DoSomething member to skip manually reporting back with a snapshot of their Facebook share\).

![Share Action component](../../.gitbook/assets/share-action-component%20%281%29.png)

## Usage Instructions

The Share Action consists of three fields:

* **title \(required\)**: The title that will show up in the yellow bar atop the Link Action.
* **socialPlatform \(required\)**: The social platform that the Share Action will share to. \(Limited to Facebook or Twitter\).
* **content \(optional\)**: content in Markdown format that will appear within the card atop the link.
* **link \(required\)**: a valid URL which will be embedded within the card, and used as the URL for the social share button.
* To add a second action after the social share, instead of using the affirmation block, you can add in an affirmation action.

  ![Social Share Second Action](../../.gitbook/assets/affirmation_socialshare%20%281%29.png)

## Share Action for SMS Flow

To create a share action for SMS, each of the steps above are the same, but it is inserted in the _pages_ section of the campaign.

![Pages](../../.gitbook/assets/pages%20%281%29.png)

![Social Share](../../.gitbook/assets/socialshare.png)

To be able to grab the URL for SMS, clock the _preview_ button on the right hand side, underneath publish. This will show you the share on _phoenix-preview_ you need to change the url to unclude www before sending it out.

![Social Share Second Action](../../.gitbook/assets/preview.png)
