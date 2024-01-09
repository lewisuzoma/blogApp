import { Injectable, inject } from '@angular/core';
import { RequestService } from '../core/request.service';
import { GlobalService } from '../core/global.service';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  api = inject(RequestService)
  global = inject(GlobalService)
  firestore = inject(AngularFirestore)
  firestorage = inject(AngularFireStorage)

  blogs(): Observable<any[]> {
    return this.firestore
      .collection('blogs')
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<any>[]) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  blog(blogId: any): Observable<any> {
    return this.firestore.collection('blogs').doc(blogId).valueChanges();
  }
  
 async create(formData: any){

  try {
      const downloadUrl = await this.upload(formData);
      let data = {
        description: formData.description,
        title: formData.title,
        image: downloadUrl
      };
      await this.firestore.collection('blogs').add(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  async update(blogId: string, formData: any) {
    console.log(blogId, formData);
    try {
      const downloadUrl = await this.upload(formData);
      let data = {
        description: formData.description,
        title: formData.title,
        image: downloadUrl
      };
      await this.firestore.collection('blogs').doc(blogId).update(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  delete(blogId: string) {
    return this.firestore.collection('blogs').doc(blogId).delete();
  }

  upload(formData: any) {
    const filePath = 'blogs/'+Date.now().toString()+'_'+formData.image.name;
    const fileRef = this.firestorage.ref(filePath)
    const task = this.firestorage.upload(filePath, formData.image, { contentType: formData.image.type })
    return new Promise<string>((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(async() => {
          try {
            const downloadUrl = await fileRef.getDownloadURL().toPromise();
            resolve(downloadUrl);
          } catch (error) {
            console.error('Error getting download URL:', error);
            reject(error);
          }
        })
      ).subscribe()
    })
  }
}
