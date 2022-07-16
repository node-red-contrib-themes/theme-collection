module.exports = function(RED) {
  RED.plugins.registerPlugin("dark", {
    type: "node-red-theme",
    css: [
      "themes/dark/theme.min.css",
      "themes/dark/theme-customizations.min.css"
    ],
    monacoOptions: {
      theme: require("./tomorrow-night-bright-monaco-theme.json")
    }
  })

  RED.plugins.registerPlugin("dark-scroll", {
    type: "node-red-theme",
    css: [
      "themes/dark/theme.min.css",
      "themes/dark/theme-customizations.min.css",
      "themes/dark/theme-scrollbars.min.css"
    ],
    monacoOptions: {
      theme: require("./tomorrow-night-bright-monaco-theme.json")
    }
  })
}