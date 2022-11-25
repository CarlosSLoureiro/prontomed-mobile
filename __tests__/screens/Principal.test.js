import { shallow } from 'enzyme';
import Principal from '@screens/Principal';
import Inicio from '@screens/Principal/Inicio';
import Consultas from '@screens/Principal/Consultas';
import Pacientes from '@screens/Principal/Pacientes';
import Ajustes from '@screens/Principal/Ajustes';

describe('Deve renderizar a tela principal do app', () => {
  const wrapper = shallow(<Principal />);

  const obterElementoPorKey = (key) => {
    return wrapper.findWhere(node => parseInt(node.key()) === key);
  };

  test('Deve exibir a tela de início com a key=0', () => {
    const elemento = obterElementoPorKey(0);
    expect(elemento.type()).toBe(Inicio);
  });

  test('Deve exibir a tela de consultas com a key=1', () => {
    const elemento = obterElementoPorKey(1);
    expect(elemento.type()).toBe(Consultas);
  });

  test('Deve exibir a tela de pacientes com a key=2', () => {
    const elemento = obterElementoPorKey(2);
    expect(elemento.type()).toBe(Pacientes);
  });

  test('Deve exibir a tela de ajustes com a key=3', () => {
    const elemento = obterElementoPorKey(3);
    expect(elemento.type()).toBe(Ajustes);
  });
});
