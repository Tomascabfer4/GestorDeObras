import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  constructor(private storage: Storage) {} 

  uploadFile(file: File, path: string): Observable<string> {
    const fileRef = ref(this.storage, `${path}/${file.name}`);

    return new Observable(observer => {
      uploadBytes(fileRef, file).then(() => {
        getDownloadURL(fileRef).then(url => {
          observer.next(url);
          observer.complete();
        });
      }).catch(err => observer.error(err));
    });
  }
}