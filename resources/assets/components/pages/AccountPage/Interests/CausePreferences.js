import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import CausePreferenceItem from './CausePreferenceItem';

const CAUSE_PREFERENCE_QUERY = gql`
  query CausePreferenceQuery($userId: String!) {
    user(id: $userId) {
      id
      causes
    }
  }
`;

const CausePreferences = () => {
  const causeItems = {
    ANIMAL_WELFARE: {
      title: 'Animal Welfare',
      description: 'Doggos and kitties and elephants, oh my!',
    },
    BULLYING: {
      title: 'Bullying',
      description:
        'Bullying affects at least 1 in 5 students.  Let’s Do Something about it.',
    },
    EDUCATION: {
      title: 'Education',
      description:
        'Make schools fairer, safer, better, and more affordable for everyone.',
    },
    ENVIRONMENT: {
      title: 'Environment',
      description: 'Join the youth-led movement to tackle our climate crisis.',
    },
    GENDER_RIGHTS_EQUALITY: {
      title: 'Gender Rights & Equality',
      description: 'Closing the wage gap is just the beginning.',
    },
    HOMELESSNESS_POVERTY: {
      title: 'Homelessness & Poverty',
      description:
        'Homelessness affects 500,000 people in the US. Let’s change that.',
    },
    IMMIGRATION_REFUGEES: {
      title: 'Immigration & Refugees',
      description:
        'To the US border and beyond, we need action now more than ever.',
    },
    LGBTQ_RIGHTS_EQUALITY: {
      title: 'LGBTQ+ Rights & Equality',
      description: 'Be an ally and fight for justice for the LGBTQ+ community.',
    },
    MENTAL_HEALTH: {
      title: 'Mental Health',
      description: 'Do Something about depression, anxiety, stress, and more.',
    },
    PHYSICAL_HEALTH: {
      title: 'Physical Health',
      description:
        'Protect the wellbeing of your friends, family, and community.',
    },
    RACIAL_JUSTICE_EQUITY: {
      title: 'Racial Justice & Equity',
      description: 'Injustice stops with this generation.',
    },
    SEXUAL_HARASSMENT_ASSAULT: {
      title: 'Sexual Harassment & Assault',
      description:
        'Do Something about sexual harassment, assault, and violence near you.',
    },
  };

  const options = { variables: { userId: window.AUTH.id } };

  // Make the initial query to get the user's subscriptions
  const { data, loading, error } = useQuery(CAUSE_PREFERENCE_QUERY, options);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  if (loading) {
    return <div className="spinner align-center" />;
  }

  const { causes } = data.user;

  return (
    <div className="gallery-grid gallery-grid-duo">
      {Object.keys(causeItems).map(cause => (
        <CausePreferenceItem
          cause={cause}
          causes={causes}
          title={causeItems[cause].title}
          description={causeItems[cause].description}
        />
      ))}
    </div>
  );
};

export default CausePreferences;
