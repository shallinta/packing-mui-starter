var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var packingGlob = require('packing-glob');

var args = process.argv;
var pageName = args[2];
var title = args[3];
var pagePath, templatePath;
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
  templatePath = path.resolve(process.cwd(), 'src/templates/pages/' + pageName);

  try {
    fs.accessSync(pagePath);
  } catch (err) {
    console.log('创建页面目录：', pagePath);
    mkdirp.sync(pagePath)
  }

  if (pageName.indexOf('/') > 0) {
    var arr = templatePath.split('/');
    arr.length = arr.length - 1;
    templatePath = arr.join('/');
  }
  try {
    fs.accessSync(templatePath);
  } catch (err) {
    console.log('创建模板目录：', pagePath);
    mkdirp.sync(templatePath);
  }

  packingGlob('**.{js,css,pug}', { cwd: demoPagePath }).forEach((page) => {
    var ext = path.extname(page).toLowerCase();
    var curPath = path.resolve(demoPagePath, page);
    var pathLayersMatch = pageName.match(/\//g);
    var pathLayers = '';
    if (pathLayersMatch) {
      for (var i = 0, len = pathLayersMatch.length; i < len; i += 1) {
        pathLayers += '../';
      }
    }

    if (ext === '.pug') {
      try {
        var content = fs.readFileSync(curPath, { encoding: 'utf8' });
      } catch (err) {
        console.log('模板文件读取失败。\n', err);
      }
      content = content.replace(/{{page}}/g, pageName);
      content = content.replace(/{{title}}/g, title);
      content = content.replace(/{{pathLayers}}/g, `../${pathLayers}`);
      var templateDestFile = path.resolve('src/templates/pages/' + pageName + (pageName.indexOf('/') > 0 ? ext : ('/' + page)));
      console.log('创建模板文件：', templateDestFile);
      fs.writeFileSync(templateDestFile, content, { encoding: 'utf8' });
    } else {
      try {
        var content = fs.readFileSync(curPath, { encoding: 'utf8' });
      } catch (err) {
        console.log('页面文件读取失败。\n', err);
      }
      content = content.replace(/{{demo}}/g, pageName);
      content = content.replace(/{{date}}/g, new Date().toLocaleDateString());
      content = content.replace(/{{pathLayers}}/g, `../../${pathLayers}`);
      var pageDestFile = path.resolve(pagePath, page);
      console.log('创建页面初始文件：', pageDestFile);
      fs.writeFileSync(pageDestFile, content, { encoding: 'utf8' });
    }
  });
  console.log('========================= SUCCESS =========================\n');
  console.log('新页面初始化完成！Working Path: ', 'src/pages/' + pageName);
  console.log('===========================================================\n');
}
