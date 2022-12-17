module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@database': './src/database/index',
            '@entity': './src/database/entity',
            '@repository': './src/database/repository',
            '@helpers': './src/helpers',
            '@validators': './src/validators',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@screens': './src/screens'
          }
        }
      ],
      [
        'babel-plugin-transform-typescript-metadata'
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
    ]
  };
};
