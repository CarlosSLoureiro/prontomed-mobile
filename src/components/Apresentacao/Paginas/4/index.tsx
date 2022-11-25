import Icon from 'react-native-dynamic-vector-icons';

import PaginaBase from '../Base';
import { PaginaContrato } from '../Base/types';
import Rodape from '../Rodape';

const Pagina = ({
  alterarPagina,
  navigation
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#0A9400';

  return (
    <>
      <PaginaBase
        corDeFundo={corDeFundo}
        icone={<Icon type="Octicons" name="checklist" size={172} color="white" />}
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
          navigation?.replace('Início');
        }}
      />
    </>
  );
};

export default Pagina;
