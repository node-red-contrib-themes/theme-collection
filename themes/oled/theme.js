module.exports = function(RED) {
  RED.plugins.registerPlugin("oled", {
    type: "node-red-theme",
    css: [
      "themes/oled/theme.min.css",
      "themes/oled/theme-customizations.min.css"
    ],
    monacoOptions: {
      theme: require("./tomorrow-night-bright-monaco-theme.json")
    }
  })

  RED.plugins.registerPlugin("oled-scroll", {
    type: "node-red-theme",
    css: [
      "themes/oled/theme.min.css",
      "themes/oled/theme-customizations.min.css",
      "themes/oled/theme-scrollbars.min.css"
    ],
    monacoOptions: {
      theme: require("./tomorrow-night-bright-monaco-theme.json")
    }
  })
}