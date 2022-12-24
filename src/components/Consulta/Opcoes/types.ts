import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface BotaoContrato {
  visivel: boolean;
  icon: string;
  nome: string;
  callback: () => void;
}

export type MenuBotao = Array<{
  icon: IconSource;
  label?: string;
  onPress: () => void;
}>;

export interface OcpoesBotaoContrato {
  visivel: boolean;
  botoes: Array<BotaoContrato>;
}
