import newsBannerSvg from './banners/news.svg';
import communityBannerSvg from './banners/community.svg';
import lifestyleBannerSvg from './banners/lifestyle.svg';
import scholarshipsBannerSvg from './banners/scholarships.svg';

/**
 * Email Subscription topic constants.
 */
export const EMAIL_SUBSCRIPTION_TOPICS = {
  community: 'community',
  lifestyle: 'lifestyle',
  news: 'news',
  scholarships: 'scholarships',
};

/**
 * Email Subscription SVG Banners by topic.
 */
export const EMAIL_SUBSCRIPTION_BANNERS = {
  [EMAIL_SUBSCRIPTION_TOPICS.community]: communityBannerSvg,
  [EMAIL_SUBSCRIPTION_TOPICS.lifestyle]: lifestyleBannerSvg,
  [EMAIL_SUBSCRIPTION_TOPICS.news]: newsBannerSvg,
  [EMAIL_SUBSCRIPTION_TOPICS.scholarships]: scholarshipsBannerSvg,
};

/**
 * Email Subscription text content by topic.
 */
export const EMAIL_SUBSCRIPTION_TEXT = {
  [EMAIL_SUBSCRIPTION_TOPICS.community]: {
    subtitle: 'Sent every Tuesday',
    title: "What You're Doing",
    description:
      'A roundup of photos, writing, and stories of impact from the DoSomething community and members like you.',
  },
  [EMAIL_SUBSCRIPTION_TOPICS.lifestyle]: {
    subtitle: 'Sent every Thursday',
    title: 'The Boost',
    description:
      'Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same.',
  },
  [EMAIL_SUBSCRIPTION_TOPICS.news]: {
    subtitle: 'Sent every Wednesday',
    title: 'The Breakdown',
    description:
      'Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them.',
  },
  [EMAIL_SUBSCRIPTION_TOPICS.scholarships]: {
    subtitle: 'Sent monthly every 1st Friday',
    title: 'Pays to Do Good',
    description:
      'Alerts on new ways to earn scholarships by doing social good, plus announcements of scholarship winners.',
  },
};
