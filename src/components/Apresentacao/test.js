import { Pagina1, Pagina2, Pagina3, Pagina4 } from '@components/Apresentacao';

import { shallow } from 'enzyme';

const obterDadosDaPagina = (component) => {
  const wrapper = shallow(component);
  const paginaBase = wrapper.findWhere(node => node.name() === 'PaginaBase');
  const pagina = paginaBase.at(0).props();
  const icone = pagina.icone.props;

  return {
    pagina,
    icone
  };
};

describe('Deve renderizar todas as páginas do component de apresentação', () => {
  test('Pagina 1', () => {
    const dados = obterDadosDaPagina(<Pagina1 />);
    expect(dados.icone.name).toEqual('doctor');
    expect(dados.pagina.titulo).toEqual('Bem-vindo ao ProntoMed!');
    expect(dados.pagina.corDeFundo).toEqual('#1F9EFF');
  });

  test('Pagina 2', () => {
    const dados = obterDadosDaPagina(<Pagina2 />);
    expect(dados.icone.name).toEqual('users');
    expect(dados.pagina.titulo).toEqual('Cadastre seus pacientes!');
    expect(dados.pagina.corDeFundo).toEqual('#E45EFF');
  });

  test('Pagina 3', () => {
    const dados = obterDadosDaPagina(<Pagina3 />);
    expect(dados.icone.name).toEqual('calendar-check-o');
    expect(dados.pagina.titulo).toEqual('Registre suas consultas!');
    expect(dados.pagina.corDeFundo).toEqual('#FF674D');
  });

  test('Pagina 4', () => {
    const dados = obterDadosDaPagina(<Pagina4 />);
    expect(dados.icone.name).toEqual('checklist');
    expect(dados.pagina.titulo).toEqual('Tudo de forma fácil, prática e grátis!');
    expect(dados.pagina.corDeFundo).toEqual('#0A9400');
  });
});
