var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var packingGlob = require('packing-glob');

var args = process.argv;
var pageName = args[2];
var title = args[3];
var pagePath;
var demoPagePath = path.resolve('page-demo');

process.stdin.setEncoding('utf8');

if (!pageName) {
  console.log('请输入页面名：');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      if (!pageName) {
        pageName = chunk.trim();
        if (!title) {
          console.log('请输入页面标题：');
        } else {
          createFiles();
          process.exit();
        }
      } else if (!title) {
        title = chunk.trim();
        createFiles();
        process.exit();
      }
    }
  });
} else if (!title) {
  console.log('请输入页面标题：');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      if (!title) {
        title = chunk.trim();
        createFiles();
        process.exit();
      }
    }
  });
} else {
  createFiles();
}

function createFiles() {
  pagePath = path.resolve(process.cwd(), 'src/pages/' + pageName);

  try {
    fs.accessSync(pagePath);
  } catch (err) {
    console.log('创建页面目录：', 'src/pages/' + pageName);
    mkdirp.sync(pagePath)
  }

  packingGlob('**.{js,css}', { cwd: demoPagePath }).forEach((page) => {
    var ext = path.extname(page).toLowerCase();
    var curPath = path.resolve(demoPagePath, page);
    var pathLayersMatch = pageName.match(/\//g);
    var pathLayers = '';
    if (pathLayersMatch) {
      for (var i = 0, len = pathLayersMatch.length; i < len; i += 1) {
        pathLayers += '../';
      }
    }

    try {
      var content = fs.readFileSync(curPath, { encoding: 'utf8' });
      content = content.replace(/{{title}}/g, title);
      content = content.replace(/{{pageName}}/g, pageName);
      content = content.replace(/{{date}}/g, new Date().toLocaleDateString());
      content = content.replace(/{{pathLayers}}/g, `../../${pathLayers}`);
      var pageDestFilePath = 'src/pages/' + pageName + '/' + page;
      var pageDestFile = path.resolve(pageDestFilePath);
      fs.writeFileSync(pageDestFile, content, { encoding: 'utf8' });
      console.log('创建页面初始文件：', pageDestFilePath);
    } catch (err) {
      console.log('页面文件读取失败。\n', err);
    }
  });

  var packingConfigPath = path.resolve('config/packing.js');
  try {
    var packingConfigContent = fs.readFileSync(packingConfigPath, { encoding: 'utf8' });
    var routeFloatingFlag = '    // {{insert route floating flag}}';
    var routeReplaceString = `    '^/${pageName}.html$': '/${pageName}',\n`;
    if (packingConfigContent.indexOf(routeReplaceString) < 0) {
      var packingConfigContentArr = packingConfigContent.split(routeFloatingFlag);
      if (packingConfigContentArr.length === 2) {
        packingConfigContentArr.length = 4;
        packingConfigContentArr[3] = packingConfigContentArr[1];
        packingConfigContentArr[2] = routeFloatingFlag;
        packingConfigContentArr[1] = routeReplaceString;
      }
      packingConfigContent = packingConfigContentArr.join('');
      fs.writeFileSync(packingConfigPath, packingConfigContent, { encoding: 'utf8' });
      console.log(`创建页面本地路由：/${pageName}.html`);
    }
  } catch (err) {
    console.log('读取packing配置文件失败，无法自动配置路由，请手动配置。\n', err);
  }

  console.log('========================= SUCCESS =========================\n');
  console.log('新页面初始化完成！Working Path: ', 'src/pages/' + pageName);
  console.log('===========================================================\n');
}
