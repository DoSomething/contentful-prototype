import React from 'react';
import PropTypes from 'prop-types';

const Affiliate = ({ title, link, prefix = null }) =>
  link ? (
    <React.Fragment>
      {prefix}
      <a
        href={link}
        className="whitespace-no-wrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    </React.Fragment>
  ) : (
    <React.Fragment>
      {prefix}
      <span className="whitespace-no-wrap">{title}</span>
    </React.Fragment>
  );

Affiliate.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

Affiliate.defaultProps = {
  link: null,
  prefix: null,
};

const AffiliateCredits = ({ affiliatePartners, affiliateSponsors }) => {
  const affiliates = affiliateSponsors.concat(affiliatePartners);

  const affiliatesString = affiliates.map((affiliate, index, array) => {
    let prefix = null;

    if (index !== 0) {
      // Add commas after the first item, or use "and" for the last item.
      prefix = index !== array.length - 1 ? ', ' : ' and ';
    }

    return (
      <Affiliate
        link={affiliate.fields.link}
        title={affiliate.fields.title}
        prefix={prefix}
        key={affiliate.id}
      />
    );
  });

  return affiliates.length ? (
    <div className="w-1/2 float-left">
      In partnership with {affiliatesString}
    </div>
  ) : null;
};

AffiliateCredits.propTypes = {
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
};

AffiliateCredits.defaultProps = {
  affiliateSponsors: [],
  affiliatePartners: [],
};

export default AffiliateCredits;
