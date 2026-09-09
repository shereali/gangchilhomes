const http = require('http');

http.get('http://localhost:3000/properties', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const match = data.match(/<pre>([\s\S]*?)<\/pre>/i) || data.match(/<div class="description">([\s\S]*?)<\/div>/i);
    if (match) {
      console.log('Error snippet:', match[1]);
    } else {
      console.log('Body snippet:', data.slice(0, 1000));
    }
  });
});
