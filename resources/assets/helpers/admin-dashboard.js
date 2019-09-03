/* global document */
/* eslint-disable import/prefer-default-export */

import { toggleClassHandler } from '.';

export function bindAdminDashboardEvents() {
  const adminDashboard = document.getElementById('admin-dashboard');
  const adminDashboardToggle = document.getElementById(
    'js-admin-dashboard-toggle',
  );

  toggleClassHandler(adminDashboardToggle, adminDashboard, 'is-visible');
}
