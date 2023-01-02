import Pacientes from '@screens/Principal/Pacientes';
import MenuOpcoes from '@components/MenuOpcoes';
import AgendarConsulta from '@components/Paciente/Dialogs/AgendarConsulta';
import AgendarConsultaEmConflito from '@components/Paciente/Dialogs/AgendarConsultaEmConflito';
import Buscar from '@components/Paciente/Dialogs/Buscar';
import CadastrarEditar from '@components/Paciente/Dialogs/CadastrarEditar';
import Excluir from '@components/Paciente/Dialogs/Excluir';
import Ordenar from '@components/Paciente/Dialogs/Ordenar';

import { shallow } from 'enzyme';

describe('Deve renderizar a tela de pacientes do app', () => {
  const wrapper = shallow(<Pacientes />);

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
    Buscar,
    AgendarConsulta,
    AgendarConsultaEmConflito,
    CadastrarEditar,
    Excluir,
    Ordenar,
    MenuOpcoes
  ].forEach(verificaSePossuiElemento)
});
