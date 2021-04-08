import React from 'react';
import { shallow } from 'enzyme';

import MediaUploader from './MediaUploader';

test('MediaUploader snapshot test', () => {
  shallow(<MediaUploader onChange={() => {}} />);

  // Add unit tests here.
});
