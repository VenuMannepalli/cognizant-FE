import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{
 
  public searchText : string;
  public items = [];
  public tempItems=[];

  constructor(private papa: Papa) {
  }

  ngOnInit(){
  }

  onChange(files: File[]){
    var data: any[];
    if(files[0]){
      console.log(files[0]);
      this.papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result,file) => {
          data=result.data;
          this.items=data;
          this.tempItems=data;
        }
      });
    }
  }

  filter(searchTerm) {
    console.log("search",searchTerm);
    if(!searchTerm) {
      this.items = this.tempItems;
    } else {
      this.items= this.tempItems.filter(x => 
       // console.log("x",x);
        x["Issue count"].replace(/\s/g, "").toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
  }
 
}
