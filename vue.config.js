module.exports = {
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.s(c|a)ss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    // Requires sass-loader@^8.0.0
                    options: {
                        implementation: require('sass'),
                        sassOptions: {
                            fiber: require('fibers')
                            //indentedSyntax: true // optional
                        },
                    },
                },
            ],
        });
        const indexRuleSass = config.module.rules.findIndex(x => x.test.source.includes("sass"));
        const indexRuleScss = config.module.rules.findIndex(x => x.test.source.includes("scss"));

        config.module.rules.splice(indexRuleSass,1);
        config.module.rules.splice(indexRuleScss,1);
    }
}
