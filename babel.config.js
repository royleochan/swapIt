module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            components: "./src/components",
            hooks: "./src/hooks",
            navigation: "./src/navigation",
            screens: "./src/screens",
            constants: "./src/constants",
            store: "./src/store",
            utils: "./src/utils",
          },
        },
      ],
      ["module:react-native-dotenv"],
    ],
  };
};
