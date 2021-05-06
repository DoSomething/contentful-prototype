import React from 'react';
import PropTypes from 'prop-types';

import { EVENT_CATEGORIES } from '../../helpers/analytics';

const CauseList = ({ handleClick }) => (
  <ul>
    <li>
      <a
        href="/us/causes/education"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_education',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_education',
          });
        }}
      >
        Education
      </a>
      <a
        href="/us/causes/gun-violence"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_gun_violence',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_gun_violence',
          });
        }}
      >
        Gun Violence
      </a>
    </li>
    <li>
      <a
        href="/us/causes/mental-health"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_mental_health',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_mental_health',
          });
        }}
      >
        Mental Health
      </a>
    </li>
    <li>
      <a
        href="/us/causes/physical-health"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_physical_health',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_physical_health',
          });
        }}
      >
        Physical Health
      </a>
    </li>
    <li>
      <a
        href="/us/causes/homelessness-and-poverty"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_homelessness_and_poverty',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_homelessness_and_poverty',
          });
        }}
      >
        Homelessness & Poverty
      </a>
    </li>
    <li>
      <a
        href="/us/causes/environment"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_environment',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_environment',
          });
        }}
      >
        Environment
      </a>
    </li>
    <li>
      <a
        href="/us/causes/sexual-harassment"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_sexual_harassment',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_sexual_harassment',
          });
        }}
      >
        Sexual Harassment
      </a>
    </li>
    <li>
      <a
        href="/us/causes/bullying"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_bullying',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_bullying',
          });
        }}
      >
        Bullying
      </a>
    </li>
    <li>
      <a
        href="/us/causes/gender-rights"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_gender_rights',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_gender_rights',
          });
        }}
      >
        Gender Rights
      </a>
    </li>
    <li>
      <a
        href="/us/causes/racial-justice"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_racial_justice',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_racial_justice',
          });
        }}
      >
        Racial Justice
      </a>
    </li>
    <li>
      <a
        href="/us/causes/discrimination"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_discrimination',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_discrimination',
          });
        }}
      >
        Discrimination
      </a>
    </li>
    <li>
      <a
        href="/us/causes/lgbtq-rights"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_lgbtq_rights',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_lgbtq_rights',
          });
        }}
      >
        LGBTQ+ Rights
      </a>
    </li>
    <li>
      <a
        href="/us/causes/voter-registration"
        onClick={() => {
          handleClick({
            name: 'clicked_subnav_link_causes_voter_registration',
            action: 'link_clicked',
            category: EVENT_CATEGORIES.navigation,
            label: 'causes_voter_registration',
          });
        }}
      >
        Voter Registration
      </a>
    </li>
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
