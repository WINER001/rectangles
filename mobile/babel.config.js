module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@theme": "./src/theme",
            "@services": "./src/services",
            "@types": "./src/types"
          }
        }
      ],
      "react-native-reanimated/plugin"
    ]
  };
};
