import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme's React 16 adapter.
configure({ adapter: new Adapter() });

// Mock calls to `window.open`:
global.open = jest.fn().mockReturnValue({ closed: true });

// Mock the ContentfulEntry import to prevent circular dependency issues unique to the jest/node runtime.
jest.mock('./resources/assets/components/ContentfulEntry/ContentfulEntry');
