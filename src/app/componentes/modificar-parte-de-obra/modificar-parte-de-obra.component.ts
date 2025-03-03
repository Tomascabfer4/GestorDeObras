import { Component, OnInit, SimpleChanges } from '@angular/core';
import { IonDatetimeButton, IonDatetime, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonSelectOption, IonSelect, IonButton, IonModal, IonItem, IonInput} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatosPDeObraService } from 'src/app/servicios/datosPDeObra.service';
import { PDeObras } from 'src/app/objetos/p-de-obra';
import { DatosEmpleadosService } from 'src/app/servicios/datosEmpleados.service';
import { Empleados } from 'src/app/objetos/empleados';
import { DatosObrasService } from 'src/app/servicios/datosObras.service';
import { Obras } from 'src/app/objetos/obras';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-modificar-parte-de-obra',
  templateUrl: './modificar-parte-de-obra.component.html',
  styleUrls: ['./modificar-parte-de-obra.component.scss'],
  imports: [ IonDatetimeButton, IonDatetime, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonSelectOption, IonSelect, CommonModule, FormsModule, IonButton, IonItem, IonInput ]
})
export class ModificarParteDeObraComponent  implements OnInit {

  @Input() pdeobraId!: string;

  constructor( private datosPDeObra: DatosPDeObraService, private datosEmpleado: DatosEmpleadosService, private alertController: AlertController, private datosObra: DatosObrasService ) { 
    this.datosEmpleado.getDatosEmpleados().subscribe((data)=> {
      this.empleados = data;
      console.log('Datos obtenidos de Firestore: ',data);
    })
    this.datosObra.getDatosObras().subscribe((data)=> {
      this.obras = data;
      console.log('Datos obtenidos de Firestore: ',data);
    })
  }

  ngOnInit() {}

  //Inicializamos la interfaz
  parteDeObra: PDeObras = {
    id: '',
    NombreCompletoEmpleado: '',
    NombreCompletoCliente: '',
    Fecha: null,
    Horas: null,
    Concepto: '',
    Observaciones: '',
    DireccionObra: '',
  };
    
  //Variables para los selects y array de obras y empleados para mostrarlos en los selects
    empleados: Empleados[] = [];
    obras: Obras[] = [];
    empleadoSeleccionado: string = '';
    clienteSeleccionado: string = '';
    direccionSeleccionada: string = '';
  
    elementosVacios(): boolean {
      return this.empleadoSeleccionado === '' ||
        this.clienteSeleccionado === '' ||
        this.parteDeObra.Fecha === null ||
        this.parteDeObra.Horas === null ||
        this.parteDeObra.Concepto === '' ||
        this.parteDeObra.Observaciones === '' ||
        this.direccionSeleccionada === '';
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
    this.asignarValoresSeleccionados(); // Asignar valores seleccionados
    this.actualizarDatos();
  }

  // Detecta cambios en pdeobraId y carga los datos cuando cambia
  ngOnChanges(changes: SimpleChanges) {
    if (changes['pdeObraId'] && this.pdeobraId) {
      console.log('ID recibido:', this.pdeobraId); // Verificar que el ID llega correctamente
      this.cargarpdeObra(this.pdeobraId);
    }
  }

  cargarpdeObra(id: string) {
    this.datosPDeObra.getParteDeObraPorId(id).subscribe((data) => {
      if (data) {
        this.parteDeObra = data;
        console.log('Parte de Obra cargada:', this.parteDeObra);
      } else {
        console.warn('No se encontró el parte de obra con ID:', id);
      }
    });
  }

  actualizarDatos() {
    if (!this.pdeobraId) {
      console.error('No se ha recibido un ID válido');
      return;
  }

    this.datosPDeObra.modificarDatosPDeObra(this.pdeobraId, {
      NombreCompletoEmpleado: this.parteDeObra.NombreCompletoEmpleado,
      NombreCompletoCliente: this.parteDeObra.NombreCompletoCliente,
      Fecha: this.parteDeObra.Fecha,
      Horas: this.parteDeObra.Horas,
      Concepto: this.parteDeObra.Concepto,
      Observaciones: this.parteDeObra.Observaciones,
      DireccionObra: this.parteDeObra.DireccionObra
    })
    .then(() => console.log('Parte De Obra modificada'))
    .catch(error => console.error(error));
  }

  //Iguala los valores seleccionados en los select en los de la interfaz
  asignarValoresSeleccionados() {
    this.parteDeObra.NombreCompletoEmpleado = this.empleadoSeleccionado;
    this.parteDeObra.NombreCompletoCliente = this.clienteSeleccionado;
    this.parteDeObra.DireccionObra = this.direccionSeleccionada;
  }


  //Deja en blanco todos los valores del formulario
  limpiarFormulario() {
    this.parteDeObra = {
      id: '',
      NombreCompletoEmpleado: '',
      NombreCompletoCliente: '',
      Fecha: null,
      Horas: null,
      Concepto: '',
      Observaciones: '',
      DireccionObra: ''
    };
    this.empleadoSeleccionado = '';
    this.clienteSeleccionado = '';
    this.direccionSeleccionada = '';
  }

  //Guarda la fecha seleccionada
  capturarFecha(event: any) {
    if (event.detail.value) {
      this.parteDeObra.Fecha = Timestamp.fromDate(new Date(event.detail.value));
    } else {
      this.parteDeObra.Fecha = null;
    }
  }

  
}
