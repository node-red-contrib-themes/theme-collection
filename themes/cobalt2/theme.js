module.exports = function (RED) {
    RED.plugins.registerPlugin("cobalt2", {
        type: "node-red-theme",
        css: [
            "themes/cobalt2/theme.min.css"
        ],
        monacoOptions: {
            theme: "cobalt2"
        }
    })

    RED.plugins.registerPlugin("cobalt2-scroll", {
        type: "node-red-theme",
        css: [
            "themes/cobalt2/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "cobalt2"
        }
    })
}