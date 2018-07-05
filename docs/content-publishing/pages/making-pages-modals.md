# Adding a Page as a modal

1.  Open your Campaign in Contentful.

2.  Find the section called **Pages**.

3.  Open the Page that you want to be referring to as a modal within your Campaign.

4.  When the page is opened, the URL will contain the Contentful ID. In the example below, `52mLWF8lbO06q8ouuSUEkg` is the Contentful ID:

```
https://app.contentful.com/spaces/81iqaqpfd8fy/entries/52mLWF8lbO06q8ouuSUEkg
```

5.  Use this Contentful ID as a reference for the URL in the Action Step or Page that you would like this page to display as a modal, with this URL structure.

```
/us/campaigns/campaign_name/modal/contentful_id
```

_The page must be linked to in the parent Campaigns 'Pages' field to be accessible. (You can select Hide From Navigation to ensure it doesn't show up in the campaign tabbed navigation bar)_
