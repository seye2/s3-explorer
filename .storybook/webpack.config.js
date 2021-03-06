const path = require('path');
const webpack = require('webpack');

module.exports = ({ config, mode }, env, defaultConfig) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                  }
                }
              }
            ]
          ]
        }
      },
      require.resolve('react-docgen-typescript-loader')
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    ...config.resolve.alias,
    "@renderer": path.join(__dirname, "..", "src/renderer")
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.ENV":JSON.stringify('storybook')
    })
  );

  return config;
};
