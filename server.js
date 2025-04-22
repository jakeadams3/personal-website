const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static('./'));

// Serve index.html as the root page
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: './' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});