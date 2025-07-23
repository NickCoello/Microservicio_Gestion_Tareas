const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/tareas', require('./routes/tareas.routes'));


const DATA_FILE = './tareas.json';

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE);
    const tareas = JSON.parse(data);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer las tareas.' });
  }
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;

    if (!titulo || !descripcion || !usuarioId) {
      return res.status(400).json({ error: 'Faltan campos requeridos.' });
    }

    const data = fs.readFileSync(DATA_FILE);
    const tareas = JSON.parse(data);

    const nuevaTarea = {
      id: Date.now(), // o generaId()
      titulo,
      descripcion,
      completado: false,
      usuarioId: Number(usuarioId) // 👈 aseguramos que sea número
    };

    tareas.push(nuevaTarea);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tareas, null, 2));

    res.status(201).json({ message: 'Tarea creada con éxito.', tarea: nuevaTarea });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la tarea.' });
  }
});

// Ruta PUT para actualizar una tarea
app.put('/tareas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    const data = fs.readFileSync(DATA_FILE);
    let tareas = JSON.parse(data);

    const indice = tareas.findIndex(t => t.id === id);

    if (indice === -1) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    tareas[indice] = { ...tareas[indice], ...datosActualizados };

    fs.writeFileSync(DATA_FILE, JSON.stringify(tareas, null, 2));

    res.json({ mensaje: 'Tarea actualizada', tarea: tareas[indice] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea.' });
  }
});


// Eliminar una tarea por ID
app.delete('/tareas/:id', (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync(DATA_FILE);
    let tareas = JSON.parse(data);
    const tareasFiltradas = tareas.filter(t => t.id != id);
    if (tareas.length === tareasFiltradas.length) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(tareasFiltradas, null, 2));
    res.json({ message: 'Tarea eliminada.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});
