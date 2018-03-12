import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DataService]
})

export class MyGridApplicationComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private domLayout;
  private columnDefs;
  private columnDefs_02;

  data: any;
  //loading: boolean;

  constructor(private http: HttpClient, private _data: DataService) {   // , private _data: DataService
    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        maxWidth: 5,
        unSortIcon: true
      },
      {
        headerName: "Name",
        field: "name",
        minWidth: 90,
        sort: "asc"
      },
      {
        headerName: "Username",
        field: "username",
        minWidth: 50
      },
      {
        headerName: "Email",
        field: "email",
        minWidth: 180
      },
      {
        headerName: "Phone #",
        field: "phone",
        minWidth: 90
      },
      {
        headerName: "Company Info",
        children: [
          {
            headerName: "Company Name", 
            field: "company.name", 
            minWidth: 90, 
            filter: "agTextColumnFilter"
          },
          {
            headerName: "Website",
            columnGroupShow: "open",
            field: "website",
            minWidth: 90,
            filter: "agTextColumnFilter"
          },
          {
            headerName: "Catch Phrase", 
            columnGroupShow: "open", 
            field: "company.catchPhrase", 
            minWidth: 90, 
            filter: "agTextColumnFilter"
          },
          {
            headerName: "BS", 
            columnGroupShow: "open", 
            field: "company.bs", 
            minWidth: 90, 
            filter: "agTextColumnFilter"
          }
        ]
      }
    ],

    this.columnDefs_02 = [
      {
        headerName: "ID",
        field: "id",
        maxWidth: 20,
        sort: "desc"
      },
      {
        headerName: "Name",
        field: "name",
        maxWidth: 100,
      },
      {
        headerName: "Email",
        field: "email",
        minWidth: 180
      },
      {
        headerName: "Phone #",
        field: "phone",
        minWidth: 90
      },
      {
        headerName: "Address Info",
        children: [
          {
            headerName: "Street", 
            field: "address.street", 
            minWidth: 90, 
            filter: "agTextColumnFilter"
          },
          {
            headerName: "Suite", 
            columnGroupShow: "open", 
            field: "address.suite", 
            minWidth: 90, 
            filter: "agTextColumnFilter"
          },
          {
            headerName: "City", 
            columnGroupShow: "open", 
            field: "address.city", 
            minWidth: 90, 
            filter: "agTextColumnFilter"
          },  
        ]
      },
    ];
    this.domLayout = "autoHeight";
  }

  ngOnInit() {
    this._data.dataRequest();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get("http://localhost:3000/users").subscribe(data => {
      params.api.setRowData(data);
    });  
  }
}