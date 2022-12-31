import { useCallback } from 'react';
import Icon from 'react-native-dynamic-vector-icons';

import PaginaBase from '../Base';
import Rodape from '../Rodape';

import { PaginaContrato } from '../Base/types';

const Pagina = ({
  alterarPagina
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#1F9EFF';

  const acaoBotaoDireito = useCallback(() => {
    alterarPagina(1);
  }, []);

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<Icon type="Fontisto" name="doctor" size={172} color="white" />}
        titulo="Bem-vindo ao ProntoMed!"
      />
      <Rodape
        corDeFundo={corDeFundo}
        tituloBotaoDireito="Próximo >"
        { ...{ acaoBotaoDireito }}
      />
    </>
  );
};

export default Pagina;
