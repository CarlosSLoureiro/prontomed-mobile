import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import PaginaBase from '../Base';
import { PaginaContrato } from '../Base/contratos';
import Rodape from '../Rodape';

const Pagina = ({
  alterarPagina
}: PaginaContrato) => {
  const corDeFundo = "#1F9EFF";

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<Fontisto name="doctor" size={172} color="white" />}
        titulo="Bem-vindo ao ProntoMed!"
      />
      <Rodape
        corDeFundo={corDeFundo}
        tituloBotaoDireito="Próximo >"
        acaoBotaoDireito={() => {
          alterarPagina(1);
        }}
      />
    </>
  )
}

export default Pagina;