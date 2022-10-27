import React from "react";
import { shallow } from 'enzyme';
import Inicio from "@screens/Inicio";

describe("Deve renderizar a tela", () => {
    const wrapper = shallow(<Inicio />);

    test('Deve exibir mensagem na tela', () => {
        const text = wrapper.findWhere(node => node.name() === 'Text');
        expect(text.at(0).props().children).toEqual('Bem-vindo ao ProntoMed!');
    });
});