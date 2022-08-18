const path = require("path");
module.exports = {
  configureWebpack: (config) => {
    (config.devtool =
      process.env.NODE_ENV === "development" ? "source-map" : undefined),
      (config.resolve = {
        extensions: [".js", ".json", ".vue"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      });
  },
};
