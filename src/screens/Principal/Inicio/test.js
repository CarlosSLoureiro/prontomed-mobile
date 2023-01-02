import Inicio from '@screens/Principal/Inicio';
import ConsultasCadastradasFinalizadas from '@components/Graficos/ConsultasCadastradasFinalizadas';
import IdadePacientesConsultados from '@components/Graficos/IdadePacientesConsultados';

import { shallow } from 'enzyme';

describe('Deve renderizar a tela de inicio do app', () => {
  const wrapper = shallow(<Inicio />);

  const obterElementoPorNome = (nome) => {
    return wrapper.findWhere(node => node.name() === nome);
  };

  const verificaSePossuiElemento = componente => {
    test(`Verifica se possui o elemento ${componente.name}`, () => {
      const elemento = obterElementoPorNome(componente.name);
      expect(elemento.type()).toBe(componente);
    });
  }

  [
    ConsultasCadastradasFinalizadas,
    IdadePacientesConsultados
  ].forEach(verificaSePossuiElemento);
});
