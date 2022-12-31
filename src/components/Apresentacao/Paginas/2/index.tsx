import { useCallback } from 'react';
import Icon from 'react-native-dynamic-vector-icons';

import PaginaBase from '../Base';
import Rodape from '../Rodape';

import { PaginaContrato } from '../Base/types';

const Pagina = ({
  alterarPagina
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#E45EFF';

  const acaoBotaoEsquerdo = useCallback(() => {
    alterarPagina(0);
  }, []);

  const acaoBotaoDireito = useCallback(() => {
    alterarPagina(2);
  }, []);

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<Icon type="Entypo" name="users" size={172} color="white" />}
        titulo="Cadastre seus pacientes!"
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
