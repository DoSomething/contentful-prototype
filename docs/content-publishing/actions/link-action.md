# Link Action

The `LinkAction` component renders a visual component which features an embedded link. It allows us to present a link that we'd like DoSomething.org members to follow in a clear and actionable format.

![Link Action component](../_assets/link-action-component.png)  

It can also be equipped with an affiliate logo, which it will feature within the link action, and will change the background color of the card title to purple:

![Affiliate Link Action component](../_assets/link-action-component-2.png)

If you fill in the Button Text field, instead of rendering an embedded link, the Link Action will have a button to the link with the provided text:

![Link Action with no Button Text](../_assets/link-action-component-3.png)


## Usage Instructions
The Link Action consists of three fields:

- **title (required)**: The title that will show up in the yellow bar atop the Link Action.
- **content (optional)**: content in Markdown format that will appear within the card atop the link.
- **link (required)**: a valid URL which will be embedded within the card.
- **buttonText (required)**: Text for button to link which will replace the embedded link.
- **affiliateLogo (optional)**: an image URL which will be featured on bottom of the action. (adding this property will also cause a color change in the title of the action)
