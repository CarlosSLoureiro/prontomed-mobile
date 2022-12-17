import Paciente from '@entity/Paciente';

import * as utils from './utils';

export default (paciente: Partial<Paciente>): void => {
  if (utils.nomeInvalido(paciente.nome)) {
    throw new Error(`O nome do paciente deve ter ao menos ${utils.tamanhoMinimoNome} caracteres`);
  }

  if (utils.emailInvalido(paciente.email)) {
    throw new Error('O email do paciente é inválido');
  }

  if (utils.telefoneInvalido(paciente.telefone)) {
    throw new Error('O telefone do paciente é inválido');
  }

  if (utils.valorIndefinido(paciente.dataNascimento)) {
    throw new Error('A data de nascimento do paciente é inválida');
  }

  if (utils.valorIndefinido(paciente.genero)) {
    throw new Error('O gênero do paciente é inválido');
  }

  if (utils.valorIndefinido(paciente.peso)) {
    throw new Error('O peso do paciente é inválido');
  }

  if (utils.alturaInvalida(paciente.altura)) {
    throw new Error('A altura do paciente é inválida');
  }

  if (utils.valorIndefinido(paciente.tipoSanguineo)) {
    throw new Error('O tipo sanguíneo do paciente é inválido');
  }
};
