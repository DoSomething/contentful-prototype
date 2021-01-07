/* global document */

import { toggleClassHandler } from './display';

export function bindAdminDashboardEvents() {
  const adminDashboard = document.getElementById('admin-dashboard');
  const adminDashboardToggle = document.getElementById(
    'js-admin-dashboard-toggle',
  );

  toggleClassHandler(adminDashboardToggle, adminDashboard, 'is-visible');
}

export default null;
