import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonIcon, IonButton, IonAvatar} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { AnnadirEmpleadoComponent } from "../componentes/annadir-empleado/annadir-empleado.component";
import { ModificarEmpleadoComponent } from '../componentes/modificar-empleado/modificar-empleado.component';
import { Empleados } from '../objetos/empleados';
import { DatosEmpleadosService } from '../servicios/datosEmpleados.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButton, IonIcon, IonCardContent, IonCardHeader, IonCard, IonList, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AnnadirEmpleadoComponent, ModificarEmpleadoComponent]
})
export class EmpleadoPage implements OnInit {
  empleados: Empleados[] = [];

  constructor(private datosEmpleado: DatosEmpleadosService) { 
    addIcons({closeCircleOutline});

    this.datosEmpleado.getDatosEmpleados().subscribe((data)=> {
      this.empleados = data;
      console.log('Datos obtenidos de Firestore: ',data);
    })
  }

  eliminarDatos(id: string) {
    this.datosEmpleado.eliminarDatosEmpleados(id).then(() => {
      console.log('Empleado eliminado con ID: ', id);
      // Actualizar el stock localmente
      this.empleados = this.empleados.filter(item => item.id !== id);
    }).catch((error) => {
      console.error('Error al eliminar empleado: ', error);
    });
  }
  ngOnInit() {
  }

}
