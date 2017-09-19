import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Markdown from '../Markdown';
import { contentfulImageUrl, modifiers } from '../../helpers';
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

const renderBackgroundImageStyle = imageUrl => (
  { backgroundImage: `url(${contentfulImageUrl(imageUrl, '400', '400', 'fill')})` }
);

const CallToActionBlock = (props) => {
  const { isAffiliated, fields, imageUrl, campaignId, clickedSignUp, modifierClasses,
    noun, verb, buttonOverride } = props;
  const { title, content, additionalContent } = fields;

  const hasPhoto = additionalContent ? additionalContent.hasPhoto : false;

  const defaultText = isAffiliated ? `${verb.plural} ${noun.plural}` : 'Join Us';
  const buttonText = buttonOverride || defaultText;

  const handleOnClickButton = () => {
    clickedSignUp(campaignId);
  };

  return (
    <div className={classnames('cta', modifiers(modifierClasses), { 'has-photo': hasPhoto })}>
      <div className="cta__content">
        { ! content ? <div className="cta__block"><p className="cta__title">{title}</p></div> : null }

        { additionalContent ? renderImpactContent(additionalContent) : null}

        { content ? <div className="cta__block"><Markdown className="cta__message">{content}</Markdown></div> : null }

        <div className="cta__block">
          <button className="button" onClick={handleOnClickButton}>{buttonText}</button>
        </div>
      </div>

      { hasPhoto ? <div className="cta__photo" style={renderBackgroundImageStyle(imageUrl)} /> : null }
    </div>
  );
};

CallToActionBlock.propTypes = {
  buttonOverride: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    additionalContent: PropTypes.instanceOf(Object),
  }),
  imageUrl: PropTypes.string.isRequired,
  isAffiliated: PropTypes.bool,
  modifierClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  verb: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

CallToActionBlock.defaultProps = {
  buttonOverride: null,
  fields: {
    title: 'Ready to start?',
  },
  isAffiliated: false,
  modifierClasses: [],
  noun: { singular: 'item', plural: 'items' },
  verb: { singular: 'make an', plural: 'make' },
};

export default CallToActionBlock;
