module.exports = function (RED) {
    RED.plugins.registerPlugin("oled", {
        type: "node-red-theme",
        css: [
            "themes/oled/theme.min.css"
        ],
        monacoOptions: {
            theme: "tomorrow-night-bright"
        }
    })

    RED.plugins.registerPlugin("oled-scroll", {
        type: "node-red-theme",
        css: [
            "themes/oled/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "tomorrow-night-bright"
        }
    })
}