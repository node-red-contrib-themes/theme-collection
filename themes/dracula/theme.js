module.exports = function(RED) {
  RED.plugins.registerPlugin("dracula", {
    type: "node-red-theme",
    css: [
      "themes/dracula/theme.min.css",
      "themes/dracula/theme-customizations.min.css"
    ],
    monacoOptions: {
      theme: require("./dracula-monaco-theme.json")
    }
  })

  RED.plugins.registerPlugin("dracula-scroll", {
    type: "node-red-theme",
    css: [
      "themes/dracula/theme.min.css",
      "themes/dracula/theme-customizations.min.css",
      "themes/dracula/theme-scrollbars.min.css"
    ],
    monacoOptions: {
      theme: require("./dracula-monaco-theme.json")
    }
    })
}