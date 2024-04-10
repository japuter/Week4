import express from 'express';
const app = express();
import api from './api/index.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});
console.log('moro');

export default app;