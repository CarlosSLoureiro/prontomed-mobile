import React from "react";
import { shallow } from 'enzyme';
import Inicio from "@screens/Principal";

describe("Deve renderizar a tela de inicio do app", () => {
    const wrapper = shallow(<Inicio />);

    test('Deve exibir mensagem na tela', () => {
        const text = wrapper.findWhere(node => node.name() === 'Text');
        expect(text.at(0).props().children).toEqual('Página inicial do ProntoMed!');
    });
});