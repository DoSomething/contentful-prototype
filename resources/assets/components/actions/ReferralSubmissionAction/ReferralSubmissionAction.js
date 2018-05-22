import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, has, invert, mapValues } from 'lodash';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import { withoutUndefined } from '../../../helpers';
import Markdown from '../../utilities/Markdown/Markdown';
import FormValidation from '../../utilities/Form/FormValidation';
import { getFieldErrors, setFormData } from '../../../helpers/forms';

class ReferralSubmissionAction extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      return {
        showModal: true,
        firstNameValue: '',
        emailValue: '',
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      firstNameValue: '',
      // @todo allow for multiple sorts of referral fields in addition to email. (e.g. phone number.)
      emailValue: '',
    };

    this.props.initPostSubmissionItem(this.props.id);
  }

  fields = {
    first_name: 'firstName',
    email: 'email',
  };

  handleChange = event => {
    this.setState({
      [`${event.target.name}Value`]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.resetPostSubmissionItem(this.props.id);

    const type = 'referral';

    const action = get(this.props.additionalContent, 'action', 'default');

    const formData = setFormData(
      {
        action,
        type,
        id: this.props.id,
        // Associate state values to fields.
        ...mapValues(this.fields, value => this.state[`${value}Value`]),
      },
      this.props,
    );

    // Send request to store the campaign text submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      body: formData,
      id: this.props.id,
      type,
    });
  };

  render() {
    const submissionItem = this.props.submissions.items[this.props.id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    // Associate errors to component field names.
    const errors = withoutUndefined(
      formErrors
        ? mapValues(invert(this.fields), value => formErrors[value])
        : null,
    );

    return (
      <React.Fragment>
        <Card
          id={this.props.id}
          className={classnames(
            'bordered rounded referral-submission-action',
            this.props.className,
          )}
          title={
            this.props.title || ReferralSubmissionAction.defaultProps.title
          }
        >
          {formResponse ? <FormValidation response={formResponse} /> : null}

          <form onSubmit={this.handleSubmit}>
            <div className="padded">
              <div className="form-item">
                <label
                  className={classnames('field-label', {
                    'has-error': has(errors, 'firstName'),
                  })}
                  htmlFor="firstName"
                >
                  Your friend&#39;s first name
                </label>
                <input
                  className={classnames('text-field', {
                    'has-error shake': has(errors, 'firstName'),
                  })}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-item">
                <label
                  className={classnames('field-label', {
                    'has-error': has(errors, 'email'),
                  })}
                  htmlFor="email"
                >
                  Your friend&#39;s email address
                </label>
                <input
                  className={classnames('text-field', {
                    'has-error shake': has(errors, 'email'),
                  })}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="hello@example.com"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <Button
              type="submit"
              loading={submissionItem ? submissionItem.isPending : true}
              attached
            >
              {this.props.buttonText ||
                ReferralSubmissionAction.defaultProps.buttonText}
            </Button>
          </form>
        </Card>

        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <Card className="bordered rounded" title="We got your referral!">
              <Markdown className="padded">
                {this.props.affirmationContent ||
                  ReferralSubmissionAction.defaultProps.affirmationContent}
              </Markdown>
            </Card>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

ReferralSubmissionAction.propTypes = {
  affirmationContent: PropTypes.string,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  initPostSubmissionItem: PropTypes.func.isRequired,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  title: PropTypes.string,
};

ReferralSubmissionAction.defaultProps = {
  additionalContent: null,
  affirmationContent:
    "Thanks for joining the movement, and inviting your friend! We'll get in touch with them and make this world a better place together.",
  buttonText: 'Send Email',
  className: null,
  legacyCampaignId: null,
  legacyCampaignRunId: null,
  title: 'Invite your friends',
};

export default ReferralSubmissionAction;
