import React from 'react';

import { PHOENIX_URL } from '../../../constants';

const SiteFooter = () => (
  <footer className="footer site-footer pb-32 md:pb-3">
    <div className="footer__columns">
      <div className="footer__column -social">
        <ul>
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
              href="https://twitter.com/dosomething"
              className="social-icon -twitter"
              title="@dosomething on Twitter"
            >
              <span>@dosomething on Twitter</span>
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
              href="http://dosomething.tumblr.com"
              className="social-icon -tumblr"
              title="dosomething on Tumblr"
            >
              <span>dosomething on Tumblr</span>
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
              href="http://weheartit.com/dosomething"
              className="social-icon -weheartit"
              title="dosomething on We Heart It"
            >
              <span>dosomething on We Heart It</span>
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
            <a href="https://join.dosomething.org/">What is DoSomething.org?</a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/our-people`}>Our Team</a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/our-financials`}>
              Our Financials
            </a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/our-press`}>Press</a>
          </li>
          <li>
            <a href="https://lets.dosomething.org/">Web Magazine</a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/contact-us`}>Contact Us</a>
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
            <a href={`${PHOENIX_URL}/us/about/our-partners`}>Partners</a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/hotline-list`}>Crisis Hotlines</a>
          </li>
        </ul>
      </div>
      <div className="footer__column -links">
        <h4>Get Involved</h4>
        <ul>
          <li>
            <a href="https://vote.dosomething.org/workwithus">
              Get Out the Vote!
            </a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/easy-scholarships`}>
              Scholarships
            </a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/join-our-team`}>Jobs</a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/internships`}>Internships</a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/articles/clubs-notify-me`}>
              DoSomething Clubs
            </a>
          </li>
          <li>
            <a href={`${PHOENIX_URL}/us/about/donate`}>Donate</a>
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
          <a href={`${PHOENIX_URL}/us/about/terms-service`}>Terms of Service</a>
        </li>
        <li>
          <a href={`${PHOENIX_URL}/us/about/privacy-policy`}>Privacy Policy</a>
        </li>
      </ul>
    </div>
  </footer>
);
export default SiteFooter;
