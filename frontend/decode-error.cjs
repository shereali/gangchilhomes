const http = require('http');

http.get('http://localhost:3000/properties', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/iframe\.src\s*=\s*['"]data:text\/html;base64,([^'"]+)['"]/);
    if (match) {
      const decoded = Buffer.from(match[1], 'base64').toString('utf8');
      console.log('--- DECODED ERROR PAGE ---');
      console.log(decoded);
    } else {
      console.log('Could not find base64 iframe src');
    }
  });
});
