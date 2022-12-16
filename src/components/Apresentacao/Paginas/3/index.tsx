import Icon from 'react-native-dynamic-vector-icons';

import PaginaBase from '../Base';
import Rodape from '../Rodape';

import { PaginaContrato } from '../Base/types';

const Pagina = ({
  alterarPagina
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#FF674D';

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
        acaoBotaoEsquerdo={() => {
          alterarPagina(1);
        }}
        tituloBotaoDireito="Próximo >"
        acaoBotaoDireito={() => {
          alterarPagina(3);
        }}
      />
    </>
  );
};

export default Pagina;
