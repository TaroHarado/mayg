const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url.split('?')[0];
  
  if (filePath === './' || filePath === '.') {
    filePath = './index.html';
  }

  filePath = path.normalize(filePath);

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Server Error</h1><p>${error.code}</p>`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType + (contentType.includes('text') || contentType.includes('javascript') ? '; charset=utf-8' : ''),
        'Cache-Control': 'no-cache'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Откройте в браузере: http://localhost:${port}/`);
  console.log('Для остановки нажмите Ctrl+C');
});

