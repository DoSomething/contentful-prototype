import newsBannerSvg from './banners/news.svg';
import communityBannerSvg from './banners/community.svg';
import lifestyleBannerSvg from './banners/lifestyle.svg';
import scholarshipsBannerSvg from './banners/scholarships.svg';

/**
 * Newsletter topic constants.
 */
export const NEWSLETTER_TOPICS = {
  community: 'community',
  lifestyle: 'lifestyle',
  news: 'news',
  scholarships: 'scholarships',
};

/**
 * Newsletter SVG Banners by topic.
 */
export const NEWSLETTER_BANNERS = {
  [NEWSLETTER_TOPICS.community]: communityBannerSvg,
  [NEWSLETTER_TOPICS.lifestyle]: lifestyleBannerSvg,
  [NEWSLETTER_TOPICS.news]: newsBannerSvg,
  [NEWSLETTER_TOPICS.scholarships]: scholarshipsBannerSvg,
};

/**
 * Newsletter text content by topic.
 */
export const NEWSLETTER_TEXT = {
  [NEWSLETTER_TOPICS.community]: {
    subtitle: 'Sent every Tuesday',
    title: "What You're Doing",
    description:
      'A roundup of photos, writing, and stories of impact from the DoSomething community and members like you.',
  },
  [NEWSLETTER_TOPICS.lifestyle]: {
    subtitle: 'Sent every Thursday',
    title: 'The Boost',
    description:
      'Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same.',
  },
  [NEWSLETTER_TOPICS.news]: {
    subtitle: 'Sent every Wednesday',
    title: 'The Breakdown',
    description:
      'Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them.',
  },
  [NEWSLETTER_TOPICS.scholarships]: {
    subtitle: 'Sent monthly every 1st Friday',
    title: 'Pays to Do Good',
    description:
      'Alerts on new ways to earn scholarships by doing social good, plus announcements of scholarship winners.',
  },
};
