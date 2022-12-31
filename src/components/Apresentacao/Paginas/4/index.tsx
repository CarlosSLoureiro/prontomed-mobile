import { useCallback } from 'react';
import Icon from 'react-native-dynamic-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PaginaBase from '../Base';
import Rodape from '../Rodape';

import { PaginaContrato } from '../Base/types';

const Pagina = ({
  alterarPagina,
  navigation
}: PaginaContrato): JSX.Element => {
  const corDeFundo = '#0A9400';

  const finalizarApresentacao = (): void => {
    navigation?.replace('Início');

    void (async () => {
      await AsyncStorage.setItem('ProntoMed:APRESENTAÇÃO', (true).toString());
    })();
  };

  const acaoBotaoEsquerdo = useCallback(() => {
    alterarPagina(2);
  }, []);

  const acaoBotaoDireito = useCallback(() => {
    finalizarApresentacao();
  }, []);

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
        tituloBotaoDireito="Começar!"
        { ...{ acaoBotaoEsquerdo, acaoBotaoDireito } }
      />
    </>
  );
};

export default Pagina;
