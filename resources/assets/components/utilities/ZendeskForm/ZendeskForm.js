import React, { useState } from 'react';

import Card from '../Card/Card';
import Button from '../Button/Button';
import { ZENDESK_API_ENDPOINT } from '../../../constants';

const ZendeskForm = () => {
  const [question, updateQuestion] = useState('');
  const [loading, updateLoading] = useState(false);
  const [showAffirmation, updateShowAffirmation] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    updateLoading(true);

    const data = {
      request: {
        requester: {
          email: 'test@dosomething.org',
          name: 'test',
        },
        comment: {
          body: question,
        },
        subject: 'helpdesk',
      },
    };

    // Create a ticket in Zendesk:
    fetch(ZENDESK_API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        updateShowAffirmation(true);

        console.log('Success: ', JSON.stringify(responseJson));
      })
      .catch(error => console.error('Error: ', error));
  };

  const title = showAffirmation ? 'Thank you' : 'Contact us';

  return (
    <Card title={title} className="rounded bordered">
      {showAffirmation ? (
        <p className="p-3">
          Thanks for reaching out! We&apos;ve received your submission and will
          be in touch in 1-2 business days.
        </p>
      ) : (
        <>
          <div className="p-3">
            <p>
              We&apos;re sorry you&apos;re having a problem! Get your questions
              answered right away by first{' '}
              <a
                href="https://help.dosomething.org/hc/en-us"
                target="_blank"
                rel="noopener noreferrer"
              >
                checking our FAQs
              </a>{' '}
              which are updated regularly. If you still have questions, please
              complete the form below.
            </p>
            <p>
              If you&apos;re having a technical issue, please be sure to provide
              detailed steps (click by click) on how you encountered the
              problem, what browser you&apos;re using, and if you&apos;re using
              a phone or computer. This will help our team recreate the issue
              and come up with a solution. Screenshots that include the URL will
              also help us troubleshoot!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-3">
              <textarea
                className="text-field h-48"
                id="question"
                name="question"
                placeholder="Write your question here."
                value={question}
                onChange={event => updateQuestion(event.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={!question}
              loading={loading}
              attached
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </Card>
  );
};

export default ZendeskForm;
