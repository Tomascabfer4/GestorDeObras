import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, updateDoc, doc, query, where, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatosPDeObraService {

  constructor(private firestore: Firestore) { }

  getDatosPDeObra(): Observable<any>{
    const ref = collection(this.firestore, 'Partes_De_Obra');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  insertDatosPDeObra(data: any): Promise<void> {
    const ref = collection(this.firestore, 'Partes_De_Obra');
    return addDoc(ref, data)
      .then(() => console.log('Datos de parte de obra insertados correctamente'))
      .catch((error) => console.error('Error al insertar datos de parte de obra:', error));
  }

  eliminarDatosPDeObra(id: string): Promise<void> {
    const docRef = doc(this.firestore, `Partes_De_Obra/${id}`);
    return deleteDoc(docRef)
      .then(() => console.log('Parte de obra eliminado con ID: ', id))
      .catch((error) => console.error('Error al eliminar parte de obra:', error));
  }

  modificarDatosPDeObra(id: string, nuevosDatos: any): Promise<void> {
    const docRef = doc(this.firestore, `Partes_De_Obra/${id}`);
    return updateDoc(docRef, nuevosDatos)
      .then(() => console.log('Parte de obra  actualizado con ID: ', id))
      .catch((error) => console.error('Error al actualizar parte de obra:', error));
  }

  getParteDeObraPorDireccion(direccion: string): Observable<any[]> {
    const partesRef = collection(this.firestore, 'Partes_De_Obra'); // 📌 Asegúrate de que este es el nombre correcto en Firestore
    const q = query(partesRef, where('DireccionObra', '==', direccion));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  // Método para obtener una obra específica por su ID
    getParteDeObraPorId(id: string): Observable<any> {
      const docRef = doc(this.firestore, `Partes_De_Obra/${id}`); // 📌 Accede al documento correcto
      return docData(docRef, { idField: 'id' }) as Observable<any>;
    }

}
