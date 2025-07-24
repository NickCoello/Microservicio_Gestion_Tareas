import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada?: boolean;
  usuarioId?: number;
  usuarioNombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://localhost:3000/api/tareas';
  private API_USUARIOS = 'http://localhost:3001/api/usuarios';

  tareaEditando: Tarea | null = null;

  constructor(private http: HttpClient) {}

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  agregarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  iniciarEdicion(tarea: Tarea): void {
    this.tareaEditando = { ...tarea };
  }

  guardarEdicion(): Observable<Tarea> | void {
    if (this.tareaEditando && this.tareaEditando.id) {
      const tarea = { ...this.tareaEditando };
      const id = tarea.id!;
      this.tareaEditando = null;
      return this.actualizarTarea(id, tarea);
    }
  }

  cancelarEdicion(): void {
    this.tareaEditando = null;
  }
}
