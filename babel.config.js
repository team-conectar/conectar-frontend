module.exports = {
    presets: ["react/babel"],
    plugins: [
        ["styled-components", { "ssr": true }],
        "inline-react-svg"
    ]
};