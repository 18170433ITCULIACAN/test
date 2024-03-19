const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
  
const app = express();  
const port = 3000;
  
/* MySQL Conexion */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Daniel1516.',
  database: 'node_express_mysql'
});
  
/* Conexion a MySQL */
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conexion a MySQL');
});
  
/* Middleware */
app.use(bodyParser.json());
app.use(cors());
  
/* Routes */
/* lista de todos los post */
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      res.status(500).send('Error al recuperar posts');
      return;
    }
    res.json(results);
  });
});
   
/* crear nuevo post */
app.post('/posts/create', (req, res) => {
  const { title, body } = req.body;
  db.query('INSERT INTO posts (title, body) VALUES (?, ?)', [title, body], (err, result) => {
    if (err) {
      res.status(500).send('Error al crear post');
      return;
    }
    const postId = result.insertId;
    db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener el post creado');
        return;
      }
      res.status(201).json(result[0]);
    });
  });
});
  
/* obtener post especifico */
app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener post');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Post no se encontro');
      return;
    }
    res.json(result[0]);
  });
});
  
/* actualizar post */
app.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;
  db.query('UPDATE posts SET title = ?, body = ? WHERE id = ?', [title, body, postId], err => {
    if (err) {
      res.status(500).send('Error actualizar post');
      return;
    }
    db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {
      if (err) {
        res.status(500).send('Error al actualizar post');
        return;
      }
      res.json(result[0]);
    });
  });
});
  
/* eliminar post */
app.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;
  db.query('DELETE FROM posts WHERE id = ?', postId, err => {
    if (err) {
      res.status(500).send('Error Eliminado post');
      return;
    }
    res.status(200).json({ msg: 'Post Eliminado Correctamente' });
  });
});
  
/* Start server */
app.listen(port, () => {
  console.log(`Corriendo servidor en port ${port}`);
});