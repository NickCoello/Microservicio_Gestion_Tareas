import { Component, OnInit } from '@angular/core';
import { TareaService, Tarea } from '../../servicios/tarea.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../../servicios/usuario.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  usuarios: Usuario[] = [];
  tareasConUsuario: any[] = [];

  nuevaTarea: Tarea = { 
    titulo: '', 
    descripcion: '', 
    completada: false,
    usuarioId: undefined
  };
  tareaEditando: Tarea | null = null;
  editando: boolean = false;

  constructor(private tareaService: TareaService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
  this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
    this.usuarios = usuarios;
    this.obtenerTareas(); 
  });
}

  obtenerTareas(): void {
  this.tareaService.obtenerTareas().subscribe((data) => {
    console.log(' Tareas recibidas:', data); // Log 1
    console.log(' Usuarios disponibles:', this.usuarios); // Log 2

    this.tareas = data.map((tarea) => {
      const usuario = this.usuarios.find(u => u.id === Number(tarea.usuarioId));
      console.log(` Tarea: ${tarea.titulo}, usuarioId: ${tarea.usuarioId}, usuario encontrado:`, usuario); // Log 3

      return {
        ...tarea,
        usuarioNombre: usuario ? usuario.nombre : 'No asignado'
      };
    });
  });
}

   
  agregarTarea(): void {
  if (!this.nuevaTarea.titulo || !this.nuevaTarea.descripcion || !this.nuevaTarea.usuarioId) return;

  const usuario = this.usuarios.find(u => u.id === this.nuevaTarea.usuarioId);

  if (!usuario) {
    console.error('❌ Usuario no encontrado para ID:', this.nuevaTarea.usuarioId);
    return;
  }

  const tareaConUsuario = {
    ...this.nuevaTarea,
    usuarioNombre: usuario.nombre
  };

  console.log('📤 Enviando tarea:', tareaConUsuario);

  this.tareaService.agregarTarea(tareaConUsuario).subscribe(() => {
    this.nuevaTarea = { titulo: '', descripcion: '', usuarioId: undefined };
    this.obtenerTareas();
  });
}

    eliminarTarea(id: number): void {
    this.tareaService.eliminarTarea(id).subscribe(() => {
      this.obtenerTareas();
    });
  }

    iniciarEdicion(tarea: Tarea): void {
    this.tareaEditando ={ ...tarea};
    }
    guardarEdicion(): void {
    if (this.tareaEditando && this.tareaEditando.id) {
      this.tareaService.actualizarTarea(this.tareaEditando.id, this.tareaEditando).subscribe(() => {
        this.tareaEditando = null;
        this.obtenerTareas();
        });
      }
    }
  
cancelarEdicion(): void {
  this.tareaEditando = null;
}

}


