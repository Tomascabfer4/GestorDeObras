import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, updateDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatosEmpleadosService {

  constructor(private firestore: Firestore) { }

  getDatosEmpleados(): Observable<any>{
    const ref = collection(this.firestore, 'Empleados');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  insertDatosEmpleados(data: any): Promise<void> {
    const ref = collection(this.firestore, 'Empleados');
    return addDoc(ref, data)
      .then(() => console.log('Datos de empleado insertados correctamente'))
      .catch((error) => console.error('Error al insertar datos de empleado:', error));
  }

  eliminarDatosEmpleados(id: string): Promise<void> {
    const docRef = doc(this.firestore, `Empleados/${id}`);
    return deleteDoc(docRef)
      .then(() => console.log('Empleado eliminado con ID: ', id))
      .catch((error) => console.error('Error al eliminar empleado:', error));
  }

  modificarDatosEmpleados(id: string, nuevosDatos: any): Promise<void> {
    const docRef = doc(this.firestore, `Empleados/${id}`);
    return updateDoc(docRef, nuevosDatos)
      .then(() => console.log('Empleado actualizado con ID: ', id))
      .catch((error) => console.error('Error al actualizar empleado:', error));
  }

  getEmpleadoPorId(id: string): Observable<any> {
      const docRef = doc(this.firestore, `Empleados/${id}`); // 📌 Accede al documento correcto
      return docData(docRef, { idField: 'id' }) as Observable<any>;
    }
}
