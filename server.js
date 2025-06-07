const http = require('http');
const handler = require('serve-handler');
const path = require('path');

// Configuration
const PORT = 2008;
const BUILD_DIR = path.join(__dirname, 'build');

// MIME types for common file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

// Store all known routes for Next.js app
const knownRoutes = [];

// Function to recursively scan the build directory and find all HTML files and directories
function scanBuildDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      const relativePath = path.relative(BUILD_DIR, fullPath);
      
      if (stats.isDirectory()) {
        // Add directory as a route
        if (relativePath && !relativePath.startsWith('_next') && !relativePath.startsWith('.')) {
          knownRoutes.push('/' + relativePath.replace(/\\/g, '/'));
        }
        // Recursively scan subdirectories
        scanBuildDirectory(fullPath);
      } else if (stats.isFile() && item === 'index.html') {
        // Add the directory containing index.html as a route
        const routePath = path.dirname(relativePath);
        if (routePath !== '.') {
          knownRoutes.push('/' + routePath.replace(/\\/g, '/'));
        } else {
          knownRoutes.push('/');
        }
      } else if (stats.isFile() && item.endsWith('.html') && item !== 'index.html') {
        // Add HTML files (without .html extension) as routes
        const routePath = relativePath.replace(/\.html$/, '');
        knownRoutes.push('/' + routePath.replace(/\\/g, '/'));
      }
    });
  } catch (err) {
    console.error(`Error scanning directory ${dir}:`, err);
  }
}

// Function to serve a file
function serveFile(filePath, res, originalUrl = null) {
  try {
    // Check if the path is a directory
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // If it's a directory, try to serve index.html from that directory
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        return serveFile(indexPath, res, originalUrl);
      } else {
        // If no index.html in the directory, fall back to main index.html
        const mainIndexPath = path.join(BUILD_DIR, 'index.html');
        if (fs.existsSync(mainIndexPath)) {
          const content = fs.readFileSync(mainIndexPath);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
          return;
        } else {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
      }
    }
    
    // It's a file, serve it
    const fileContent = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fileContent);
  } catch (err) {
    console.error(`Error serving file ${filePath}:`, err);
    
    // Handle specific errors
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head>
            <title>File Not Found</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
              h1 { color: #e53e3e; }
              pre { background: #f6f8fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
              .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>File Not Found</h1>
              <p>The requested file could not be found: <code>${filePath}</code></p>
            </div>
          </body>
        </html>
      `);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head>
            <title>Server Error</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
              h1 { color: #e53e3e; }
              pre { background: #f6f8fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
              .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Server Error</h1>
              <p>An error occurred while serving the file: <code>${filePath}</code></p>
              <pre>${err.message}</pre>
            </div>
          </body>
        </html>
      `);
    }
  }
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // First check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    // Build directory doesn't exist
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end(`
      <html>
        <head>
          <title>Build Directory Missing</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #e53e3e; }
            pre { background: #f6f8fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
            .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Build Directory Missing</h1>
            <p>The server could not find the build directory at: <code>${BUILD_DIR}</code></p>
            <p>Please run the build command for your Next.js project:</p>
            <pre>npm run build</pre>
            <p>This will create the necessary static files in the build directory.</p>
            <p>After running the build command, restart this server.</p>
          </div>
        </body>
      </html>
    `);
    return;
  }
  
  // Parse URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Check if pathname has special characters that could cause issues
  if (pathname.includes('..') || pathname.includes('//') || pathname.includes('%')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  console.log(`Request received: ${pathname}`);
  
  // Special handling for specific routes that need to maintain state on refresh
  const specialRoutes = [
    '/projects/rainbow-vista/bizkids',
    '/projects/rainbow-vista/bizkids/stalls',
    '/projects/rainbow-vista/bizkids/stalls/creative-crafts',
    '/projects/rainbow-vista/bizkids/stalls/eco-friendly',
    '/projects/rainbow-vista/bizkids/stalls/tech-toys'
  ];
  
  if (specialRoutes.includes(pathname)) {
    console.log(`Special route handling: ${pathname}`);
    
    // Create a custom HTML file that loads the main app but preserves the route
    const customHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Itihas - ${pathname.split('/').pop()}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          #loading { display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; }
          .spinner { border: 4px solid rgba(0, 0, 0, 0.1); width: 36px; height: 36px; border-radius: 50%; border-left-color: #09f; animation: spin 1s linear infinite; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div id="loading">
          <div class="spinner"></div>
          <p>Loading ${pathname}...</p>
        </div>
        
        <script>
          // Store the current path
          const CURRENT_PATH = "${pathname}";
          
          // Fetch the main app HTML
          fetch('/')
            .then(response => response.text())
            .then(html => {
              // Extract the necessary parts
              const headContent = html.match(/<head[^>]*>([\\s\\S]*?)<\\/head>/i);
              const bodyContent = html.match(/<body[^>]*>([\\s\\S]*?)<\\/body>/i);
              
              if (headContent && bodyContent) {
                // Add the head content
                const headElem = document.createElement('div');
                headElem.innerHTML = headContent[1];
                
                // Add all head elements except title (we keep our custom title)
                const elements = headElem.children;
                for (let i = 0; i < elements.length; i++) {
                  const elem = elements[i];
                  if (elem.tagName !== 'TITLE') {
                    document.head.appendChild(elem.cloneNode(true));
                  }
                }
                
                // Replace body content
                document.body.innerHTML = bodyContent[1];
                
                // Add script to force our route
                const routeScript = document.createElement('script');
                routeScript.textContent = \`
                  // Set up Next.js routing data
                  window.__NEXT_DATA__ = window.__NEXT_DATA__ || {};
                  window.__NEXT_DATA__.props = window.__NEXT_DATA__.props || {};
                  window.__NEXT_DATA__.page = "${pathname}";
                  window.__NEXT_DATA__.asPath = "${pathname}";
                  window.__NEXT_DATA__.query = {};
                  window.__NEXT_DATA__.buildId = "static-export";
                  
                  // Force the URL to be correct
                  if (window.history && window.history.replaceState) {
                    window.history.replaceState({}, '', "${pathname}");
                  }
                  
                  // Check for Next.js router initialization
                  const checkRouter = setInterval(function() {
                    if (window.next && window.next.router) {
                      clearInterval(checkRouter);
                      
                      // Force router to use our path
                      window.next.router.asPath = "${pathname}";
                      window.next.router.pathname = "${pathname}";
                      window.next.router.route = "${pathname}";
                      
                      // Force a route update
                      window.next.router.replace("${pathname}", "${pathname}", { shallow: true });
                    }
                  }, 100);
                  
                  // Continuously check if we're still on the right path
                  setInterval(function() {
                    if (window.location.pathname !== "${pathname}") {
                      console.log("Forcing path back to ${pathname}");
                      window.history.replaceState({}, '', "${pathname}");
                    }
                  }, 500);
                \`;
                document.body.appendChild(routeScript);
              }
            })
            .catch(error => {
              console.error("Error loading app:", error);
              document.getElementById('loading').innerHTML = \`<h1>Error loading app</h1><p>\${error.message}</p>\`;
            });
        </script>
      </body>
      </html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(customHTML);
    return;
  }
  
  // Check if this is a static asset request (JS, CSS, images, etc.)
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|otf|pdf|txt)$/i.test(pathname);
  
  // For static assets, try to serve them directly
  if (isStaticAsset) {
    const assetPath = path.join(BUILD_DIR, pathname);
    if (fs.existsSync(assetPath)) {
      return serveFile(assetPath, res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
  }
  
  // Define possible file paths based on Next.js static export structure
  const possiblePaths = [
    // Direct file match
    path.join(BUILD_DIR, pathname),
    
    // Path with /index.html
    path.join(BUILD_DIR, pathname, 'index.html'),
    
  // Normalize pathname (remove trailing slash unless root)
  let normalizedPathname = pathname;
  if (normalizedPathname.length > 1 && normalizedPathname.endsWith('/')) {
    normalizedPathname = normalizedPathname.slice(0, -1);
  }

  // List all possible static file paths to try
  const tryPaths = [
    path.join(BUILD_DIR, normalizedPathname),
    path.join(BUILD_DIR, normalizedPathname + '.html'),
    path.join(BUILD_DIR, normalizedPathname, 'index.html'),
    path.join(BUILD_DIR, pathname, 'index.html'), // Also try original pathname with trailing slash
    path.join(BUILD_DIR, pathname + '.html'),
  ];

  console.log('--- Static export debug ---');
  console.log('Request:', pathname);
  console.log('Normalized:', normalizedPathname);
  console.log('Try paths:');
  tryPaths.forEach(p => console.log('  ', p));

  for (let i = 0; i < tryPaths.length; i++) {
    const currentPath = tryPaths[i];
    if (fs.existsSync(currentPath)) {
      console.log(`Serving: ${currentPath}`);
      return serveFile(currentPath, res, pathname);
    }
  }

  // Fallback: serve root index.html (SPA fallback)
  const indexPath = path.join(BUILD_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log(`Route not found: ${pathname}, serving index.html as fallback`);
    return serveFile(indexPath, res);
  }

  // If index.html is missing, show an error
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end(`
    <html>
      <head>
        <title>Index File Missing</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
          h1 { color: #e53e3e; }
          pre { background: #f6f8fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
          .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Index File Missing</h1>
          <p>The build directory exists but index.html is missing at: <code>${indexPath}</code></p>
          <p>Please ensure your Next.js build configuration is correct and rebuild:</p>
          <pre>npm run build</pre>
        </div>
      </body>
    </html>
  `);
});

// Scan the build directory to find all routes before starting the server
console.log(`Scanning build directory: ${BUILD_DIR}`);
if (fs.existsSync(BUILD_DIR)) {
  scanBuildDirectory(BUILD_DIR);
  console.log(`Found ${knownRoutes.length} routes:`, knownRoutes);
}

// Start server
function startServer(port) {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Serving static files from: ${BUILD_DIR}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
