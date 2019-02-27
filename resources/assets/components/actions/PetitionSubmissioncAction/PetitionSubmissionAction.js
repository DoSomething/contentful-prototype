import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import Button from '../../utilities/Button/Button';
import TextContent from '../../utilities/TextContent/TextContent';

import './petition-submission-action.scss';

const PetitionSubmissionAction = props => (
  <React.Fragment>
    <div className="petition-submission-action margin-bottom-lg" id={props.id}>
      <Card className="bordered rounded" title={props.title}>
        <TextContent className="padding-md">{props.content}</TextContent>

        <form>
          <div className="padded">
            <textarea
              className="text-field petition-textarea"
              placeholder={props.textFieldPlaceholder}
            />
            <p className="footnote">500 character limit</p>
          </div>

          <Button type="submit" attached>
            {props.buttonText}
          </Button>
        </form>
      </Card>
    </div>

    <div className="petition-submission-information">
      <Card className="bordered rounded" title={props.informationTitle}>
        <TextContent className="padding-md">
          {props.informationContent}
        </TextContent>
      </Card>
    </div>
  </React.Fragment>
);

PetitionSubmissionAction.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  textFieldPlaceholder: PropTypes.string,
  buttonText: PropTypes.string,
  informationTitle: PropTypes.string,
  informationContent: PropTypes.string,
};

PetitionSubmissionAction.defaultProps = {
  title: 'Sign The Petition',
  textFieldPlaceholder: 'Add your custom message...',
  buttonText: 'Add your name',
  informationTitle: 'More Info',
  informationContent:
    'Your first name and email will be added to our petition. We do not collect any additional information.',
};

export default PetitionSubmissionAction;
