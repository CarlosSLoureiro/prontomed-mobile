import { useRef, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Dialog, Divider } from 'react-native-paper';

import Paciente from '@entity/Paciente';
import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

import { ItemListagemDeGenerosContrato, ItemListagemDeTiposSanguineosContrato } from '@components/Consulta/Dialogs/Buscar/types';
import DatePicker from '@components/Formularios/DatePicker';
import SelectInput from '@components/Formularios/SelectInput';
import TextInput from '@components/Formularios/TextInput';

import getStyles from './styles';

import { CadastrarPacienteContrato } from './types';

const Cadastrar = ({
  visivel,
  setVisivel,
  callback
}: CadastrarPacienteContrato): JSX.Element => {
  const styles = getStyles();
  const [deveReposicionarComTeclado, setDeveReposicionarComTeclado] = useState(false);

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

  console.log('deve subir? ', deveReposicionarComTeclado);
  // nome
  const [paciente, setPaciente] = useState<Partial<Paciente>>({});

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

  // botões
  const cancelar = (): void => {
    setVisivel(false);
    setPaciente({});
  };
  const cadastrar = (): void => {
    setVisivel(false);
    callback(paciente);
    setPaciente({});
  };

  return (
      <Dialog visible={visivel} onDismiss={cancelar} style={styles.dialog}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} enabled={deveReposicionarComTeclado}>
          <View style={styles.dialog}>
            <Dialog.Title>Informações do paciente</Dialog.Title>
            <Dialog.Content>
              <TextInput
                inputRef={inputs.nome}
                nextInputRef={inputs.email}
                nome="Nome completo"
                icon="account"
                style={styles.textInputs}
                callback={nome => setPaciente({
                  ...paciente,
                  nome: nome.trim()
                })}
              />
              <TextInput
                inputRef={inputs.email}
                nextInputRef={inputs.telefone}
                nome="Endereço de email"
                icon="at"
                keyboard='email-address'
                style={styles.textInputs}
                callback={email => setPaciente({
                  ...paciente,
                  email: email.trim()
                })}
              />
              <TextInput
                inputRef={inputs.telefone}
                nextInputRef={inputs.dataNascimento}
                nome="Número do telefone"
                icon="cellphone-wireless"
                telefone={true}
                keyboard='phone-pad'
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
                valor={paciente.genero ?? 'Selecionar'}
                listagem={listagemDeGeneros}
                selecionados={listagemDeGeneros.filter(item => item.value === paciente.genero)}
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
                    callback={peso => setPaciente({
                      ...paciente,
                      peso: parseFloat(peso)
                    })}
                    onFocusIn={() => setDeveReposicionarComTeclado(true)}
                    onFocusOut={() => setDeveReposicionarComTeclado(false)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    inputRef={inputs.altura}
                    nextInputRef={inputs.tipoSanguineo}
                    nome="Altura (M)"
                    keyboard='decimal-pad'
                    callback={altura => setPaciente({
                      ...paciente,
                      altura: parseFloat(altura)
                    })}
                    onFocusIn={() => setDeveReposicionarComTeclado(true)}
                    onFocusOut={() => setDeveReposicionarComTeclado(false)}
                  />
                </View>
              </View>
              <SelectInput
                inputRef={inputs.tipoSanguineo}
                titulo='Tipo sanguíneo'
                multi={false}
                valor={paciente.tipoSanguineo ?? 'Selecionar'}
                listagem={listagemDeTiposSanguineos}
                selecionados={listagemDeTiposSanguineos.filter(item => item.value === paciente.tipoSanguineo)}
                callback={selecionarTipoSanguineo}
                style={styles.tipoSanguineo}
              />
              <Divider/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button labelStyle={styles.dialog.botoes} onPress={cancelar}>Cancelar</Button>
              <Button labelStyle={styles.dialog.botoes} onPress={cadastrar}>Cadastrar</Button>
            </Dialog.Actions>
          </View>
          </KeyboardAvoidingView>
        </Dialog>
  );
};

export default Cadastrar;
