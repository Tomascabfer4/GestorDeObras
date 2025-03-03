import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonCardHeader, IonList, IonCard, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';
import { AnnadirParteDeObraComponent } from "../componentes/annadir-parte-de-obra/annadir-parte-de-obra.component";
import { PDeObras } from '../objetos/p-de-obra';
import { DatosPDeObraService } from '../servicios/datosPDeObra.service';

@Component({
  selector: 'app-partes-de-obra',
  templateUrl: './partes-de-obra.page.html',
  styleUrls: ['./partes-de-obra.page.scss'],
  standalone: true,
  imports: [ IonCardContent, IonCardTitle, IonCard, IonList, IonCardHeader, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AnnadirParteDeObraComponent]
})
export class PartesDeObraPage implements OnInit {

  pdeObras: PDeObras[] = [];
  
  constructor(private datosPDeObra: DatosPDeObraService) { 

    this.datosPDeObra.getDatosPDeObra().subscribe((data) => {
      this.pdeObras = data.map((doc: any) => ({
        ...doc,
        Fecha: doc.Fecha && doc.Fecha.toDate ? doc.Fecha.toDate() : null // Verifica que `Fecha` tiene `toDate()`
      }));
      console.log(this.pdeObras); // Verifica si las fechas se convierten correctamente
    });
  }

  ngOnInit() {
  }

}
