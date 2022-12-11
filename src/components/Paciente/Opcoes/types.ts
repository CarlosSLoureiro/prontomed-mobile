interface LimparContrato {
  visivel: boolean;
  callback: () => void;
}

export interface OcpoesPacienteContrato {
  visivel: boolean;
  buscar: () => void;
  cadastrar: () => void;
  ordenar: () => void;
  limpar: LimparContrato;
}
