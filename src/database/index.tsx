import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { DataSource } from 'typeorm';

import entities from './entities';
import migrations from './migrations';
import repositories from './repositories';

export * from './types';

export const DatabaseProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [conexao, setConexao] = useState<DataSource | null>(null);

  const conectar = useCallback(() => {
    const database = new DataSource({
      type: 'expo',
      database: 'prontomed15.db',
      driver: require('expo-sqlite'),
      entities,
      migrations,
      migrationsRun: true,
      synchronize: false
    });

    database.initialize()
      .then(() => setConexao(database))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    if (!conexao) {
      conectar();
    }
  }, [conectar, conexao]);

  if (!conexao) {
    return <ActivityIndicator />;
  }

  global.repositories = repositories(conexao);

  return (
    <>
      {children}
    </>
  );
};
