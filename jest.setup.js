import Adapter from '@cfaester/enzyme-adapter-react-18';
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

jest.mock('expo-calendar', () => {});

jest.mock('@paraboly/react-native-card', () => {});

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn()
}));

jest.mock('@utils/Observacoes', () => ({
    cadastrar: jest.fn()
}));