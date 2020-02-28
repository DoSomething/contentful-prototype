import React from 'react';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { format, formatDistanceStrict, addDays } from 'date-fns';
import { useQuery, useMutation } from '@apollo/react-hooks';

const DeleteAccountQuery = gql`
  query DeleteAccountQuery($id: String!) {
    user(id: $id) {
      id
      deletionRequestedAt
    }
  }
`;

// We're including 'emailSubscriptionTopics' in this query so that
// if the user clicks over to their subscriptions tab, this update
// will be displayed (without a full page refresh).
const DeleteAccountMutation = gql`
  mutation DeleteAccountMutation($id: String!) {
    requestDeletion(id: $id) {
      id
      deletionRequestedAt
      emailSubscriptionTopics
    }
  }
`;

const UndoAccountDeletionMutation = gql`
  mutation UndoAccountDeletionMutation($id: String!) {
    undoDeletionRequest(id: $id) {
      id
      deletionRequestedAt
    }
  }
`;

const DeleteAccountForm = () => {
  const options = { variables: { id: window.AUTH.id } };

  const { data, loading, error } = useQuery(DeleteAccountQuery, options);

  const [undo] = useMutation(UndoAccountDeletionMutation, options);
  const [deleteUser, { loading: modifying }] = useMutation(
    DeleteAccountMutation,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <div className="spinner" />;
  }

  const { deletionRequestedAt } = data.user;

  // If we don't have a pending deletion request, let user submit one:
  if (!deletionRequestedAt) {
    return (
      <button
        onClick={deleteUser}
        type="button"
        className={classnames('button bg-red-500 hover:bg-red-300', {
          'is-loading': modifying,
        })}
      >
        Delete My Account
      </button>
    );
  }

  const scheduledDeletion = addDays(deletionRequestedAt, 14);
  const remainingDays = formatDistanceStrict(new Date(), scheduledDeletion, {
    unit: 'day',
    roundingMethod: 'ceil',
  });

  // Otherwise, display some information about their request:
  return (
    <>
      <p>
        <strong className="text-red-500">
          We received your account deletion request on{' '}
          {format(deletionRequestedAt, 'PPP')}.
        </strong>{' '}
        You have been unsubscribed from all emails and text messages, and your
        account will be permanently deleted within {remainingDays}.
      </p>
      <p>
        We&apos;ll send you one final reminder message before that happens. In
        the meantime, you can always change your mind:
      </p>
      <p>
        <button type="button" className="link-button" onClick={undo}>
          I changed my mind! Don&apos;t delete my account.
        </button>
      </p>
    </>
  );
};

const DeleteAccountTab = () => {
  return (
    <>
      <div className="grid-wide-2/3 pb-6">
        <h2>Delete My Account</h2>
        <p>We&apos;re sorry to see you go!</p>

        <p>
          Requesting to delete your account will immediately unsubscribe you
          from receiving email &amp; text marketing. After 14 days, we will also
          delete all of your data from our systems. This includes:
        </p>
        <ul className="list">
          <li>
            Profile information (such as name, preferences, &amp; contact
            methods)
          </li>
          <li>
            Campaign submissions, including photos &amp; scholarship entries
          </li>
          <li>Email and SMS messaging history</li>
        </ul>

        <p>
          After this process is complete, it will be{' '}
          <strong>impossible to recover</strong> your account.
        </p>
      </div>
      <div className="grid-wide-2/3 pb-6">
        <DeleteAccountForm />
      </div>
    </>
  );
};

export default DeleteAccountTab;
