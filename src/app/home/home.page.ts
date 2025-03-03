import { Component, OnInit  } from '@angular/core';
import { IonItemSliding, IonItemOptions, IonItemOption, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSegmentContent, IonSegment, IonSegmentButton, IonLabel, IonSegmentView, IonHeader, IonToolbar, IonTitle, IonFooter} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Obras } from '../objetos/obras';
import { DatosObrasService } from '../servicios/datosObras.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonItemSliding, IonItemOptions, IonItemOption, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSegmentContent, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle,IonSegment, IonSegmentButton, IonLabel, IonSegmentView, IonFooter],
})
export class HomePage {

  obras: Obras[] = [];

  presupuestadas: Obras[] = [];

  enCursos: Obras[] = [];

  finalizadas: Obras[] = [];

  constructor(private datosObra: DatosObrasService) {
    console.log('Obras cargadas:', this.obras);
    this.datosObra.getDatosObras().subscribe((data) => {
      this.obras = data;
      console.log('Datos obtenidos de Firestore: ', data);
      
      // Filtramos las obras por estado
      this.presupuestadas = this.obras.filter(obra => obra.Estado === 'Presupuestada');
      this.enCursos = this.obras.filter(obra => obra.Estado === 'En curso');
      this.finalizadas = this.obras.filter(obra => obra.Estado === 'Finalizada');
      
      console.log('Presupuestadas:', this.presupuestadas);
      console.log('En curso:', this.enCursos);
      console.log('Finalizadas:', this.finalizadas);
    });
  }

  ngOnInit() {
  }

  // Función para cambiar el estado de la obra
  cambiarEstado(obra: Obras, nuevoEstado: 'Presupuestada' | 'En curso' | 'Finalizada') {
    // Cambiamos el estado de la obra
    obra.Estado = nuevoEstado;

    // Actualizamos el array correspondiente
    this.actualizarArrayDeObras();

    // Actualizamos los datos en Firestore
    this.datosObra.modificarEstadoObra(obra.id, obra.Estado)
      .then(() => console.log(`Estado de obra con ID ${obra.id} actualizado a ${nuevoEstado}`))
      .catch(error => console.error('Error al actualizar estado:', error));
  }

  // Actualiza los arrays de obras según el estado
  actualizarArrayDeObras() {
    this.presupuestadas = this.obras.filter(obra => obra.Estado === 'Presupuestada');
    this.enCursos = this.obras.filter(obra => obra.Estado === 'En curso');
    this.finalizadas = this.obras.filter(obra => obra.Estado === 'Finalizada');
  }

}
