export const tamanhoMinimoNome = 3;

export const valorIndefinido = (valor: any): boolean => {
  return (valor === undefined);
};

export const nomeInvalido = (nome: string | undefined): boolean => {
  return (nome === undefined) || (
    nome !== undefined &&
      nome.length < tamanhoMinimoNome
  );
};

export const emailInvalido = (email: string | undefined): boolean => {
  return (email !== undefined && !(/\S+@\S+\.\S+/).test(email));
};

export const telefoneInvalido = (telefone: string | undefined): boolean => {
  if (telefone !== undefined) {
    const apenasNumeros = telefone.replace(/\D/g, '');
    return (apenasNumeros.length < 10 || apenasNumeros.length > 11);
  } else {
    return false;
  }
};

export const alturaInvalida = (altura: number | undefined): boolean => {
  return (altura === undefined) || (
    altura !== undefined &&
        altura >= 3
  );
};
