import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Spinner from '../../artifacts/Spinner/Spinner';
import ToggleButton from '../Button/ToggleButton';
import {
  EMAIL_SUBSCRIPTION_QUERY,
  EMAIL_SUBSCRIPTION_MUTATION,
} from './ToggleSubscriptionButton';

const LegacyEmailSubscriptionItem = ({
  attributes,
  topic,
  name,
  image,
  description,
  descriptionHeader,
}) => {
  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(EMAIL_SUBSCRIPTION_QUERY, options);
  const [updateSubscription, { loading: modifying }] = useMutation(
    EMAIL_SUBSCRIPTION_MUTATION,
    options,
  );

  if (error) {
    return <p>Something went wrong!</p>;
  }

  const topics = data.user.emailSubscriptionTopics;

  return (
    <div className="card rounded border-solid border-2 border-gray-300">
      <div className="flex flex-col h-full">
        <img
          style={{ width: '100%' }}
          src={image}
          alt={`${name.toLowerCase()} newsletter logo`}
        />

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="mb-1 text-base">{name}</h3>

          <h4 className="italic mb-6 text-base">{descriptionHeader}</h4>

          <p className="flex-grow">{description}</p>

          {loading ? (
            <Spinner className="flex justify-center p-2" />
          ) : (
            <ToggleButton
              attributes={attributes}
              activateText="Subscribe"
              deactivateText="Unsubscribe"
              isDisabled={modifying}
              isLoading={modifying}
              isToggled={topics.includes(topic)}
              className="mt-4"
              onClick={() =>
                updateSubscription({
                  variables: {
                    topic,
                    subscribed: !topics.includes(topic),
                  },
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

LegacyEmailSubscriptionItem.propTypes = {
  attributes: PropTypes.object,
  topic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionHeader: PropTypes.string.isRequired,
};

LegacyEmailSubscriptionItem.defaultProps = {
  attributes: null,
};

export default LegacyEmailSubscriptionItem;
