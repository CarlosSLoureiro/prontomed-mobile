import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Dialog, Divider } from 'react-native-paper';

import Paciente from '@entity/Paciente';
import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

import DatePicker from '@components/Formularios/DatePicker';
import SelectInput from '@components/Formularios/SelectInput';
import TextInput from '@components/Formularios/TextInput';
import { ItemListagemDeGenerosContrato, ItemListagemDeTiposSanguineosContrato } from '@components/Paciente/Dialogs/Buscar/types';

import getStyles from './styles';

import { CadastrarPacienteContrato } from './types';

const CadastrarEditar = ({
  formularioRef,
  visivel,
  setVisivel,
  cadastrarCallback,
  editarCallback
}: CadastrarPacienteContrato): JSX.Element => {
  const styles = getStyles();
  const [modoEdicao, setModoEdicao] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const [reposicionar, setReposicionar] = useState({
    deve: false,
    valor: 100
  });

  const inputs = {
    nome: useRef(),
    email: useRef(),
    telefone: useRef(),
    dataNascimento: useRef(),
    genero: useRef(),
    peso: useRef(),
    altura: useRef(),
    tipoSanguineo: useRef()
  };

  const [dadosAtuais, setDadosAtuais] = useState<Partial<Paciente>>({});

  const abrirDialog = (paciente: Paciente): void => {
    setVisivel(true);
    setModoEdicao(true);
    setDadosAtuais(paciente);
    setPaciente(paciente);
  };

  if (formularioRef !== undefined) {
    formularioRef.current = {
      abrirDialog
    };
  }

  const [paciente, setPaciente] = useState<Partial<Paciente>>(dadosAtuais);

  // gênero
  const listagemDeGeneros: Array<ItemListagemDeGenerosContrato> = Object.values(Generos).map((genero, index) => ({
    _id: index.toString(),
    value: genero
  }));
  const selecionarGenero = (value: any): void => {
    setPaciente({
      ...paciente,
      genero: (value.selectedList.length > 0) ? value.text as Generos : undefined
    });
  };

  // gênero
  const listagemDeTiposSanguineos: Array<ItemListagemDeTiposSanguineosContrato> = Object.values(TiposSanguineos).map((tipoSanguineo, index) => ({
    _id: index.toString(),
    value: tipoSanguineo
  }));
  const selecionarTipoSanguineo = (value: any): void => {
    setPaciente({
      ...paciente,
      tipoSanguineo: (value.selectedList.length > 0) ? value.text as TiposSanguineos : undefined
    });
  };

  let removerReposicionamento: NodeJS.Timeout;
  const reposicionarComponente = (deve = true, valor = 100): void => {
    const executar = (): void => {
      setReposicionar({
        deve,
        valor
      });
    };
    if (!deve) {
      removerReposicionamento = setTimeout(executar, 100);
    } else {
      clearTimeout(removerReposicionamento);
      executar();
    }
  };

  const cancelar = (): void => {
    setVisivel(false);
    setModoEdicao(false);
    setTimeout(() => {
      setDadosAtuais({});
      setPaciente({});
    }, 500);
  };

  const cadastrar = (): void => {
    void (async () => {
      const resultado = await cadastrarCallback(paciente);
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  const editar = (): void => {
    void (async () => {
      const resultado = await editarCallback(paciente);
      if (resultado !== undefined) {
        cancelar();
      }
    })();
  };

  useEffect(() => {
    if (reposicionar.deve && Platform.OS === 'android') {
      setTimeout(() => scrollRef?.current?.scrollToEnd({ animated: false }), 250);
    }
  }, [reposicionar]);

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <KeyboardAvoidingView
          behavior={(Platform.OS === 'android') ? 'height' : 'position'}
          keyboardVerticalOffset={reposicionar.valor}
          enabled={reposicionar.deve}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.dialog}
            keyboardShouldPersistTaps="handled"
            enabled={true}
          >
            <Dialog.Title>Informações do paciente</Dialog.Title>
            <Dialog.Content>
              <TextInput
                inputRef={inputs.nome}
                nextInputRef={inputs.email}
                nome="Nome completo"
                icon="account"
                valor={dadosAtuais.nome ?? ''}
                style={styles.textInputs}
                callback={nome => setPaciente({
                  ...paciente,
                  nome
                })}
              />
              <TextInput
                inputRef={inputs.email}
                nextInputRef={inputs.telefone}
                nome="Endereço de email"
                icon="at"
                keyboard='email-address'
                valor={dadosAtuais.email ?? ''}
                style={styles.textInputs}
                callback={email => setPaciente({
                  ...paciente,
                  email
                })}
              />
              <TextInput
                inputRef={inputs.telefone}
                nextInputRef={inputs.dataNascimento}
                nome="Número do telefone"
                icon="cellphone-wireless"
                telefone={true}
                keyboard='phone-pad'
                valor={dadosAtuais.telefone ?? ''}
                style={styles.textInputs}
                callback={telefone => setPaciente({
                  ...paciente,
                  telefone
                })}
              />
              <DatePicker
                inputRef={inputs.dataNascimento}
                nextInputRef={inputs.genero}
                nome="Data de nascimento"
                valor={dadosAtuais.dataNascimento ?? undefined}
                callback={dataNascimento => setPaciente({
                  ...paciente,
                  dataNascimento
                })}
              />
              <SelectInput
                inputRef={inputs.genero}
                nextInputRef={inputs.peso}
                titulo='Gênero'
                multi={false}
                valor={paciente.genero ?? dadosAtuais.genero ?? ''}
                listagem={listagemDeGeneros}
                selecionados={listagemDeGeneros.filter(item => item.value === (paciente.genero ?? dadosAtuais.genero))}
                callback={selecionarGenero}
                style={styles.genero}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    inputRef={inputs.peso}
                    nextInputRef={inputs.altura}
                    nome="Peso (Kg)"
                    keyboard='decimal-pad'
                    valor={(dadosAtuais.peso ?? '').toString()}
                    style={styles.textInputs}
                    callback={peso => setPaciente({
                      ...paciente,
                      peso: peso !== undefined ? parseFloat(peso.replace(',', '.')) : peso
                    })}
                    onFocusIn={() => reposicionarComponente(true)}
                    onFocusOut={() => reposicionarComponente(false)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    inputRef={inputs.altura}
                    nextInputRef={inputs.tipoSanguineo}
                    nome="Altura (M)"
                    keyboard='decimal-pad'
                    valor={(dadosAtuais.altura ?? '').toString()}
                    style={styles.textInputs}
                    callback={altura => setPaciente({
                      ...paciente,
                      altura: altura !== undefined ? parseFloat(altura.replace(',', '.')) : altura
                    })}
                    onFocusIn={() => reposicionarComponente(true)}
                    onFocusOut={() => reposicionarComponente(false)}
                  />
                </View>
              </View>
              <SelectInput
                inputRef={inputs.tipoSanguineo}
                titulo='Tipo sanguíneo'
                multi={false}
                valor={paciente.tipoSanguineo ?? dadosAtuais.tipoSanguineo ?? ''}
                listagem={listagemDeTiposSanguineos}
                selecionados={listagemDeTiposSanguineos.filter(item => item.value === (paciente.tipoSanguineo ?? dadosAtuais.tipoSanguineo))}
                callback={selecionarTipoSanguineo}
                style={styles.tipoSanguineo}
              />
              <Divider/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
              <Button labelStyle={styles.dialog.botoes} onPress={modoEdicao ? editar : cadastrar}>{modoEdicao ? 'Salvar' : 'Cadastrar'}</Button>
            </Dialog.Actions>
          </ScrollView>
          </KeyboardAvoidingView>
        </Dialog>
  );
};

export default CadastrarEditar;
