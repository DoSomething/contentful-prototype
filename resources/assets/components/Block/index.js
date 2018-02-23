// The <BlockWrapper> can be used to give the "block" visual
// treatment (and optional title bar) to any type of block.
export BlockWrapper from './BlockWrapper';

// The <BlockContainer> can match a route to a particular
// block from the campaign feed in the Redux store.
export BlockContainer from './BlockContainer';

// The <Block> component accepts a JSON blob from the Contentful
// content type & renders the appropriate component.
export default from './Block';
// The <ContentBlock> component is used for general text
// content, like steps on an action page.
export ContentBlock from './ContentBlock';
