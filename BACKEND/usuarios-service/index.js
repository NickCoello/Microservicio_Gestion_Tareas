const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = './usuarios.json';

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE);
    const usuarios = JSON.parse(data);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los usuarios.' });
  }
});

// Ingresar un nuevo usuario
app.post('/usuarios', (req, res) => {
  try {
    const nuevoUsuario = req.body;
    const data = fs.readFileSync(DATA_FILE);
    const usuarios = JSON.parse(data);
    usuarios.push(nuevoUsuario);
    fs.writeFileSync(DATA_FILE, JSON.stringify(usuarios, null, 2));
    res.status(201).json({ message: 'Usuario creado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el usuario.' });
  }
});
// Ruta PUT para actualizar el usuario
app.put('/usuarios/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    const data = fs.readFileSync(DATA_FILE);
    let usuarios = JSON.parse(data);

    const indice = usuarios.findIndex(t => t.id === id);

    if (indice === -1) {
      return res.status(404).json({ mensaje: 'Usuario no encontrada' });
    }

    usuarios[indice] = { ...usuarios[indice], ...datosActualizados };

    fs.writeFileSync(DATA_FILE, JSON.stringify(usuarios, null, 2));

    res.json({ mensaje: 'Usuario actualizado', usuario: usuarios[indice] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
});


// Eliminar un Usario por ID
app.delete('/usuarios/:id', (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync(DATA_FILE);
    let usuarios = JSON.parse(data);
    const usuariosFiltrados = usuarios.filter(t => t.id != id);
    if (usuarios.length === usuariosFiltrados.length) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(usuariosFiltrados, null, 2));
    res.json({ message: 'Usuario eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:3001`);
});
