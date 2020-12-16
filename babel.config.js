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
            navigation: "./src/navigation",
            screens: "./src/screens",
            constants: "./src/constants",
            store: "./src/store",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
