# 👨‍⚕️ ProntoMed Mobile

> Aplicação desenvolvida para fins de aprendizado e experiência.

ProntoMed é um aplicativo de prontuário eletrônico feito com [React Native 0.70.6](https://reactnative.dev) onde o médico pode cadastrar as informações do paciente e fazer os registros das consultas realizadas por paciente.

# ✅ Guia de Controle

- [x] Feito com TypeScript
- [x] Utilizando Expo
- [x] Banco de Dados SQLite local com TypeORM
- [x] Testes com Jest
- [x] Validação de sintaxe com ESLint + Husky
- [x] Testes + Validação de sintaxe com Github Actions
- [x] Integração com calendário do sistema
- [x] Compatível com sistemas Android e iOS
- [x] Compatível com modo Modo Escuro

# 💻 Pré-requisitos

Antes de começar, para executar a aplicação você precisará ter o [NodeJS](https://nodejs.org/pt-br) (npm) e o [Yarn](https://classic.yarnpkg.com/lang/en/docs/install) instalados em sua máquina. Além disso, para testar a aplicação você também precisará ter o [XCode](https://developer.apple.com/xcode) ou [Android Studio](https://developer.android.com/studio) instalados e com algum device/simulador iOS ou Android configurados. No entanto, também é possível testar a aplicação em algum device físico de forma simples e fácil utilizando o aplicativo [Expo Go](https://expo.dev/client) da AppStore ou PlayStore. Contudo, o aplicativo pode possuir alguma biblioteca desatualizada e não funcionar de maneira 100% fiel ao simulador (por exemplo: a animação de transição do menu não funciona corretamente no iOS pelo Expo Go).
> Versões utilizadas para desenvolver a aplicação: NodeJS 19.3, XCode 14 e Android Studio 2021.3.1.

# 🚀 Instalando

Para instalar, executar e testar o **ProntoMed Mobile**, siga estas etapas:

1. Faça um clone ou o download do código fonte desse repositório.
2. Abra o cmd ou terminal integrado da sua IDE no diretório do repositório.
3. Instale as dependências do projeto com:
```
    yarn
```
4. Caso você queira testar a partir de um simulador configurado com XCode ou Android Studio, execute:
```
    yarn start
```
5. Caso você queira testar a partir de um device físico com o aplicativo Expo Go, execute:
```
    yarn start:expo-go
```
6. Opcional: Você pode verificar a sintaxe do código da aplicação com:
```
    yarn lint
```
7. Opcional: Você pode executar os testes unitários da aplicação com:
```
    yarn test
```
8. Caso você não queira gerar os dados fakes no aplicativo, remova as classes que adicionam esses dados no [arquivo de migrations](https://github.com/CarlosSLoureiro/prontomed-mobile/blob/main/src/database/migrations.ts).
9. Explore o sistema. 😊

# 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.

[⬆ Voltar ao topo](#)
