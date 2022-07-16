module.exports = function(RED) {
  RED.plugins.registerPlugin("solarized-light", {
    type: "node-red-theme",
    css: [
      "themes/solarized-light/theme.min.css",
      "themes/solarized-light/theme-customizations.min.css"
    ],
    monacoOptions: {
      theme: require("./solarized-light-monaco-theme.json")
    }
  })

  RED.plugins.registerPlugin("solarized-light-scroll", {
    type: "node-red-theme",
    css: [
      "themes/solarized-light/theme.min.css",
      "themes/solarized-light/theme-customizations.min.css",
      "themes/solarized-light/theme-scrollbars.min.css"
    ],
    monacoOptions: {
      theme: require("./solarized-light-monaco-theme.json")
    }
  })
}