const path = require("path")

module.exports = {
    mode: process.env.prod ? "production" : "development",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "dist"),
    },
}
