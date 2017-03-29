import React from 'react';
import classnames from 'classnames';
import Markdown from '../Markdown';
import Block from '../Block';
import Figure from '../Figure';
import Embed from '../Embed';
import DEFAULT_AVATAR from './default-avatar.png';
import './campaign-update.scss';

// TEMP - purley for demo purposes till it has an official home.
import ShareContainer from '../../containers/ShareContainer';

const Byline = ({author, jobTitle = 'DoSomething.org Staff', avatar = DEFAULT_AVATAR}) => (
  <Figure size="small" alignment="left" verticalAlignment="center" image={avatar} imageClassName="avatar">
    <strong>{author}</strong><br/>
    <p className="footnote">{jobTitle}</p>
  </Figure>
);

const CampaignUpdateBlock = (props) => {
  const { title, content, link, additionalContent } = props.fields;
  let { author, jobTitle, avatar } = additionalContent;

  const isTweet = content.length < 144;

  return (
    <Block>
      { isTweet ? null : <h2>{title}</h2> }
      <Markdown className={classnames('campaign-update__content', {'-tweet': isTweet})}>
        {content}
      </Markdown>
      { link ? <Embed url={link} /> : null }
      { author ? <Byline author={author} jobTitle={jobTitle} avatar={avatar} />: null}
      <ShareContainer />
    </Block>
  );
};

export default CampaignUpdateBlock;
