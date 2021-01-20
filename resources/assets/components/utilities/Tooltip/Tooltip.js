import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';

import { getFormattedScreenSize, tailwind } from '../../../helpers/display';

const Tooltip = ({ children, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const isSmallScreen = getFormattedScreenSize() === 'small';

  useEffect(() => {
    if (isSmallScreen) {
      const closeOnScroll = () => setIsOpen(false);

      window.addEventListener('scroll', closeOnScroll);

      return () => window.removeEventListener('scroll', closeOnScroll);
    }

    return undefined;
  }, []);

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
          arrowColor={tailwind('colors').gray['700']}
          arrowSize={15}
        >
          <div
            data-testid="tooltip-content"
            onMouseEnter={() => clearTimeout(closeTimeout)}
            onMouseLeave={() => setIsOpen(false)}
            className="bg-gray-700 text-white text-sm p-4 rounded-md max-w-sm"
          >
            {tooltipContent}
          </div>
        </ArrowContainer>
      )}
    >
      <button
        data-testid="tooltip-target"
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
