import Consultas from '@screens/Principal/Consultas';
import Buscar from '@components/Consulta/Dialogs/Buscar';
import Excluir from '@components/Consulta/Dialogs/Excluir';
import FiltrarDatas from '@components/Consulta/Dialogs/FiltrarDatas';
import FinalizarReabrir from '@components/Consulta/Dialogs/FinalizarReabrir';
import Observacoes from '@components/Consulta/Dialogs/Observacoes';
import Ordenar from '@components/Consulta/Dialogs/Ordenar';
import ReagendarConsulta from '@components/Consulta/Dialogs/Reagendar';
import ReagendarEmConflito from '@components/Consulta/Dialogs/ReagendarEmConflito';
import Legenda from '@components/Consulta/Legenda';
import MenuOpcoes from '@components/MenuOpcoes';

import { shallow } from 'enzyme';

describe('Deve renderizar a tela de consultas do app', () => {
  const wrapper = shallow(<Consultas />);

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
    Legenda,
    Buscar,
    FiltrarDatas,
    ReagendarConsulta,
    ReagendarEmConflito,
    Excluir,
    FinalizarReabrir,
    Observacoes,
    Ordenar,
    MenuOpcoes
  ].forEach(verificaSePossuiElemento);
});
