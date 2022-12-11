import Apresentacao from '@screens/Apresentacao';
import { Pagina1, Pagina2, Pagina3, Pagina4 } from '@components/Apresentacao';

import { shallow } from 'enzyme';

describe('Deve renderizar a tela de apresentação do app', () => {
  const wrapper = shallow(<Apresentacao />);

  const obterViewPorKey = (key) => {
    return wrapper.findWhere(node => node.name() === 'View' && parseInt(node.key()) === key);
  };

  test('Deve exibir a página 1 na view com key=0', () => {
    const view = obterViewPorKey(0);
    expect(view.children().type()).toBe(Pagina1);
  });

  test('Deve exibir a página 2 na view com key=1', () => {
    const view = obterViewPorKey(1);
    expect(view.children().type()).toBe(Pagina2);
  });

  test('Deve exibir a página 3 na view com key=2', () => {
    const view = obterViewPorKey(2);
    expect(view.children().type()).toBe(Pagina3);
  });

  test('Deve exibir a página 4 na view com key=3', () => {
    const view = obterViewPorKey(3);
    expect(view.children().type()).toBe(Pagina4);
  });
});
