const express = require('express');
const router = express.Router();

// Simulación de base de datos temporal en memoria
let tareas = [
  { id: 1, titulo: 'Completar las tareas pendientes de guías', descripcion: 'Guías, realizar informes', usuarioId: '2', completado: false },
  { id: 2, titulo: 'Tarea de Reescribir', descripcion: 'Descripción de tarea 2', usuarioId: '3', completado: true }
];

// Obtener todas las tareas
router.get('/', (req, res) => {
  res.json(tareas);
});

// Obtener una tarea por ID
router.get('/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  res.json(tarea);
});

// Crear una nueva tarea
router.post('/', (req, res) => {
  const { titulo, descripcion, completado, usuarioId } = req.body; 

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    descripcion,
    completado: completado || false,
    usuarioId: usuarioId ?? null 
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});


// Actualizar una tarea existente
router.put('/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

  const { titulo, descripcion, completado, usuario } = req.body;
  tarea.titulo = titulo ?? tarea.titulo;
  tarea.descripcion = descripcion ?? tarea.descripcion;
  
  tarea.completado = completado ?? tarea.completado;

  res.json(tarea);
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
  const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

  const tareaEliminada = tareas.splice(index, 1);
  res.json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada[0] });
});

module.exports = router;
