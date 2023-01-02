import Ajustes from '@screens/Principal/Ajustes';
import Item from '@components/Ajustes/Item';

import items from './items';

import { shallow } from 'enzyme';

describe('Deve renderizar a tela de inicio do app', () => {
  const wrapper = shallow(<Ajustes />);
  const itemsNomes = items.map(item => item.nome);

  const obterElementoPorNome = nome => {
    return wrapper.findWhere(node => node.name() === nome);
  };

  test('Verifica se possui os items de ajuste', () => {
    const elementos = obterElementoPorNome(Item.name);
    elementos.forEach(elemento => {
      expect(itemsNomes.includes(elemento.props().nome)).toBe(true);
      expect(elemento.type()).toBe(Item);
    });
  });
});
