import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IonLabel, IonButton, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Input } from '@angular/core';
import { DatosEmpleadosService } from 'src/app/servicios/datosEmpleados.service';
import { Empleados } from 'src/app/objetos/empleados';
import { FirestorageService } from 'src/app/servicios/firestorage.service';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.scss'],
  imports: [ IonLabel, CommonModule, FormsModule, IonButton, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList],
})
export class ModificarEmpleadoComponent  implements OnInit {

  constructor(private firestorageService: FirestorageService, private datosEmpleados: DatosEmpleadosService, private alertController: AlertController) { }

  //empleadoId es la variable definida en el empleado.html que coge el valor del id del empleado a modificar.
  @Input() empleadoId!: string;

  empleado: Empleados = {
      id: '',
      NombreCompleto: '',
      Dni: '',
      Telefono: null,
      Cara: ''
  };
  
  elementosVacios(): boolean {
    return this.empleado.NombreCompleto === '' &&
    this.empleado.Dni === '' &&
    this.empleado.Telefono === null &&
    this.empleado.Cara === ''
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

  // Si no se rellena al menos un campo se muestra la alerta,
  // si los campos no estan rellenos cogerá los valores que ya tenia
  async ejecutarBoton() {
    if (this.elementosVacios()) {
      await this.mostrarAlerta('Debes rellenar todos los campos.');
      return;
    }
    this.actualizarDatos();
  }

  // Detecta cambios en obraId y carga los datos cuando cambia
  ngOnChanges(changes: SimpleChanges) {
    if (changes['empleadoId'] && this.empleadoId) {
      console.log('ID recibido:', this.empleadoId); // Verificar que el ID llega correctamente
      this.cargarEmpleado(this.empleadoId);
    }
  }

  cargarEmpleado(id: string) {
    this.datosEmpleados.getEmpleadoPorId(id).subscribe((data) => {
      if (data) {
        this.empleado = data;
        console.log('Empleado cargado:', this.empleado);
      } else {
        console.warn('No se encontró empleado con ID:', id);
      }
    });
  }

  ngOnInit() {}

  actualizarDatos() {
    if (!this.empleadoId) {
      console.error('No se ha recibido un ID válido');
      return;
    }

    this.datosEmpleados.modificarDatosEmpleados(this.empleadoId, {
      NombreCompleto: this.empleado.NombreCompleto,
      Dni: this.empleado.Dni,
      Telefono: this.empleado.Telefono,
      Cara: this.empleado.Cara
    })
    .then(() => console.log('Empleado modificado'))
    .catch(error => console.error(error));
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
