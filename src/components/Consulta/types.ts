export interface ConsultaContrato {
    nome: string;
    ultimo?: boolean;
};

interface MenuArchor {
    x: number;
    y: number;
}

interface MenuItem {
    titulo: string;
    icone: string;
    callback: () => any
}

export interface ConsultaMenuContrato {
    nome: string;
    visivel:boolean;
    fecharMenu: () => void;
    menuAnchor?:MenuArchor;
    items: Array<MenuItem>
}