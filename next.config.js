const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')

const root = path.join(__dirname, 'src')

module.exports = withTypescript(withSass({
  webpack (config, options) {
    config.resolve.alias['@Components'] = path.join(root, 'components')
    config.resolve.alias['@Modules'] = path.join(root, 'modules')
    config.resolve.alias['@Styles'] = path.join(root, 'styles')
    config.resolve.alias['@Layouts'] = path.join(root, 'layouts')
    config.resolve.alias['@Types'] = path.join(root, 'types')
    config.resolve.alias['@Hooks'] = path.join(root, 'hooks')

    config.output.devtoolModuleFilenameTemplate = (info) => {
        let shortenedAbsPath;

        if (info.absoluteResourcePath.includes('node_modules')) {
            shortenedAbsPath = info.absoluteResourcePath
                .split(`node_modules${path.sep}`)
                .pop();
            return `webpack:///Node Modules/${shortenedAbsPath}`;
        }

        shortenedAbsPath = info.absoluteResourcePath
            .split(`src${path.sep}`)
            .pop();

        return `webpack:///${shortenedAbsPath}`;
    };

    return config
  }
}))