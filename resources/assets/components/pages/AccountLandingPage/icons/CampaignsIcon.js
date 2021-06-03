import React from 'react';
import PropTypes from 'prop-types';

const CampaignsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 800"
    className={className}
    width="50"
    height="50"
  >
    <g fill="currentColor">
      <path d="M769.35,262.55C756.87,211,739.27,162.43,718.44,122.08s-44-70.71-67-87.69a65.65,65.65,0,0,0-61.91-8.6h0a65.76,65.76,0,0,0-14.74,7.81L297.53,230a36.78,36.78,0,0,1-6.67,3.72h0a37.14,37.14,0,0,1-6,2L81.48,285A30.63,30.63,0,0,0,59,321.87l9.41,38.89-29.62,7.16a15.09,15.09,0,0,0-11.11,18.21L53.19,491.74a15.07,15.07,0,0,0,18.2,11.11L101,495.69l9.41,38.88A30.61,30.61,0,0,0,140.09,558a31,31,0,0,0,7.25-.87L172.48,551l91.1,203a15.06,15.06,0,0,0,17.3,8.48l82-19.84a15.08,15.08,0,0,0,10.21-20.83L284.29,524l66.45-16.08A37.28,37.28,0,0,1,357,507h0a37,37,0,0,1,7.64.25l336.43,47.89a65,65,0,0,0,9.17.65c2.07,0,4.15-.12,6.22-.31h0a43.33,43.33,0,0,0,7.61-1.1c.46-.11.92-.24,1.42-.39h0A64.09,64.09,0,0,0,768,521c13.05-25.38,20.06-63,20.27-108.89S782,314.64,769.35,262.55ZM332.62,480.38l-192.17,46.5L89.18,315l192.17-46.5c0,.16,0,.31,0,.47l.06,1.76c0,1.74.1,3.48.17,5.23l.12,2.49c.07,1.56.15,3.13.25,4.71.05.86.1,1.72.16,2.59.11,1.66.23,3.32.36,5,.06.75.11,1.51.17,2.27q.3,3.63.66,7.3c0,.16,0,.31.05.47.23,2.3.49,4.62.76,7,.09.82.19,1.65.29,2.47.21,1.7.42,3.4.65,5.11.12.93.24,1.86.37,2.8q.35,2.5.72,5c.13.9.26,1.81.4,2.72q.45,2.92.94,5.88c.1.62.19,1.25.3,1.88.43,2.58.89,5.19,1.36,7.81.13.66.26,1.34.38,2,.37,2,.74,4,1.13,5.95l.57,2.82c.35,1.77.72,3.55,1.09,5.34.21,1,.42,1.95.63,2.94q.6,2.79,1.23,5.6c.2.87.39,1.73.59,2.6q.93,4.1,1.93,8.23c.67,2.76,1.35,5.49,2,8.21.22.86.45,1.71.67,2.56.48,1.86,1,3.72,1.47,5.56.26,1,.52,1.94.79,2.9q.72,2.64,1.46,5.24c.26.93.52,1.86.79,2.78.56,1.95,1.14,3.89,1.72,5.82.19.65.38,1.3.58,1.94.77,2.55,1.56,5.08,2.35,7.58.2.6.39,1.2.59,1.8.61,1.9,1.23,3.8,1.86,5.67.29.87.59,1.73.88,2.59q.83,2.43,1.67,4.83c.32.88.63,1.76.94,2.64q.89,2.44,1.78,4.86l.85,2.31q1.25,3.3,2.51,6.54c.06.14.12.29.17.44q1.37,3.44,2.75,6.79l.89,2.11q1,2.31,2,4.59c.35.81.7,1.6,1.05,2.4q.94,2.16,1.92,4.27c.34.77.69,1.54,1.05,2.3q1.08,2.34,2.19,4.64c.27.57.53,1.13.8,1.69C332.5,480.11,332.56,480.25,332.62,480.38ZM550,89.16c-.07.32-.13.65-.19,1-.17.8-.32,1.61-.48,2.43s-.26,1.37-.39,2.07-.29,1.67-.43,2.51-.24,1.41-.35,2.13-.27,1.73-.4,2.61c-.11.72-.22,1.43-.32,2.16-.13.89-.24,1.81-.36,2.72-.1.72-.19,1.45-.28,2.18-.12,1-.23,1.91-.33,2.87-.08.72-.17,1.44-.24,2.17-.11,1-.2,2-.3,3.07-.07.7-.14,1.39-.2,2.09-.1,1.16-.19,2.34-.28,3.52-.05.6-.1,1.18-.14,1.78-.13,1.79-.25,3.6-.35,5.43-2.9,51.58,4.27,116.25,20.21,182.1,15.89,65.67,39,126.34,65.08,170.85q1.38,2.35,2.76,4.63L634,489c.62,1,1.23,2,1.85,3l1.09,1.71,1.69,2.64,1.15,1.74c.55.83,1.09,1.65,1.64,2.46l1.17,1.72,1.63,2.35,1.17,1.65q.82,1.15,1.65,2.28l1.15,1.56,1.7,2.26,1.09,1.42c.61.79,1.22,1.56,1.83,2.32.26.32.51.66.77,1L369,476.53c-1.24-.17-2.5-.31-3.76-.42h0c-.41-.78-.81-1.57-1.22-2.36s-.84-1.62-1.25-2.44c-.61-1.2-1.2-2.41-1.8-3.62l-1.16-2.36c-.65-1.36-1.3-2.75-1.95-4.14l-.93-2q-1.42-3.1-2.81-6.29l-.26-.6c-.84-1.93-1.67-3.89-2.49-5.86l-.93-2.29c-.58-1.44-1.17-2.87-1.74-4.33-.36-.9-.71-1.82-1.06-2.72-.52-1.35-1-2.7-1.55-4.07-.37-1-.73-2-1.09-2.93l-1.46-4L342.43,423c-.47-1.34-.93-2.69-1.39-4-.36-1.05-.71-2.11-1.06-3.16-.46-1.37-.91-2.75-1.35-4.13-.35-1.07-.69-2.14-1-3.21l-1.32-4.25c-.33-1.08-.66-2.15-1-3.23-.44-1.47-.87-2.95-1.3-4.43l-.93-3.2c-.44-1.56-.88-3.14-1.31-4.72-.28-1-.57-2-.84-3-.48-1.75-.94-3.53-1.4-5.32-.23-.86-.46-1.72-.68-2.59q-1-4-2-8.06t-1.9-8.09c-.2-.87-.38-1.73-.58-2.6-.4-1.8-.81-3.6-1.19-5.39-.22-1-.43-2.05-.64-3.07-.34-1.61-.67-3.22-1-4.82l-.63-3.25q-.45-2.28-.87-4.56l-.6-3.3c-.26-1.47-.52-2.94-.77-4.4-.19-1.11-.37-2.21-.55-3.31-.24-1.44-.47-2.88-.69-4.31-.17-1.1-.34-2.19-.5-3.27-.21-1.43-.42-2.84-.61-4.26-.15-1.07-.3-2.14-.44-3.21-.19-1.42-.37-2.83-.54-4.24-.13-1-.26-2.07-.38-3.1-.17-1.46-.32-2.9-.47-4.34-.11-1-.22-1.93-.31-2.89-.16-1.56-.29-3.1-.43-4.64-.07-.83-.15-1.66-.22-2.48q-.25-3.15-.46-6.25c0-.25,0-.5-.05-.75-.15-2.31-.27-4.6-.38-6.87,0-.74-.05-1.47-.08-2.2-.06-1.53-.12-3.07-.16-4.58,0-.88,0-1.74,0-2.61,0-1.36,0-2.71-.06-4.06,0-.91,0-1.82,0-2.73s0-1.79,0-2.67h0c1.08-.67,2.13-1.37,3.15-2.09l71.13-50.38,12.47-8.83ZM718,523.9c-.63.14-1.26.26-1.89.37l-.57.08-1,.16h-.09c-4,0-19.46-2.3-43.2-35.41l-.06-.09q-.63-.87-1.26-1.77l-.15-.22-1.19-1.71-.24-.36c-.38-.54-.75-1.09-1.13-1.65l-.31-.47c-.36-.53-.71-1.06-1.07-1.61-.13-.2-.27-.42-.41-.62l-1-1.52-.51-.8-.92-1.43c-.19-.32-.39-.64-.59-1s-.57-.9-.85-1.36-.46-.74-.68-1.11-.53-.84-.79-1.27l-.81-1.35c-.23-.37-.45-.74-.67-1.11-.5-.84-1-1.68-1.5-2.54q-1.15-2-2.3-4C638.65,434.92,623.79,400,611.3,361.41c22.25-11.53,45.82-32.91,36.77-70.3s-39.66-45.37-64.65-45.26c-6.73-41.67-9.36-80.95-7.49-114.23.48-8.43,1.25-16.4,2.31-23.8.22-1.54.45-3,.69-4.54a146.12,146.12,0,0,1,6.82-27.13c.21-.58.43-1.14.66-1.7.05-.12.09-.25.14-.38.16-.39.32-.77.49-1.15s.23-.58.35-.85l.47-1c.13-.29.26-.59.39-.87s.31-.64.47-1l.42-.87c.15-.3.31-.59.46-.88s.3-.57.45-.84.31-.55.46-.82.31-.55.46-.81l.48-.77c.16-.25.31-.51.47-.75l.48-.72.48-.7c.16-.23.33-.44.49-.66l.49-.66c.16-.21.33-.4.49-.6l.5-.61.5-.55.51-.55.5-.49c.17-.17.34-.34.52-.5s.33-.29.5-.44l.53-.44a6,6,0,0,1,.5-.38c.17-.13.35-.27.53-.39l.5-.32.55-.33.49-.26.48-.23a32.61,32.61,0,0,1,3.17-1,34.27,34.27,0,0,1,28.93,5.65c18.88,14,39.42,41.3,57.84,77,19.71,38.18,36.41,84.36,48.31,133.54,23.56,97.36,24.06,192.59,1.25,237A33.27,33.27,0,0,1,718,523.9Z" />
    </g>
  </svg>
);

CampaignsIcon.propTypes = {
  className: PropTypes.string,
};

CampaignsIcon.defaultProps = {
  className: null,
};

export default CampaignsIcon;