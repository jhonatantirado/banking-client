import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals} from '../shared/globals';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient,
              public globals : Globals
    ){
  }

  ngOnInit() : void{
    }  
}
