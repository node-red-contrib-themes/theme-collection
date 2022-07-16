module.exports = function(RED) {
  RED.plugins.registerPlugin("midnight-red", {
    type: "node-red-theme",
    css: [
      "themes/midnight-red/theme.min.css",
      "themes/midnight-red/theme-customizations.min.css"
    ],
    monacoOptions: {
      theme: require("./tomorrow-night-bright-monaco-theme.json")
    }
  })

  RED.plugins.registerPlugin("midnight-red-scroll", {
    type: "node-red-theme",
    css: [
      "themes/midnight-red/theme.min.css",
      "themes/midnight-red/theme-customizations.min.css",
      "themes/midnight-red/theme-scrollbars.min.css"
    ],
    monacoOptions: {
      theme: require("./tomorrow-night-bright-monaco-theme.json")
    }
  })
}