import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme's React 16 adapter.
configure({ adapter: new Adapter() });

// Mock calls to `window.open`:
global.open = jest.fn().mockReturnValue({ closed: true });
