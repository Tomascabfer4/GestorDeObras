import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonAccordion, IonItem, IonLabel, IonAccordionGroup, IonList, IonCardContent, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { AnnadirObraComponent } from "../componentes/annadir-obra/annadir-obra.component";
import { DatosObrasService } from '../servicios/datosObras.service';
import { ModificarObraComponent } from '../componentes/modificar-obra/modificar-obra.component';
import { Obras } from '../objetos/obras';
import { ListarParteDeObraComponent } from "../componentes/listar-parte-de-obra/listar-parte-de-obra.component";

@Component({
  selector: 'app-obra',
  templateUrl: './obra.page.html',
  styleUrls: ['./obra.page.scss'],
  standalone: true,
  imports: [ModificarObraComponent, IonButton, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonCardContent, IonList, IonAccordionGroup, IonLabel, IonItem, IonAccordion, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AnnadirObraComponent, ListarParteDeObraComponent]
})
export class ObraPage implements OnInit {
  obras: Obras[] = [];

  constructor(private datosObra: DatosObrasService) { 
    addIcons({closeCircleOutline});

    console.log('Obras cargadas:', this.obras);
    this.datosObra.getDatosObras().subscribe((data)=> {
      this.obras = data;
      console.log('Datos obtenidos de Firestore: ',data);
    })
  }

  eliminarDatos(id: string) {
    this.datosObra.eliminarDatosObras(id).then(() => {
      console.log('Obra eliminada con ID: ', id);
      // Actualizar el stock localmente
      this.obras = this.obras.filter(item => item.id !== id);
    }).catch((error) => {
      console.error('Error al eliminar obra: ', error);
    });
  }
  
  ngOnInit() {
  }
  
}
