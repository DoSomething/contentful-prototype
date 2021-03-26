import { React } from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';
import classnames from 'classnames';

import AnalyticsWaypoint from '../AnalyticsWaypoint/AnalyticsWaypoint';

const BannerCallToAction = ({
  attributes,
  children,
  colorClasses,
  message,
  stacked,
  title,
  waypointName,
}) => {
  return (
    <article
      className={classnames(
        'base-12-grid py-16 relative',
        colorClasses.background || 'bg-yellow-500',
      )}
      {...attributes}
    >
      <AnalyticsWaypoint
        className="absolute top-0 w-full"
        name={snakeCase(`${waypointName} top`)}
      />

      <div
        className={classnames('grid-wide text-center', {
          'xl:flex xl:items-center': !stacked,
        })}
      >
        <div className={classnames({ 'text-left xl:w-8/12': !stacked })}>
          <h1
            className={classnames(
              'font-bold text-2xl',
              colorClasses.text || 'text-gray-900',
            )}
          >
            {title}
          </h1>

          <p
            className={classnames(
              'text-lg',
              colorClasses.text || 'text-gray-900',
            )}
          >
            {message}
          </p>
        </div>

        <div className={classnames({ 'flex-grow': !stacked })}>{children}</div>
      </div>

      <AnalyticsWaypoint
        className="absolute bottom-0 w-full"
        name={snakeCase(`${waypointName} bottom`)}
      />
    </article>
  );
};

BannerCallToAction.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node.isRequired,
  colorClasses: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  message: PropTypes.string.isRequired,
  stacked: PropTypes.bool,
  title: PropTypes.string.isRequired,
  waypointName: PropTypes.string,
};

BannerCallToAction.defaultProps = {
  attributes: {},
  colorClasses: {},
  stacked: false,
  waypointName: 'banner cta',
};

export default BannerCallToAction;
