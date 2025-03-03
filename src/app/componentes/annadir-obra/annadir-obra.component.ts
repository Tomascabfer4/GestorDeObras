import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Obras } from 'src/app/objetos/obras';
import { AlertController } from '@ionic/angular';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { DatosObrasService } from 'src/app/servicios/datosObras.service';

@Component({
  selector: 'app-annadir-obra',
  templateUrl: './annadir-obra.component.html',
  styleUrls: ['./annadir-obra.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonTextarea, IonButton, CommonModule, FormsModule]
})
export class AnnadirObraComponent  implements OnInit {

  obra: Obras = {
    id: '',
    Localidad: '',
    Direccion: '',
    NombreCompletoCliente: '',
    TelefonoCliente: null,
    Estado: ''
  };
  
  constructor(private datosObra: DatosObrasService, private alertController: AlertController) { 
  }

  ngOnInit() {
  }

  // Metodo para poner todos los atributos vacios
  elementosVacios(): boolean {
    return this.obra.Localidad == '' ||
      this.obra.Direccion == '' ||
      this.obra.NombreCompletoCliente == '' ||
      this.obra.TelefonoCliente == null;
  }

  // Se genera un metodo asincrono para mostrar la alerta,
  // se hace así porque si no daría problemas al cerrar la alerta.
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Si no se rellenan todos los datos se muestra la alerta
  async ejecutarBoton() {
    if (this.elementosVacios()) {
      await this.mostrarAlerta('Debes rellenar todos los campos');
      return;
    }
    this.insertarDatos();
  }

  // Se insertan los datos en firebase
  insertarDatos() {
    const data = {
      Localidad: this.obra.Localidad,
      Direccion: this.obra.Direccion,
      NombreCompletoCliente: this.obra.NombreCompletoCliente,
      TelefonoCliente: this.obra.TelefonoCliente,
      Estado: 'Presupuestada'
    };

    this.datosObra.insertDatosObras(data)
      .then(() => console.log('Datos insertados correctamente'))
      .catch((error) => console.error('Error al insertar datos:', error));
      this.obra = {
        id: '',
        Localidad: '',
        Direccion: '',
        NombreCompletoCliente: '',
        TelefonoCliente: null, 
        Estado: ''
      };

  }

}
