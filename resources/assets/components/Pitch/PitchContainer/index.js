import React from 'react';
import PropTypes from 'prop-types';

import './pitchContainer.scss';

const backgroundPropTypes = PropTypes.shape({
  type: PropTypes.oneOf(['color', 'video', 'photo']),
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      poster: PropTypes.string,
      sources: PropTypes.arrayOf(PropTypes.shape({
        uri: PropTypes.string,
        type: PropTypes.oneOf(['webm', 'mp4', 'ogv']),
      })),
    }),
  ]),
});

const getContainerStyle = ({ type, data }) => {
  if (type === 'video') return {};

  return {
    background: type === 'color' ? data : `url(${data})`,
  };
};

const PitchContainerVideo = ({ background }) => {
  if (background.type !== 'video') return null;

  const { poster, sources } = background.data;
  return (
    <video playsInline autoPlay muted loop poster={poster}>
      {sources.map(video => (
        <source key={video.uri} src={video.uri} type={`video/${video.type}`} />
      ))}
    </video>
  );
};

PitchContainerVideo.propTypes = {
  background: backgroundPropTypes,
};

PitchContainerVideo.defaultProps = {
  background: {
    type: 'color',
  },
};

const PitchContainer = ({ children, padding, background, scrollHint }) => (
  <article
    className="pitch-container"
    style={getContainerStyle(background)}
  >
    <PitchContainerVideo background={background} />
    <div className="pitch-container__absolute">
      <div className={`pitch-container__content ${padding ? '-padding' : ''}`}>
        { children }
      </div>
    </div>
    { scrollHint ? <span className="pitch-container__scroll-hint" /> : null }
  </article>
);

PitchContainer.propTypes = {
  children: PropTypes.node.isRequired,
  background: backgroundPropTypes,
  padding: PropTypes.bool,
  scrollHint: PropTypes.bool,
};

PitchContainer.defaultProps = {
  background: {
    type: 'color',
    data: '#111',
  },
  padding: true,
  scrollHint: false,
};

export default PitchContainer;
