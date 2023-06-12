import express from 'express';
require('dotenv').config();

const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'Thanks God... it is working!' });
});

export default app;
