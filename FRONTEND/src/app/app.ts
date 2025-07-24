//import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

//@Component({
  //selector: 'app-root',
  //imports: [RouterOutlet],
  //templateUrl: './app.html',
  //styleUrl: './app.css'
//})
//export class App {
  //protected readonly title = signal('FRONTEND');
//}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasComponent } from './componentes/tareas/tareas.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TareasComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
