import React from 'react';
import { Octicons } from '@expo/vector-icons';
import PaginaBase from '../Base';
import { PaginaContrato } from '../Base/contratos';
import Rodape from '../Rodape';

const Pagina = ({
  alterarPagina,
  navigation
}: PaginaContrato) => {
  const corDeFundo = "#0A9400";

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<Octicons name="checklist" size={172} color="white" />}
        titulo="Tudo de forma fácil, prática e grátis!"
      />
      <Rodape
        corDeFundo={corDeFundo}
        tituloBotaoEsquerdo="< Voltar"
        acaoBotaoEsquerdo={() => {
          alterarPagina(2);
        }}
        tituloBotaoDireito="Começar!"
        acaoBotaoDireito={() => {
          navigation?.replace("Início");
        }}
      />
    </>
  )
}

export default Pagina;