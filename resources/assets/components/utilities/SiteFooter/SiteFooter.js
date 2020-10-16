import React from 'react';

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
              >
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="32px"
                  height="32px"
                >
                  <g
                    className="fill-current"
                    id=""
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <path d="M16.707 0.027c1.747-0.027 3.48-0.013 5.213-0.027 0.107 2.040 0.84 4.12 2.333 5.56 1.493 1.48 3.6 2.16 5.653 2.387v5.373c-1.92-0.067-3.853-0.467-5.6-1.293-0.76-0.347-1.467-0.787-2.16-1.24-0.013 3.893 0.013 7.787-0.027 11.667-0.107 1.867-0.72 3.72-1.8 5.253-1.747 2.56-4.773 4.227-7.88 4.28-1.907 0.107-3.813-0.413-5.44-1.373-2.693-1.587-4.587-4.493-4.867-7.613-0.027-0.667-0.040-1.333-0.013-1.987 0.24-2.533 1.493-4.96 3.44-6.613 2.213-1.92 5.307-2.84 8.2-2.293 0.027 1.973-0.053 3.947-0.053 5.92-1.32-0.427-2.867-0.307-4.027 0.493-0.84 0.547-1.48 1.387-1.813 2.333-0.28 0.68-0.2 1.427-0.187 2.147 0.32 2.187 2.427 4.027 4.667 3.827 1.493-0.013 2.92-0.88 3.693-2.147 0.253-0.44 0.533-0.893 0.547-1.413 0.133-2.387 0.080-4.76 0.093-7.147 0.013-5.373-0.013-10.733 0.027-16.093z"></path>
                  </g>
                </svg>
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
              <a href="https://vote.dosomething.org/workwithus">
                Get Out the Vote!
              </a>
            </li>
            <li>
              <a href="/us/about/easy-scholarships">Scholarships</a>
            </li>
            <li>
              <a href="/us/about/join-our-team">Jobs</a>
            </li>
            <li>
              <a href="/us/about/internships">Internships</a>
            </li>
            <li>
              <a href="/us/articles/clubs-notify-me">DoSomething Clubs</a>
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
