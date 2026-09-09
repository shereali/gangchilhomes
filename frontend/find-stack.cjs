const http = require('http');

http.get('http://localhost:3000/properties', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    // Search for error details in JSON script or payload
    const matches = data.match(/<script id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i) 
                 || data.match(/\"message\":\"([^\"]+)\"/g)
                 || data.match(/<title>([^<]+)<\/title>/);
    console.log('Matches:', matches ? matches.slice(0, 5) : 'none');
    
    // Look for error stack text
    const idx = data.indexOf('stack');
    if (idx !== -1) {
      console.log('Around stack:', data.substring(idx - 100, idx + 400));
    }
  });
});
