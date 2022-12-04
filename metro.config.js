// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
    ...getDefaultConfig(__dirname),
    transformer: {
     minifierConfig: {
       keep_classnames: true,
       keep_fnames: true,
       mangle: {
         keep_classnames: true,
         keep_fnames: true,
       },
       output: {
         ascii_only: true,
         quote_style: 3,
         wrap_iife: true,
       },
       sourceMap: {
         includeSources: false,
       },
       toplevel: false,
       compress: {
         reduce_funcs: false,
       },
     },
   }
};
