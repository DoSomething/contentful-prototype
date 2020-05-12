import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import * as reactPdfMock from '@react-pdf/renderer';

import CertificateDownloadButton from './CertificateDownloadButton';
import { mockParsedPostsData } from './volunteer-credits-mock-data';

jest.mock('./CertificateTemplate');
jest.mock('../../../../helpers/analytics');
jest.mock('../../../blocks/ErrorBlock/ErrorBlock', () => 'mock-error-block');

global.URL.createObjectURL = jest.fn();

// Mocks the react-pdf 'pdf' method which we use to generate the PDF.
reactPdfMock.pdf = jest.fn(() => ({
  toBlob: () => Promise.resolve(new Blob()),
}));

describe('CertificateDownloadButton component', () => {
  describe('With a pending post', () => {
    const wrapper = mount(
      <CertificateDownloadButton certificatePost={mockParsedPostsData[0]} />,
    );

    it('renders a disabled, "pending" button', () => {
      const button = wrapper.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('pending');
      expect(button.prop('disabled')).toBe(true);
    });
  });

  describe('With an accepted post', () => {
    describe('A successful PDF download flow', () => {
      const wrapper = mount(
        <CertificateDownloadButton certificatePost={mockParsedPostsData[2]} />,
      );

      const button = wrapper.find('button');

      it('renders a "download" button', () => {
        expect(button.length).toEqual(1);
        expect(button.text()).toEqual('download');
      });

      it('switches to "loading" when clicked, and generates the PDF', async () => {
        button.simulate('click');

        expect(button.text()).toEqual('loading');

        // 'Wait' for the PDF to download.
        await act(async () => {});

        expect(reactPdfMock.pdf).toHaveBeenCalled();
      });

      it('switches back to "download" and doesn\'t generate the PDF again', () => {
        expect(button.text()).toEqual('download');

        // Click the button a second time.
        button.simulate('click');

        // We should not have invoked the libraries 'pdf' method again.
        expect(reactPdfMock.pdf).toHaveBeenCalledTimes(0);
        // We shoud not switch to "loading" state again.
        expect(button.text()).toEqual('download');
      });
    });

    describe('An unsuccessful PDF download flow', () => {
      it('renders an error block when the PDF download fails', async () => {
        const wrapper = mount(
          <CertificateDownloadButton
            certificatePost={mockParsedPostsData[2]}
          />,
        );

        const button = wrapper.find('button');

        // Mock an error during the PDF generation.
        reactPdfMock.pdf = jest.fn(() => {
          throw new Error();
        });

        button.simulate('click');

        // 'Wait' for the PDF to generate (and fail).
        await act(async () => {});

        wrapper.update();

        expect(wrapper.find('mock-error-block').length).toEqual(1);
      });
    });
  });
});
