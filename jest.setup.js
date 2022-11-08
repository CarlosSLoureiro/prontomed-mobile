import Adapter from '@carlossloureiro/enzyme-adapter-react-18';
import { configure } from 'enzyme';

configure({adapter: new Adapter()});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => ({
    ParamListBase: jest.fn(),
    useNavigation: jest.fn()
}));

jest.mock('@react-navigation/stack', () => ({
    StackNavigationProp: jest.fn()
}));