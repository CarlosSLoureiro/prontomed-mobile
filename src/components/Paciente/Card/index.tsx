import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import Calendario from '@hooks/useCalendario';
import Notification from '@hooks/useNotification';

import MenuContexto from './menu';
import getStyles from './styles';

import { PacienteCardContrato } from './types';

const PacienteCard = ({
  paciente,
  ultimo = false
}: PacienteCardContrato): JSX.Element => {
  const [exibirMenu, setExibirMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [idade, setIdade] = useState(0);
  const [imc, setIMC] = useState(0);

  const styles = getStyles();

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

  const calcularIMC = (peso: number, altura: number): number => {
    return Number((peso / (altura * altura)).toFixed(1));
  };

  const calcularPesoIdeal = (altura: number): string => {
    const pesoMinimo = ((altura * altura) * 18.5).toFixed(1);
    const pesoMaximo = ((altura * altura) * 35).toFixed(1);

    return `${pesoMinimo}~${pesoMaximo}Kg`;
  };

  /*
    Fonte para exibição do resultado: https://viverbem.unimedbh.com.br/prevencao-e-controle/o-que-e-imc-como-calcular/
  */
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
      const pesoIdeal = calcularPesoIdeal(paciente.altura);

      Notification.close();

      if (imc < ranges.baixo) {
        Notification.warn({
          title: titulo,
          description: `Seu paciente, encontra-se abaixo do peso ideal (${pesoIdeal}).`,
          duration: 30000
        });
      } else if (imc >= ranges.baixo && imc < ranges.normal) {
        Notification.success({
          title: titulo,
          description: `Seu paciente, encontra-se com o peso ideal (${pesoIdeal}).`,
          duration: 30000
        });
      } else if (imc >= ranges.normal && imc < ranges.alto) {
        Notification.warn({
          title: titulo,
          description: `Seu paciente, encontra-se acima do peso ideal (${pesoIdeal}).`,
          duration: 30000
        });
      } else if (imc >= ranges.alto) {
        Notification.error({
          title: titulo,
          description: `Seu paciente, encontra-se muito acima do peso ideal (${pesoIdeal}).`,
          duration: 30000
        });
      }
    } else {
      Notification.info({
        title: `O paciente deve ter ao menos ${idadeParaCalcular} anos de idade!`
      });
    }
  };

  useEffect(() => {
    setIdade(calcularIdade(paciente.dataNascimento));
    setIMC(calcularIMC(paciente.peso, paciente.altura));
  }, [paciente]);

  return (
        <>
            <TouchableOpacity onPress={abrirMenuContexto}>
                <Card style={ultimo ? { ...styles.card, ...styles.card.ultimo } : styles.card}>
                    <Card.Title
                        leftStyle={styles.cardId}
                        titleNumberOfLines={0}
                        title={
                            <>
                                <Paragraph style={styles.nome}>#{paciente.id}: {paciente.nome}</Paragraph>
                            </>
                        }
                        subtitleStyle={styles.subtitle}
                        subtitle={`${paciente.genero}, ${idade} anos, ${paciente.peso}Kg, ${paciente.altura}M, ${paciente.tipoSanguineo}`}
                    />
                </Card>
            </TouchableOpacity>
            <MenuContexto
                visivel={exibirMenu}
                {...{ paciente, fecharMenu, menuAnchor }}
                items={[
                  {
                    titulo: 'Agendar consulta',
                    icone: 'calendar-check',
                    callback: () => {
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
                    titulo: 'Editar paciente',
                    icone: 'account-edit-outline',
                    callback: () => {
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
                      console.log(`Excluir: ${paciente.nome}`);
                      fecharMenu();
                    }
                  }
                ]}
            />
        </>
  );
};

export default PacienteCard;
