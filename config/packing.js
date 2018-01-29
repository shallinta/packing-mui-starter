/**
 * 这个文件可以修改packing配置文件的默认设置
 * 默认配置请看 `node_modules/packing/config/packing.js`
 *
 * @param object packing 默认配置对象
 */

import path from 'path';
import packingGlob from 'packing-glob';

export default (packing) => {
  const p = packing;
  // 模版引擎类型，目前支持的类型有[html,pug,ejs,handlebars,smarty,velocity,artTemplate]
  p.templateEngine = 'pug';
  // 模版文件扩展名
  p.templateExtension = '.pug';

  // 输出目录
  p.path.templatesDist = 'templates';

  // hmr
  p.hot = true;

  // 开启css-modules
  p.cssModules = true;
  p.cssModulesIdentName = '[name]-[local]-[hash:base64:5]';

  p.commonChunks = {
    vendor: [
      'react',
      'react-dom',
      'prop-types'
      // 'classnames',
      // 'mobx',
      // 'mobx-react',
      // 'lodash',
      // 'moment'
    ]
  };

  p.path.entries = () => {
    const entryFileName = 'entry.js';
    const entryPath = 'src/pages';
    const entryPattern = `**/${entryFileName}`;
    const cwd = path.resolve(entryPath);
    const config = {};
    packingGlob(entryPattern, { cwd }).forEach((page) => {
      const key = page.replace(entryFileName, 'index');
      // config[key] = ['babel-polyfill', path.join(cwd, page)];
      config[key] = path.join(cwd, page);
    });
    return config;
  };

  // 网站自定义配置
  p.rewriteRules = {
    // 网站URL与模版的对应路由关系
    '^/$': '/test.pug',
    // API转发
    '^/api/(.*)': 'require!/mock/api/$1.js'
  };

  return p;
};
