const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@link-color': '#4b5548',
                            '@primary-color': '#4b5548',
                            '@border-radius-base': '0px'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};