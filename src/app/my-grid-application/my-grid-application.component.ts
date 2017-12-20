import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {RedComponentComponent} from "../red-component/red-component.component";

import {GridOptions} from "ag-grid/main";

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.scss']
})
export class MyGridApplicationComponent implements OnInit {
    private gridApi;
    private gridColumnApi;
  
    public columnDefs;
  
    constructor(private http: HttpClient) {
      this.columnDefs = [
        {
          headerName: "ID",
          field: "id",
          minWidth: 50
        },
        {
          headerName: "Name",
          field: "name",
          minWidth: 90
        },
        {
          headerName: "Username",
          field: "username"
        },
        {
          headerName: "Email",
          field: "email"
        },
        {
          headerName: "Phone #",
          field: "phone"
        },
        {
          headerName: "Website",
          field: "website"
        },
      ];
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  
      this.http.get("http://localhost:3000/users").subscribe(data => {
        params.api.setRowData(data);
      });
  
      params.api.sizeColumnsToFit();
    }

  ngOnInit() {
  }

}
