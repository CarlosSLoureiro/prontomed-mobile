import { useCallback } from 'react';
import Icon from 'react-native-dynamic-vector-icons';

import PaginaBase from '../Base';
import Rodape from '../Rodape';

import { PaginaContrato } from '../Base/types';

const Pagina = ({
  alterarPagina
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#FF674D';

  const acaoBotaoEsquerdo = useCallback(() => {
    alterarPagina(1);
  }, []);

  const acaoBotaoDireito = useCallback(() => {
    alterarPagina(3);
  }, []);

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<Icon type="FontAwesome" name="calendar-check-o" size={172} color="white" />}
        titulo="Registre suas consultas!"
      />
      <Rodape
        corDeFundo={corDeFundo}
        tituloBotaoEsquerdo="< Voltar"
        tituloBotaoDireito="Próximo >"
        { ...{ acaoBotaoEsquerdo, acaoBotaoDireito } }
      />
    </>
  );
};

export default Pagina;
