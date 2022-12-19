import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { Card } from '@paraboly/react-native-card';

import Calendario from '@hooks/useCalendario';
import Notification from '@hooks/useNotification';

import MenuContexto from './menu';
import getStyles from './styles';

import { PacienteCardContrato } from './types';

const PacienteCard = ({
  paciente,
  agendarFormularioRef,
  editarFormularioRef,
  excluirFormularioRef,
  ultimo = false
}: PacienteCardContrato): JSX.Element => {
  const [exibirMenu, setExibirMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [idade, setIdade] = useState(0);
  const [mesesIdade, setMesesIdade] = useState(0);
  const [imc, setIMC] = useState(0);

  const styles = getStyles();
  const cardIconStyles = styles.card.icon(paciente.genero);

  const abrirMenu = (): void => setExibirMenu(true);
  const fecharMenu = (): void => setExibirMenu(false);

  const abrirMenuContexto = (event: { nativeEvent: any }): void => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY
    };

    setMenuAnchor(anchor);
    abrirMenu();
  };

  const calcularIdade = (dataNascimento: Date): number => {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const m = hoje.getMonth() - dataNascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const calcularMesesDeIdade = (dataNascimento: Date): number => {
    const hoje = new Date();
    return hoje.getMonth() - dataNascimento.getMonth();
  };

  const calcularIMC = (peso: number, altura: number): number => {
    return Number((peso / (altura * altura)).toFixed(1));
  };

  /* Fonte para exibição do resultado: https://viverbem.unimedbh.com.br/prevencao-e-controle/o-que-e-imc-como-calcular/ */
  const exibirResultadoIMC = (): void => {
    const idadeParaCalcular = 18;
    if (idade >= idadeParaCalcular) {
      const ranges = (idade < 50)
        ? {
            baixo: 18.5,
            normal: 24.9,
            alto: 29.9
          }
        : {
            baixo: 22,
            normal: 27,
            alto: 30
          };

      const titulo = `IMC de ${paciente.nome} é ${imc}`;

      Notification.close();

      if (imc < ranges.baixo) {
        Notification.warn({
          title: titulo,
          description: 'Seu paciente, encontra-se abaixo do peso ideal',
          duration: 30000
        });
      } else if (imc >= ranges.baixo && imc < ranges.normal) {
        Notification.success({
          title: titulo,
          description: 'Seu paciente, encontra-se com o peso ideal',
          duration: 30000
        });
      } else if (imc >= ranges.normal && imc < ranges.alto) {
        Notification.warn({
          title: titulo,
          description: 'Seu paciente, encontra-se acima do peso ideal',
          duration: 30000
        });
      } else if (imc >= ranges.alto) {
        Notification.error({
          title: titulo,
          description: 'Seu paciente, encontra-se muito acima do peso ideal',
          duration: 30000
        });
      }
    } else {
      Notification.info({
        title: `O paciente deve ter ao menos ${idadeParaCalcular} anos de idade!`
      });
    }
  };

  const fazerLigacao = (): void => {
    const apenasNumeros = paciente.telefone.replace(/\D/g, '');
    void Linking.openURL(`tel:${apenasNumeros}`);
  };

  const enviarEmail = (): void => {
    if (paciente.email !== undefined) {
      void Linking.openURL(`mailto:${paciente.email}`);
    }
  };

  const obterSingularPlural = (palavra: string, valor: number): string => {
    if (valor <= 1) {
      switch (palavra) {
        case 'anos': return 'ano';
        case 'meses': return 'mês';
        default: return palavra;
      }
    } else {
      return palavra;
    }
  };

  useEffect(() => {
    const valorIdade = calcularIdade(paciente.dataNascimento);
    setIdade(valorIdade);
    if (valorIdade < 1) {
      setMesesIdade(calcularMesesDeIdade(paciente.dataNascimento));
    }
    setIMC(calcularIMC(paciente.peso, paciente.altura));
  }, [paciente]);

  return (
        <>
            <Card
              style={ultimo ? { ...styles.card, ...styles.card.ultimo } : styles.card}
              title={`${paciente.nome}`}
              iconName={cardIconStyles.name}
              iconType={cardIconStyles.type}
              iconColor={cardIconStyles.color}
              iconBackgroundColor={cardIconStyles.backgrounColor}
              topRightText={`nº ${paciente.id}`}
              bottomRightText={(idade > 0 ? `${idade} ${obterSingularPlural('anos', idade)}` : `${mesesIdade} ${obterSingularPlural('meses', mesesIdade)}`)}
              description={`${paciente.genero}, ${paciente.peso}Kg, ${paciente.altura}M, ${paciente.tipoSanguineo}\n${paciente?.consultas ? paciente.consultas.length : 0} consultas registradas`}
              // @ts-expect-error - a biblioteca não inclui parametros no contrato do onPress.
              onPress={abrirMenuContexto}
            />
            <MenuContexto
                visivel={exibirMenu}
                {...{ fecharMenu, menuAnchor }}
                items={[
                  {
                    titulo: 'Agendar consulta',
                    icone: 'calendar-check',
                    callback: () => {
                      agendarFormularioRef?.current(paciente);
                      fecharMenu();
                      return;
                      void (async () => {
                        const consulta = await Calendario.agendarConsulta(paciente.nome);
                        if (consulta !== null) {
                          Notification.success({
                            title: 'Agendado com sucesso!'
                          });
                          fecharMenu();
                        }
                      })();
                    }
                  },
                  {
                    titulo: 'Fazer ligação',
                    icone: 'phone-forward-outline',
                    callback: () => {
                      fazerLigacao();
                      fecharMenu();
                    }
                  },
                  {
                    titulo: 'Enviar email',
                    icone: 'email-fast-outline',
                    callback: () => {
                      enviarEmail();
                      fecharMenu();
                    }
                  },
                  {
                    titulo: 'Editar paciente',
                    icone: 'account-edit-outline',
                    callback: () => {
                      editarFormularioRef?.current(paciente);
                      fecharMenu();
                    }
                  },
                  {
                    titulo: 'Calcular IMC',
                    icone: 'calculator-variant-outline',
                    callback: () => {
                      exibirResultadoIMC();
                      fecharMenu();
                    }
                  },
                  {
                    titulo: 'Excluir paciente',
                    icone: 'file-remove',
                    callback: () => {
                      excluirFormularioRef?.current(paciente);
                      fecharMenu();
                    }
                  }
                ]}
            />
        </>
  );
};

export default PacienteCard;
