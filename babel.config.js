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
            '@components': './src/components',
            '@entities': './src/entities',
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
