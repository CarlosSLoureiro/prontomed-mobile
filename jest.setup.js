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

jest.mock('@expo/vector-icons', () => ({
    AntDesign: jest.fn(),
    Entypo: jest.fn(),
    EvilIcons: jest.fn(),
    Feather: jest.fn(),
    Fontisto: jest.fn(),
    FontAwesome: jest.fn(),
    FontAwesome5: jest.fn(),
    Foundation: jest.fn(),
    Ionicons: jest.fn(),
    MaterialCommunityIcons: jest.fn(),
    MaterialIcons: jest.fn(),
    Octicons: jest.fn(),
    SimpleLineIcons: jest.fn(),
    Zocial: jest.fn(),
}));