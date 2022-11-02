import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import PaginaBase from '../Base';
import { PaginaContrato } from '../Base/contratos';
import Rodape from '../Rodape';

const Pagina = ({
  alterarPagina
}: PaginaContrato) => {
  const corDeFundo = "#FF674D";

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<FontAwesome name="calendar-check-o" size={172} color="white" />}
        titulo="Registre suas consultas!"
      />
      <Rodape
        corDeFundo={corDeFundo}
        tituloBotaoEsquerdo="< Voltar"
        acaoBotaoEsquerdo={() => {
          alterarPagina(1);
        }}
        tituloBotaoDireito="Próximo >"
        acaoBotaoDireito={() => {
          alterarPagina(3);
        }}
      />
    </>
  )
}

export default Pagina;