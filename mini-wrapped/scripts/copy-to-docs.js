const fs = require('fs-extra');
const path = require('path');

console.log('🚀 Iniciando despliegue a GitHub Pages...');

// Rutas absolutas
const projectRoot = path.join(__dirname, '..'); // mini-wrapped/
const buildDir = path.join(projectRoot, 'build');
const docsDir = path.join(projectRoot, '..', 'docs'); // DATAMUSIC/docs
const rootDir = path.join(projectRoot, '..'); // DATAMUSIC/

console.log('📁 Rutas:');
console.log('- Build:', buildDir);
console.log('- Docs:', docsDir);
console.log('- Raíz:', rootDir);

// Verificar que existe build
if (!fs.existsSync(buildDir)) {
  console.error('❌ ERROR: No existe la carpeta build/');
  console.log('💡 Solución: Ejecuta primero: npm run build');
  process.exit(1);
}

// Crear docs si no existe
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
  console.log('✅ Carpeta docs/ creada');
}

// Limpiar docs (eliminar todo excepto .git)
const filesInDocs = fs.readdirSync(docsDir);
filesInDocs.forEach(file => {
  const filePath = path.join(docsDir, file);
  if (file !== '.git') {
    fs.removeSync(filePath);
    console.log(`🗑️  Eliminado: ${file}`);
  }
});

// Copiar build a docs
console.log('📤 Copiando build/ a docs/...');
fs.copySync(buildDir, docsDir);

// Crear .nojekyll para desactivar Jekyll
const nojekyllPath = path.join(docsDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Archivo .nojekyll creado');

// Si usas React Router: copiar index.html como 404.html
const indexPath = path.join(docsDir, 'index.html');
const notFoundPath = path.join(docsDir, '404.html');
if (fs.existsSync(indexPath)) {
  fs.copySync(indexPath, notFoundPath);
  console.log('✅ 404.html creado para React Router');
}

console.log('\n🎉 ¡DESPLIEGUE COMPLETADO!');
console.log('\n📋 Siguientes pasos:');
console.log('1. cd .. (ir a DATAMUSIC/)');
console.log('2. git add docs');
console.log('3. git commit -m "Deploy React app to GitHub Pages"');
console.log('4. git push');
console.log('\n🌐 Tu app estará en: https://franvillalba.github.io/DataMusic/');