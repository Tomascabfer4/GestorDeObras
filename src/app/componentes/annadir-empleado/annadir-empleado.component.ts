import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleados } from 'src/app/objetos/empleados';
import { AlertController } from '@ionic/angular';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { DatosEmpleadosService } from 'src/app/servicios/datosEmpleados.service';
import { FirestorageService } from 'src/app/servicios/firestorage.service';

@Component({
  selector: 'app-annadir-empleado',
  templateUrl: './annadir-empleado.component.html',
  styleUrls: ['./annadir-empleado.component.scss'],
  imports: [ IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonTextarea, IonButton, CommonModule, FormsModule]
})
export class AnnadirEmpleadoComponent  implements OnInit {

  empleado: Empleados = {
    id: '',
    Dni: '',
    NombreCompleto: '',
    Telefono: null,
    Cara: ''

  };

  constructor(private firestorageService: FirestorageService, private datosEmpleados: DatosEmpleadosService, private alertController: AlertController) { }

  ngOnInit() {}

  // Metodo para poner todos los atributos vacios
  elementosVacios(): boolean {
    return this.empleado.Dni == '' ||
      this.empleado.NombreCompleto == '' ||
      this.empleado.Telefono == null ||
      this.empleado.Cara == '';
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
      await this.mostrarAlerta('Debes rellenar todos los campos.');
      return;
    }
    this.insertarDatos();
  }

  // Se insertan los datos en firebase
  insertarDatos() {
    const data = {
      Dni: this.empleado.Dni,
      NombreCompleto: this.empleado.NombreCompleto,
      Telefono: this.empleado.Telefono,
      Cara: this.empleado.Cara
    };

    this.datosEmpleados.insertDatosEmpleados(data)
      .then(() => console.log('Datos insertados correctamente'))
      .catch((error) => console.error('Error al insertar datos:', error));
      this.empleado = {
        id: '',
        Dni: '',
        NombreCompleto: '',
        Telefono: null,
        Cara: ''
      };
  }

  // 📌 Método para subir la imagen a Firebase Storage
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.firestorageService.uploadFile(file, 'empleados').subscribe(url => {
      this.empleado.Cara = url; // Guarda la URL en el modelo
      console.log('Imagen subida:', url);
    });
  }

}
