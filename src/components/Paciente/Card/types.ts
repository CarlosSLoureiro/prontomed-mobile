import Paciente from '@entity/Paciente';

export interface PacienteCardContrato {
  paciente: Paciente;
  ultimo?: boolean;
}

interface MenuArchor {
  x: number;
  y: number;
}

interface MenuItem {
  titulo: string;
  icone: string;
  callback: () => void;
}

export interface PacienteMenuContrato {
  paciente: Paciente;
  visivel: boolean;
  fecharMenu: () => void;
  menuAnchor?: MenuArchor;
  items: Array<MenuItem>;
}
