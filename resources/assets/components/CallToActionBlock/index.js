import React from 'react';
import './cta.scss';

const CallToActionBlock = (props) => {
  //TODO: This should probably be editable in contentful
  const cta = props.signups.status ? 'Reportback' : 'Get Involved';

  //TODO: This should take you to the action page if you're signed up
  const onClick = props.clickedSignUp(props.campaign.legacyCampaignId);

  return (
    <div className="cta">
      <div className="cta__block">
        <p className="cta__message">{ props.fields.title }</p>
      </div>
      <div className="cta__block">
        <a href="#" className="button" onClick={onClick}>{ cta }</a>
      </div>
    </div>
  );
};

export default CallToActionBlock;
