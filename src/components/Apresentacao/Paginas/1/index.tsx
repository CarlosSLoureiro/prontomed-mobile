import Icon from 'react-native-dynamic-vector-icons';

import PaginaBase from '../Base';
import { PaginaContrato } from '../Base/types';
import Rodape from '../Rodape';

const Pagina = ({
  alterarPagina
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#1F9EFF';

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
        acaoBotaoDireito={() => {
          alterarPagina(1);
        }}
      />
    </>
  );
};

export default Pagina;
