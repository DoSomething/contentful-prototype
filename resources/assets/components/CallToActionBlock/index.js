import React from 'react';
import classnames from 'classnames';
import { contentfulImageUrl } from '../../helpers';
import { mergeMetadata } from '../../helpers/analytics';
import './cta.scss';

const CallToActionBlock = (props) => {
  const additionalContent = props.fields.additionalContent || {};

  //TODO: This should probably be editable in contentful
  const buttonText = props.signups.thisCampaign ? 'Reportback' : 'Get Involved';

  const backgroundImageStyle = {
    backgroundImage: `url(${contentfulImageUrl(props.campaign.coverImage.url, '400', '400', 'fill')})`,
  };

  let impactContent = null;

  if (additionalContent.impactNumber) {
    impactContent = (
      <div className="cta__block cta__impact">
        {additionalContent.impactPrefix ? <span className="cta__impact-prefix">{additionalContent.impactPrefix}</span> : null}
        {additionalContent.impactNumber ? <span className="cta__impact-number">{additionalContent.impactNumber}</span> : null}
        {additionalContent.impactMessage ? <span className="cta__impact-message">{additionalContent.impactMessage}</span> : null}
      </div>
    );
  }

  const metadata = mergeMetadata(CallToActionBlock.defaultMetadata, {
    hasPhoto: additionalContent.hasPhoto,
    hasImpact: impactContent !== null,
    hasContent: typeof props.fields.content !== 'undefined',
  });

  const onClick = () => props.clickedSignUp(props.campaign.legacyCampaignId, metadata);

  return (
    <div className={classnames('cta', {'has-photo': additionalContent.hasPhoto})}>

      <div className="cta__content">
        { !props.fields.content ? <div className="cta__block"><p className="cta__title">{props.fields.title}</p></div> : null }

        {impactContent}

        { props.fields.content ? <div className="cta__block"><p className="cta__message">{props.fields.content}</p></div> : null }

        <div className="cta__block">
          <a className="button" onClick={onClick}>{ buttonText }</a>
        </div>
      </div>

      { additionalContent.hasPhoto ? <div className="cta__photo" style={backgroundImageStyle}></div> : null }
    </div>
  );
};

CallToActionBlock.defaultMetadata = {
  source: 'call to action block',
}

export default CallToActionBlock;
