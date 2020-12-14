import React from 'react';

import TikTokIcon from './TikTokIcon';
import { query } from '../../../helpers';

const SiteFooter = () => {
  // Hide footer if we're in "chromeless" mode, e.g. for an embed:
  if (query('chromeless')) {
    return null;
  }

  return (
    <footer className="footer site-footer pb-32 md:pb-3">
      <div className="footer__columns">
        <div className="footer__column -social">
          <ul>
            <li>
              <a
                href="https://www.tiktok.com/@dosomething"
                title="dosomething on Tik Tok"
                className="hover:text-white"
                style={{ padding: 0 }}
              >
                <TikTokIcon />
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com/dosomething"
                className="social-icon -instagram"
                title="@dosomething on Instagram"
              >
                <span>@dosomething on Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/dosomething"
                className="social-icon -twitter"
                title="@dosomething on Twitter"
              >
                <span>@dosomething on Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/dosomething"
                className="social-icon -facebook"
                title="dosomething on Facebook"
              >
                <span>dosomething on Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.snapchat.com/add/dosomething"
                className="social-icon -snapchat"
                title="dosomething on Snapchat"
              >
                <span>dosomething on Snapchat</span>
              </a>
            </li>
            <li>
              <a
                href="http://www.youtube.com/user/DoSomething1"
                className="social-icon -youtube"
                title="dosomething1 on YouTube"
              >
                <span>dosomething1 on YouTube</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__column -links">
          <h4>Who We Are</h4>
          <ul>
            <li>
              <a href="https://join.dosomething.org/">
                What is DoSomething.org?
              </a>
            </li>
            <li>
              <a href="/us/about/our-people">Our Team</a>
            </li>
            <li>
              <a href="/us/about/our-financials">Our Financials</a>
            </li>
            <li>
              <a href="/us/about/our-press">Press</a>
            </li>
            <li>
              <a href="https://lets.dosomething.org/">Articles</a>
            </li>
            <li>
              <a href="/us/about/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer__column -links">
          <h4>Our Friends</h4>
          <ul>
            <li>
              <a href="http://dosomethingstrategic.org/">
                DoSomethingStrategic.org
              </a>
            </li>
            <li>
              <a href="/us/about/our-partners">Partners</a>
            </li>
            <li>
              <a href="/us/about/hotline-list">Crisis Hotlines</a>
            </li>
          </ul>
        </div>
        <div className="footer__column -links">
          <h4>Get Involved</h4>
          <ul>
            <li>
              <a href="/us/articles/clubs-notify-me">DoSomething Clubs</a>
            </li>
            <li>
              <a href="/us/about/volunteer-hours">Volunteer Hours</a>
            </li>
            <li>
              <a href="/us/about/join-our-team">Jobs</a>
            </li>
            <li>
              <a href="/us/about/internships">Internships</a>
            </li>
            <li>
              <a href="/us/about/donate">Donate</a>
            </li>
            <li>
              <a href="https://help.dosomething.org/hc/en-us">Help Center</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__subfooter border-gray-700">
        <ul>
          <li>
            <a href="/us/about/terms-service">Terms of Service</a>
          </li>
          <li>
            <a href="/us/about/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default SiteFooter;
