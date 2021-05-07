import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';

import { EVENT_CATEGORIES } from '../../helpers/analytics';

const causes = [
  { title: 'Education', slug: 'education' },
  { title: 'Gun Violence', slug: 'gun-violence' },
  { title: 'Mental Health', slug: 'mental-health' },
  { title: 'Physical Health', slug: 'physical-health' },
  { title: 'Homelessness & Poverty', slug: 'homelessness-and-poverty' },
  { title: 'Environment', slug: 'environment' },
  { title: 'Sexual Harassment', slug: 'sexual-harassment' },
  { title: 'Bullying', slug: 'bullying' },
  { title: 'Gender Rights', slug: 'gender-rights' },
  { title: 'Racial Justice', slug: 'racial-justice' },
  { title: 'Discrimination', slug: 'discrimination' },
  { title: 'LGBTQ+ Rights', slug: 'lgbtq-rights' },
  { title: 'Voter Registration', slug: 'voter-registration' },
];

const CauseList = ({ handleClick }) => (
  <ul>
    {causes.map(({ title, slug }) => (
      <li key={title}>
        <a
          href={`/us/causes/${slug}`}
          onClick={() => {
            handleClick({
              name: `clicked_subnav_link_causes_${snakeCase(slug)}`,
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: `causes_${snakeCase(slug)}`,
            });
          }}
        >
          {title}
        </a>
      </li>
    ))}

    <li>
      <a
        href="/us/campaigns"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_all_campaigns',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_all_campaigns',
          });
        }}
      >
        All Campaigns
      </a>
    </li>
  </ul>
);

CauseList.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CauseList;
