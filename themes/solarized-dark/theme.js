module.exports = function(RED) {
  RED.plugins.registerPlugin("solarized-dark", {
    type: "node-red-theme",
    css: [
      "themes/solarized-dark/theme.min.css",
      "themes/solarized-dark/theme-customizations.min.css"
    ],
    monacoOptions: {
      theme: require("./solarized-dark-monaco-theme.json")
    }
  })

  RED.plugins.registerPlugin("solarized-dark-scroll", {
    type: "node-red-theme",
    css: [
      "themes/solarized-dark/theme.min.css",
      "themes/solarized-dark/theme-customizations.min.css",
      "themes/solarized-dark/theme-scrollbars.min.css"
    ],
    monacoOptions: {
      theme: require("./solarized-dark-monaco-theme.json")
    }
  })
}