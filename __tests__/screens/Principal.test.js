import React from "react";
import { shallow } from 'enzyme';
import Principal from "@screens/Principal";
import Inicio from "@screens/Principal/Inicio";
import Consultas from "@screens/Principal/Consultas";
import Pacientes from "@screens/Principal/Pacientes";
import Ajustes from "@screens/Principal/Ajustes";

describe("Deve renderizar a tela principal do app", () => {
    const wrapper = shallow(<Principal />);

    const obterViewPorKey = (key) => {
        return wrapper.findWhere(node => node.name() === 'View' && parseInt(node.key()) === key);
    }

    test('Deve exibir a tela de início na view com key=1', () => {
        const view = obterViewPorKey(1);
        expect(view.children().type()).toBe(Inicio);
    });

    test('Deve exibir a tela de consultas na view com key=2', () => {
        const view = obterViewPorKey(2);
        expect(view.children().type()).toBe(Consultas);
    });

    test('Deve exibir a tela de pacientes na view com key=3', () => {
        const view = obterViewPorKey(3);
        expect(view.children().type()).toBe(Pacientes);
    });

    test('Deve exibir a tela de ajustes na view com key=4', () => {
        const view = obterViewPorKey(4);
        expect(view.children().type()).toBe(Ajustes);
    });
});