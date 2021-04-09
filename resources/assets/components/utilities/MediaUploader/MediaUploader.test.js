import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import MediaUploader from './MediaUploader';

global.URL = {
  createObjectURL: () => 'File Preview URL!',
};

describe('The MediaUploader', () => {
  it('Displays an error for unsupported file types', async () => {
    const file = new File(['test image'], 'test.gif', {
      type: 'image/gif',
    });

    render(<MediaUploader onChange={() => {}} />);

    const input = screen.getByTestId('media-uploader-input');

    userEvent.upload(input, file);

    screen.getByText('Unsupported file type.');
  });

  it('Displays an error for files larger than 10MB', async () => {
    const file = new File([new ArrayBuffer(10000001), 'test'], 'test.png', {
      type: 'image/png',
    });

    render(<MediaUploader onChange={() => {}} />);

    const input = screen.getByTestId('media-uploader-input');

    userEvent.upload(input, file);

    screen.getByText('File must be no larger than 10MB.');
  });

  it('Triggers the onChange prop with file data for successful file uploades', async () => {
    const onChange = jest.fn();

    const file = new File(['test'], 'test.jpeg', {
      type: 'image/jpeg',
    });

    render(<MediaUploader onChange={onChange} />);

    const input = screen.getByTestId('media-uploader-input');

    userEvent.upload(input, file);

    expect(onChange).toHaveBeenCalledWith({
      file,
      filePreviewUrl: 'File Preview URL!',
    });
  });

  it('Displays the file preview when media is provided', () => {
    render(
      <MediaUploader onChange={() => {}} media={{ filePreviewUrl: 'File!' }} />,
    );

    screen.getByTestId('media-uploader-file-preview');
  });
});
