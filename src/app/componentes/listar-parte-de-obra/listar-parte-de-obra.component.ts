import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon, IonLabel, IonAccordion, IonAccordionGroup, IonItem, IonCardHeader, IonList, IonCard, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosPDeObraService } from 'src/app/servicios/datosPDeObra.service';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { PDeObras } from 'src/app/objetos/p-de-obra';
import { Input } from '@angular/core';
import { ModificarParteDeObraComponent } from '../modificar-parte-de-obra/modificar-parte-de-obra.component';

@Component({
  selector: 'app-listar-parte-de-obra',
  templateUrl: './listar-parte-de-obra.component.html',
  styleUrls: ['./listar-parte-de-obra.component.scss'],
  imports: [ IonButton, IonIcon, IonLabel, IonAccordion, IonAccordionGroup, IonCardContent, IonCardTitle, IonCard, IonList, IonCardHeader, IonItem, CommonModule, FormsModule, ModificarParteDeObraComponent]
  
})
export class ListarParteDeObraComponent  implements OnInit {

  @Input() pdeObraDireccion!: string;

  pdeObras: PDeObras[] = [];

  obtenerPartesPorDireccion(direccion: string) {
    this.datosPDeObra.getParteDeObraPorDireccion(direccion).subscribe((data) => {
      this.pdeObras = data.map(doc => ({
        ...doc,
        Fecha: doc.Fecha && doc.Fecha.toDate ? doc.Fecha.toDate() : null // Convertir Timestamp a Date
      }));
      console.log('Partes de obra:', this.pdeObras);
    }, error => {
      console.error('Error al obtener partes de obra:', error);
    });
  }

  eliminarDatos(id: string) {
    this.datosPDeObra.eliminarDatosPDeObra(id).then(() => {
      console.log('Parte de obra eliminada con ID: ', id);
      // Actualizar el stock localmente
      this.pdeObras = this.pdeObras.filter(item => item.id !== id);
    }).catch((error) => {
      console.error('Error al eliminar obra: ', error);
    });
  }

  constructor(private datosPDeObra: DatosPDeObraService) { 
    addIcons({closeCircleOutline});
  }

  ngOnInit() {
    this.obtenerPartesPorDireccion(this.pdeObraDireccion);
  }

}
