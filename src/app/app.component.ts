import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndexedDBService } from './services/indexed-db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PWA';

  apiData: any;
  constructor(private http: HttpClient,
    private indexedDBService: IndexedDBService
    ){}

  ngOnInit(){
    this.http.get('http://dummy.restapiexample.com/api/v1/employees').subscribe(
      (res: any) => {
        this.apiData = res.data;
      },err => {
        console.error(err);
      }
    )
  }

  postSync() {
    let obj = {
      msz: 'Akarsh is trying to update the data',
    };
    //api call
    this.http.post('http://localhost:3000/data', obj).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.backgroundSync();
      }
    );
  }

  backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration:any) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }
}
