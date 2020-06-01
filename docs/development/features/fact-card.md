# Fact Card

The `FactCard` is a UI utility component which renders stat or fact information in a card with a customizable background color.

## Usage Instructions

Render the `FactCard` component with the following props:

- `title`: the title of the card, formatted to all caps
- `number`: the fact or stat number whichs gets formatted to a U.S. English locale (comma separated)
- `link`: an object containing `url` & `text` which gets rendered as an anchor link at the bottom of the card (usually to link to a campaign or article representing the fact)
- `backgroundColor`: a css compatible background color which will be assigned as the `backgroundColor` property of the card

```jsx
<FactCard
  backgroundColor="rgb(0, 109, 98)"
  title="actions taken about student debt"
  number="59077"
  link={{ url: '/us/campaigns/company-student-debt', text: 'Invest In Us' }}
/>
```

Output:
![Fact Card](../../.gitbook/assets/fact-card.png)
