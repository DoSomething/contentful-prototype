# System Outline

## Affiliation Flow

When a visitor lands on a **Phoenix** campaign, they will see a Landing Page. This page offers a small summary of the campaign action, prize incentives and a couple buttons or call to actions for the user to sign up, or affiliate, with the campaign. This page looks the same whether the visitor is an authenticated member or not.

After the visitor clicks on a signup button, the path branches a little bit. Unauthenticated visitors are taken to **Northstar** to log in or create a DoSomething account. Upon successfully logging in or creating an account, users are taken to the _Action_ tab.

Users who are already authenticated are taken directly to the Action tab.

When a member first affiliates with a campaign, they will be presented with the _Affirmation Modal_. This is a modal that appears over the Action tab and provides positive messaging; a message of impact from the campaign lead and a chance to share the campaign on Facebook.

The Affirmation Modal content does not exist anywhere on the page and can only been seen on the first viewing of the affiliated campaign page.

After closing the Affirmation modal, all campaign content is available to the user. This is the first time they will see the tab navigation controller and they will be placed on the Action tab by default.

## Pages

The “pages” of the **Phoenix** campaign experience are organized as tabs and all share the same header. We are using the _Page_ construct here as the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) term for a fully assembled group of components. You can read more about tab navigation in the Components section. The Community and Action tabs are the most flexible tabs. None of these are available until a user successfully signs up for the campaign.

### Action

The Action tab is the default view of the campaign, seen upon reaching the base campaign url. It contains the information about the campaign action. It is built from Action Step components and can be arranged in whatever order a campaign lead wants. Usually a report back uploader is the final step on the action page but this block can be moved within the page or removed entirely.

### Community

The purpose of the community tab is to showcase the work of the community and update members about the status of the campaign.

The primary feature of the community tab is the community feed. It’s divided into three main columns and is populated with campaign updates from leads/staffers, reportback photos from members, Calls to Action and static bits of content like facts or quotes.

The community tab is manually organized by the campaign lead in Contentful. Each item has to be given a defined width and item type.

### Quiz

The Quiz page is an experimental feature that allows a campaign lead to build a series of questions for a user to answer. A user is free to browse and answer all questions before affiliating but needs to affiliate with the campaign to see their results. This page has only been used experimentally and doesn’t show up in the tab navigation.

A user’s quiz results are not stored on their profile or signup currently.

### Static/FAQ/Scholarship

All other pages and tabs that are part of a campaign are static tabs. These tabs do not have the same flexibility of the Community and Action tabs. They accept markdown and display it in a 2/3 width container. The other column contains a CTA that is governed by the campaign wide CTA variables.

The FAQ and Scholarship tab are the most popular example of static tabs and are present on almost all campaigns.

There are no custom blocks for static tabs right now.

## Components

**Phoenix** pages and tabs are constructed from components, groups of stylistic and functional objects. Each component is composed of specific parts and serves a specific purpose.

### Header

The **Phoenix** header was designed to solve a number of problems from the Ashes template. Especially at smaller screen sizes, the overlaid text of the old template prevented a user from reading properly or obscured almost the entire image. Beyond readability issues, the emphasis on the campaign name didn’t strongly register with users compared to information about the campaign action.

### Navigation

From the very top of the page, **Phoenix** has moved the navigation into it’s own opaque bar, eliminating the awkward overlap of photos and navigation. In all cases the bar is \#FFFFFF white and contains the same information.

### Titles and Photos

The Mosaic template has de-emphasized the importance of the campaign title and enhanced other presentational aspects, namely the Call to Action \(CTA\) . The photo is isolated to the left side and does not overlap with any text or copy. On small size screens the photo is always presented above the title, CTA and buttons.

This area also contains sponsor logos. Fill this out.

We also advertise scholarships or other prize incentives in the lede banner. Scholarship call out texts are a handwritten font and arrow that point directly and the signup button.

### Signup Buttons

The signup button has been moved to rest directly underneath the campaign call to action, inside the right-side lockup. Clicking the button will take the user to authenticate with Northstar.

### Data bar

Beneath the photo and campaign title is a full width bar that contains extra quantitative information about the campaign. There are four sections to this bar, divided up into 1/4, 1/4 and 1/2 segments by default. The left side quarters display a large number + caption important to the campaign and the right half contains a prompt to share the campaign on Facebook. The numbers on the left side are customizable by campaign leads in Contentful.

This data bar is not required for all campaigns.

## Tabs

Beneath the header, the campaign content is distributed between a number of tabbed pages. Each tab can be loaded asynchronously and directly linked to with the following url structure: [https://dosomething.org/us/campaigns/campaign-name/tab-name](https://dosomething.org/us/campaigns/campaign-name/tab-name)

A campaign lead can create as many static tabs as they wish and fill them with markdown to be rendered in a simple template. These templates are not customizable by campaign leads and extra tabs clutter the navigation so there are editorial limits to the number of allowed tabs.

The tab bar scrolls side to side when the screen size reaches medium and small size viewports.

### Sticky Navigation

On medium and large size screens, when a user scrolls past the tab navigation component it begins to scroll with them. It takes a \#FFFFFF background similar to the top navigation bar and sticks to the top of the viewport. If the user is unaffiliated, a “Join Us” button will be present along the right margin of the navigation bar.

Noted Issue: When there are too many tabs or tabs with long names present, they may overlap with the “Join Us” button.

On small screens, a footer-cta scrolls with the user after they scroll past the header area. It contains a large “Join Us” button.

### Page Concierge

How does this work right now

## Blocks

Blocks are the skeleton of a campaign. We stack blocks of content together to create the feeds, pages and more. There are number of block types that can be created by campaign leads in Contentful to create instances of a block for a feed or page.

### Campaign Update

A campaign update component is used in the campaign feed to update members and visitors about some part of the campaign. Usually written by campaign leads, there’s a number of popular categories for campaign updates:

* Stories about campaign impact
* Counts and quantitative information about a campaign
* Links to relevant content elsewhere
* Reminders and encouragement about deadlines

### Call to Action

The CTA block works like an on platform advertisement or reminder. They contain information to convince the user to return to the action tab and complete an action. They appear in the community feed and static content tabs and point to the action tab.

Do they still appear on static content pages?

### Reportbacks

Reportback blocks placed into the feed will automatically fill with report backs to fit the available space. Reportbacks are pulled from the promoted/good photo tag in Rogue, then all accepted photos in reverse chronological order.

### Action Steps

Action steps make up the bulk of the Action page. Each step of the campaign is an Action Step block. They contain a header, header photo, a markdown body and can handle a gallery of photos on either the right side or beneath the content.

### RB Photo Uploader

Technically, the photo uploader component is a action step. If toggled in Contentful, this component will allow a user to upload a photo to complete their campaign action. The photo uploader can accept the following items:

* Photo\*
* Photo Caption\*
* Quantity
* Why

_\* = designates required item_

## Actions

The primary way for a user to complete a DoSomething campaign is to complete a verified social good action.

Actions are structured inside of **Phoenix**...

Multiple actions...

### Photo Upload Action

The firstborn and most common type of action on the platform, a Photo Upload Action usually requires a user to go complete an offline activity and then provide photo evidence to verify their work. This could be a photo of a jeans drive collection, a poster hung in a school hallway, an “I Voted” or more. All photos are sent to Rogue, the user activity service, to be reviewed. Each photo submitted is an individual post to Rogue, associated with a specific campaign signup.

Photos uploaded by an individual user appear beneath the Uploader Action card, so a user can always find their photos.

_Quantity_ Some photo uploaders require the user to associate an item quantity with their upload. For example, we measure the impact of a collection campaign by the total number of X collected, and user photos + quantity submissions are how we measure that.

Rogue counts the quantity on a per post level. Then this information is given to Quasar and summed up to collect total user impact. This is at odds with how users think about their collection, so we present it differently on the platform. On the front-end, users will tell us the total number of items collected and we do the math to calculate the change in their collection total from their last upload. We pass this information to Rogue so they can collect the per post changes to quantity.

## Contentful

... More to come...

## Sharing

... More to come...

## Modals

**Phoenix** can place specific components into a modal, presented on top of the campaign page with a darkened background. These modals are created through a url structure that includes /modal/. All modals share the same visual style, a white card with a yellow title bar. The title bar also contains an X in the top right corner to dismiss the modal. Modals can also be dismissed by clicking or tapping the area outside the modal.

### Affirmation Modal

The affirmation modal appears on every campaign, after a user has affiliated. Immediately following the signup, the user is presented with an affirmation modal that provides positive messaging, a message of impact from the campaign lead and a chance to share the campaign on Facebook. The affirmation modal content doesn’t exist anywhere on the page and can only been seen on the first viewing of the affiliated campaign page.

### Campaign Update Modals

Any campaign update can be placed into a permalink or shared onto a social network. The link showcases the modal content, regardless of if a visitor has signed up or not.

### Reportback Modals

The reportback uploader card can be placed into a modal, although it is not currently advised and likely to be replaced in the future. These reportback uploader modals are primarily used in messaging to direct users to complete the campaign. They don’t feature any sort of authentication control because they are generally sent to registered campaign signups.

#### Content Modals

We can present content from other static pages in a modal. The common use for this is the FAQ or Scholarship modal. By providing a structured /modal/ link the the body of an update or action step, we can create a new modal that pulls the content of the linked page.

... More to come...

Templates Legacy Legacy style header Removing tabs for community, FAQ, Scholarship Embedding gallery in the campaign page

