interface MenuArchor {
  x: number;
  y: number;
}

interface MenuItem {
  titulo: string;
  icone: string;
  callback: () => void;
}

export interface MenuContextoContrato {
  visivel: boolean;
  fecharMenu: () => void;
  menuAnchor?: MenuArchor;
  items: Array<MenuItem>;
}
