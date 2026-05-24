const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CHARACTERS_PATH = path.join(__dirname, '..', 'blue-archive', 'characters.json');

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/characters', (req, res) => {
  const data = fs.readFileSync(CHARACTERS_PATH, 'utf-8');
  res.json(JSON.parse(data));
});

app.put('/api/characters', (req, res) => {
  fs.writeFileSync(CHARACTERS_PATH, JSON.stringify(req.body, null, 2) + '\n', 'utf-8');
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Editor running at http://localhost:${PORT}`);
});
