import Icon from 'react-native-dynamic-vector-icons';
import PaginaBase from '../Base';
import { PaginaContrato } from '../Base/types';
import Rodape from '../Rodape';

const Pagina = ({
  alterarPagina
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#E45EFF';

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
        acaoBotaoEsquerdo={() => {
          alterarPagina(0);
        }}
        tituloBotaoDireito="Próximo >"
        acaoBotaoDireito={() => {
          alterarPagina(2);
        }}
      />
    </>
  );
};

export default Pagina;
