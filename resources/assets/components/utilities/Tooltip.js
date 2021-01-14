import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';

import { getFormattedScreenSize } from '../../helpers/display';

const Tooltip = ({ children, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const tooltipColor = '#4a5667';

  const isSmallScreen = getFormattedScreenSize() === 'small';

  return (
    // https://github.com/alexkatz/react-tiny-popover#api
    <Popover
      isOpen={isOpen}
      positions={['top', 'bottom', 'left', 'right']}
      onClickOutside={() => setIsOpen(false)}
      padding={10}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={tooltipColor}
          arrowSize={15}
        >
          <div
            onMouseEnter={() => clearTimeout(closeTimeout)}
            onMouseLeave={() => setIsOpen(false)}
            style={{
              backgroundColor: tooltipColor,
              color: 'white',
              padding: 15,
              borderRadius: 5,
              maxWidth: 400,
              fontSize: 14,
            }}
          >
            {tooltipContent}
          </div>
        </ArrowContainer>
      )}
    >
      <button
        type="button"
        tabIndex={0}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() =>
          !isSmallScreen
            ? // Slight delay before closing tooltip to enable hovering over the tooltip itself which will keep it open.
              setCloseTimeout(setTimeout(() => setIsOpen(false), 1000))
            : {}
        }
        // Enables using the ENTER key to open the tooltip for accessibility.
        onKeyDown={event => (event.keyCode === 13 ? setIsOpen(true) : {})}
        // For mobile screens.
        onTouchStart={() => setIsOpen(true)}
      >
        {children}
      </button>
    </Popover>
  );
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  tooltipContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};

export default Tooltip;
