import React from 'react';
import classnames from 'classnames';
import Markdown from '../Markdown';
import { contentfulImageUrl, modifiers } from '../../helpers';
import { mergeMetadata } from '../../helpers/analytics';
import './cta.scss';

const renderImpactContent = (data) => {
  if (data.impactNumber) {
    return (
      <div className="cta__block cta__impact">
        {data.impactPrefix ? <span className="cta__impact-prefix">{data.impactPrefix}</span> : null}
        {data.impactNumber ? <span className="cta__impact-number">{data.impactNumber}</span> : null}
        {data.impactMessage ? <span className="cta__impact-message">{data.impactMessage}</span> : null}
      </div>
    );
  }

  return null;
};

const renderBackgroundImageStyle = (imageUrl) => (
  { backgroundImage: `url(${contentfulImageUrl(imageUrl, '400', '400', 'fill')})` }
);

const CallToActionBlock = ({ isAffiliated, fields, imageUrl, legacyCampaignId, clickedSignUp, modifierClasses = [] }) => {
  const { title, content, additionalContent } = fields;
  const hasPhoto = additionalContent ? additionalContent.hasPhoto : false;

  // @TODO: This should probably be editable in contentful...
  const buttonText = isAffiliated ? 'Make Cards' : 'Join Us';

  const metadata = mergeMetadata(CallToActionBlock.defaultMetadata, {
    hasPhoto: hasPhoto,
    hasImpact: additionalContent !== 'undefined',
    hasContent: typeof content !== 'undefined',
  });

  const handleOnClickButton = () => clickedSignUp(legacyCampaignId, metadata);

  return (
    <div className={classnames('cta', modifiers(modifierClasses), {'has-photo': hasPhoto})}>
      <div className="cta__content">
        { !content ? <div className="cta__block"><p className="cta__title">{title}</p></div> : null }

        { additionalContent ? renderImpactContent(additionalContent) : null}

        { content ? <div className="cta__block"><Markdown className="cta__message">{content}</Markdown></div> : null }

        <div className="cta__block">
          <a className="button" onClick={handleOnClickButton}>{buttonText}</a>
        </div>
      </div>

      { hasPhoto ? <div className="cta__photo" style={renderBackgroundImageStyle(imageUrl)}></div> : null }
    </div>
  );
};

CallToActionBlock.defaultMetadata = {
  source: 'call to action block',
}

export default CallToActionBlock;
