/* global document */

import { toggleHandler } from '../helpers';

export function bindAdminDashboardEvents() {
  const adminDashboard = document.getElementById('admin-dashboard');
  const adminDashboardToggle = document.getElementById(
    'js-admin-dashboard-toggle',
  );

  console.log(adminDashboardToggle);

  toggleHandler(adminDashboardToggle, adminDashboard, 'is-visible');
}
