import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, updateDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatosObrasService {

  constructor(private firestore: Firestore) { }

  getDatosObras(): Observable<any>{
    const ref = collection(this.firestore, 'Obras');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  insertDatosObras(data: any): Promise<void> {
    const ref = collection(this.firestore, 'Obras');
    return addDoc(ref, data)
      .then(() => console.log('Datos de obra insertados correctamente'))
      .catch((error) => console.error('Error al insertar datos de obra:', error));
  }

  eliminarDatosObras(id: string): Promise<void> {
    const docRef = doc(this.firestore, `Obras/${id}`);
    return deleteDoc(docRef)
      .then(() => console.log('Obra eliminada con ID: ', id))
      .catch((error) => console.error('Error al eliminar obra:', error));
  }

  modificarDatosObras(id: string, nuevosDatos: any): Promise<void> {
    const docRef = doc(this.firestore, `Obras/${id}`);
    return updateDoc(docRef, nuevosDatos)
      .then(() => console.log('Obra actualizada con ID: ', id))
      .catch((error) => console.error('Error al actualizar obra:', error));
  }

  // Método para obtener una obra específica por su ID
  getObraPorId(id: string): Observable<any> {
    const docRef = doc(this.firestore, `Obras/${id}`); // 📌 Accede al documento correcto
    return docData(docRef, { idField: 'id' }) as Observable<any>;
  }

  modificarEstadoObra(id: string, nuevoEstado: string): Promise<void> {
    const docRef = doc(this.firestore, `Obras/${id}`);
    return updateDoc(docRef, { Estado: nuevoEstado })
      .then(() => console.log('Estado de obra actualizado con ID: ', id))
      .catch((error) => console.error('Error al actualizar estado de la obra:', error));
  }
}
