// const fs = require('fs-extra');
// const path = require('path');
// const { execSync } = require('child_process');

// console.log('🚀 DEPLOY SCRIPT - DataMusic GitHub Pages');
// console.log('=========================================\n');

// // Configuración
// const CORRECT_BASE_PATH = '/DataMusic/';
// const WRONG_BASE_PATH = '/Fran0004/DataMusic/';
// const REPO_URL = 'https://fran0004.github.io/DataMusic/';

// // Rutas
// const projectRoot = path.resolve(__dirname, '..');
// const buildDir = path.join(projectRoot, 'build');
// const docsDir = path.join(projectRoot, '..', 'docs');
// const indexPath = path.join(buildDir, 'index.html');

// console.log('📁 Rutas:');
// console.log(`- Proyecto: ${projectRoot}`);
// console.log(`- Build: ${buildDir}`);
// console.log(`- Docs: ${docsDir}`);
// console.log(`- Homepage: ${REPO_URL}\n`);

// // PASO 1: Asegurar .env.production
// const envProdPath = path.join(projectRoot, '.env.production');
// if (!fs.existsSync(envProdPath)) {
//   fs.writeFileSync(envProdPath, `PUBLIC_URL=${CORRECT_BASE_PATH}\n`);
//   console.log('✅ .env.production creado');
// }

// // PASO 2: Limpiar build anterior
// if (fs.existsSync(buildDir)) {
//   fs.removeSync(buildDir);
//   console.log('🧹 Build anterior eliminado');
// }

// // PASO 3: Construir proyecto
// console.log('\n🔨 Construyendo proyecto React...');
// try {
//   execSync('npm run build', {
//     cwd: projectRoot,
//     stdio: 'inherit',
//     env: { ...process.env, PUBLIC_URL: CORRECT_BASE_PATH }
//   });
// } catch (error) {
//   console.error('❌ ERROR en npm run build');
//   process.exit(1);
// }

// // PASO 4: Verificar build
// if (!fs.existsSync(buildDir)) {
//   console.error('❌ ERROR: No se creó carpeta build/');
//   process.exit(1);
// }

// const buildFiles = fs.readdirSync(buildDir);
// console.log(`\n📦 ${buildFiles.length} archivos en build/`);

// // PASO 5: CORREGIR index.html
// console.log('\n🔍 Corrigiendo index.html...');
// if (!fs.existsSync(indexPath)) {
//   console.error('❌ ERROR: No hay index.html en build/');
//   process.exit(1);
// }

// let htmlContent = fs.readFileSync(indexPath, 'utf8');

// // Reemplazar todas las rutas incorrectas
// const replacements = [
//   // Rutas absolutas incorrectas
//   [new RegExp(WRONG_BASE_PATH.replace(/\//g, '\\/'), 'g'), CORRECT_BASE_PATH],
//   // Rutas relativas que empiezan con ./
//   [/href="\.\//g, 'href="' + CORRECT_BASE_PATH],
//   [/src="\.\//g, 'src="' + CORRECT_BASE_PATH],
//   // Favicon y manifest
//   [/href="\/favicon/g, 'href="' + CORRECT_BASE_PATH + 'favicon'],
//   [/href="\/manifest/g, 'href="' + CORRECT_BASE_PATH + 'manifest']
// ];

// let cambios = 0;
// replacements.forEach(([pattern, replacement]) => {
//   const matches = htmlContent.match(pattern);
//   if (matches) {
//     cambios += matches.length;
//     htmlContent = htmlContent.replace(pattern, replacement);
//   }
// });

// fs.writeFileSync(indexPath, htmlContent);
// console.log(`✅ ${cambios} rutas corregidas en index.html`);

// // PASO 6: Corregir archivos .js y .css
// console.log('\n🔍 Corrigiendo archivos estáticos...');
// const staticFiles = buildFiles.filter(f => f.endsWith('.js') || f.endsWith('.css'));
// let staticCorrecciones = 0;

// staticFiles.forEach(file => {
//   const filePath = path.join(buildDir, file);
//   let content = fs.readFileSync(filePath, 'utf8');
  
//   if (content.includes(WRONG_BASE_PATH) || content.includes('Fran0004')) {
//     content = content.replace(new RegExp(WRONG_BASE_PATH.replace(/\//g, '\\/'), 'g'), CORRECT_BASE_PATH);
//     content = content.replace(/\/Fran0004\/DataMusic\//g, CORRECT_BASE_PATH);
//     fs.writeFileSync(filePath, content);
//     staticCorrecciones++;
//   }
// });

// if (staticCorrecciones > 0) {
//   console.log(`✅ ${staticCorrecciones} archivos estáticos corregidos`);
// }

// // PASO 7: Preparar carpeta docs
// console.log('\n📁 Preparando carpeta docs/...');
// if (fs.existsSync(docsDir)) {
//   fs.emptyDirSync(docsDir);
//   console.log('✅ docs/ limpiada');
// } else {
//   fs.mkdirSync(docsDir, { recursive: true });
//   console.log('✅ docs/ creada');
// }

// // PASO 8: Copiar archivos
// console.log('\n📤 Copiando archivos a docs/...');
// fs.copySync(buildDir, docsDir);
// console.log(`✅ ${buildFiles.length} archivos copiados`);

// // PASO 9: Archivos esenciales para GitHub Pages
// console.log('\n📝 Creando archivos esenciales...');

// // .nojekyll
// fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
// console.log('✅ .nojekyll creado');

// // 404.html para React Router
// const docsIndexPath = path.join(docsDir, 'index.html');
// const docs404Path = path.join(docsDir, '404.html');
// fs.copySync(docsIndexPath, docs404Path);
// console.log('✅ 404.html creado');

// // Verificar contenido final
// console.log('\n🔎 Verificación final:');
// const finalHtml = fs.readFileSync(docsIndexPath, 'utf8');
// const hasWrongPath = finalHtml.includes('Fran0004/DataMusic');
// const hasCorrectPath = finalHtml.includes(CORRECT_BASE_PATH);

// console.log(`- ¿Tiene rutas incorrectas? ${hasWrongPath ? '❌' : '✅'}`);
// console.log(`- ¿Tiene rutas correctas? ${hasCorrectPath ? '✅' : '❌'}`);

// if (hasWrongPath) {
//   console.log('\n⚠️  ADVERTENCIA: Todavía hay rutas incorrectas');
//   console.log('Ejecuta este comando adicional:');
//   console.log(`cd "${docsDir}" && sed -i 's|/Fran0004/DataMusic/|${CORRECT_BASE_PATH}|g' *.html *.js *.css 2>/dev/null || echo "Usando PowerShell..."`);
// }

// console.log('\n🎉 ¡DESPLIEGUE PREPARADO!');
// console.log('=========================================');
// console.log('\n📋 PASOS FINALES:');
// console.log(`1. cd "${path.join(projectRoot, '..')}"`);
// console.log('2. git add docs/');
// console.log('3. git commit -m "Deploy React app to GitHub Pages"');
// console.log('4. git push');
// console.log('\n⏳ Espera 1-2 minutos y visita:');
// console.log(`🌐 ${REPO_URL}`);
// console.log('\n🔧 Si hay problemas, verifica:');
// console.log('- Settings → Pages → Source: /docs');
// console.log('- No hay workflows ejecutándose en Actions');
// console.log('- Cache limpio en navegador (Ctrl+F5)');