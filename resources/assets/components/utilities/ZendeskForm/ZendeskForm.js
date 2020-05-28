import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import Card from '../Card/Card';
import { report } from '../../../helpers';
import { postRequest } from '../../../helpers/api';
import PrimaryButton from '../Button/PrimaryButton';
import { HELP_LINK, HELP_REQUEST_LINK } from '../../../constants';

const ZendeskForm = ({ campaignId, campaignName, faqLink, token }) => {
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = event => {
    event.preventDefault();

    setStatus({ ...status, loading: true });

    const data = {
      campaign_id: campaignId,
      campaign_name: campaignName,
      question,
    };

    postRequest('/api/v2/zendesk-tickets', data, token)
      .then(() => setStatus({ ...status, loading: false, success: true }))
      .catch(error => {
        setStatus({ ...status, loading: false, error });
        console.error('[Error] ', error);
        report(error);
      });
  };

  const title = status.success ? 'Thank You' : 'Contact Us';

  return (
    <Card title={title} className="rounded bordered zendesk-form">
      <div className="p-3">
        {status.success ? (
          <p className="pb-3">
            Thanks for reaching out! We&apos;ve received your submission and
            will be in touch in 1-2 business days.
          </p>
        ) : (
          <>
            <p>
              We&apos;re sorry you&apos;re having a problem! Get your questions
              answered right away by first{' '}
              <a
                data-testid="zendesk-form-faq-link"
                href={faqLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                checking our FAQ
              </a>{' '}
              which are updated regularly. If you still have questions, please
              complete the form below.
            </p>

            <p className="mt-8">
              If you&apos;re having a technical issue, please be sure to provide
              detailed steps (click by click) on how you encountered the
              problem, what browser you&apos;re using, and if you&apos;re using
              a phone or computer. This will help our team recreate the issue
              and come up with a solution.
            </p>

            {status.error ? (
              <p className="mt-8 text-red-500">
                <strong>Something went wrong!</strong> Try refreshing the page
                or{' '}
                <a
                  href={HELP_REQUEST_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  reach out
                </a>{' '}
                to us.
              </p>
            ) : null}

            <form className="mt-3" onSubmit={handleSubmit}>
              <textarea
                className={classNames('block mb-2 text-field h-48', {
                  'has-error': status.error,
                })}
                id="question"
                name="question"
                placeholder="Write your question here."
                value={question}
                onChange={event => setQuestion(event.target.value)}
              />

              <PrimaryButton
                className="block mt-6 text-lg w-full"
                isDisabled={!question}
                isLoading={status.loading}
                text="Submit"
                type="submit"
              />
            </form>
          </>
        )}
      </div>
    </Card>
  );
};

ZendeskForm.propTypes = {
  campaignId: PropTypes.string.isRequired,
  campaignName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  faqLink: PropTypes.string,
};

ZendeskForm.defaultProps = {
  faqLink: HELP_LINK,
};

export default ZendeskForm;
