import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Obras } from 'src/app/objetos/obras';
import { DatosObrasService } from 'src/app/servicios/datosObras.service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-obra',
  templateUrl: './modificar-obra.component.html',
  styleUrls: ['./modificar-obra.component.scss'],
  imports: [ FormsModule, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonInput, IonButton]
})
export class ModificarObraComponent  implements OnInit {

  //cocheId es la variable definida en el coche.html que coge el valor del id del coche a modificar.
  @Input() obraId!: string;

  obra: Obras = {
    id: '',
    Localidad: '',
    Direccion: '',
    NombreCompletoCliente: '',
    TelefonoCliente: null,
    Estado: ''
  };

  elementosVacios(): boolean {
    return this.obra.Localidad === '' ||
    this.obra.Direccion === '' || 
    this.obra.NombreCompletoCliente === '' || 
    this.obra.TelefonoCliente === null
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

  constructor(private datosObras: DatosObrasService, private alertController: AlertController) { }

  // Detecta cambios en obraId y carga los datos cuando cambia
  ngOnChanges(changes: SimpleChanges) {
    if (changes['obraId'] && this.obraId) {
      console.log('ID recibido:', this.obraId); // Verificar que el ID llega correctamente
      this.cargarObra(this.obraId);
    }
  }

  cargarObra(id: string) {
    this.datosObras.getObraPorId(id).subscribe((data) => {
      if (data) {
        this.obra = data;
        console.log('Obra cargada:', this.obra);
      } else {
        console.warn('No se encontró la obra con ID:', id);
      }
    });
  }

  ngOnInit() {}

  actualizarDatos() {
    if (!this.obraId) {
      console.error('No se ha recibido un ID válido');
      return;
    }

    this.datosObras.modificarDatosObras(this.obraId, {
      Localidad: this.obra.Localidad,
      Direccion: this.obra.Direccion,
      NombreCompletoCliente: this.obra.NombreCompletoCliente,
      TelefonoCliente: this.obra.TelefonoCliente
    })
    .then(() => console.log('Obra modificada'))
    .catch(error => console.error(error));
  }

  

}

