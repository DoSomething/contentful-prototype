/* global document */
/* eslint-disable import/prefer-default-export */

import { toggleHandler } from '../helpers';

export function bindAdminDashboardEvents() {
  const adminDashboard = document.getElementById('admin-dashboard');
  const adminDashboardToggle = document.getElementById(
    'js-admin-dashboard-toggle',
  );

  toggleHandler(adminDashboardToggle, adminDashboard, 'is-visible');
}
