module.exports = function(api) {
  api.cache(true);
 
  return {
    presets:['react-native-reanimated/plugin','@babel/preset-env','@babel/preset-react'],
    plugins: [
      "@babel/plugin-transform-export-namespace-from",
      'react-native-reanimated/plugin',
  ],
   };
};
