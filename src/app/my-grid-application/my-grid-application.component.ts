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
          headerName: "Athlete",
          field: "athlete",
          minWidth: 150
        },
        {
          headerName: "Age",
          field: "age",
          minWidth: 90
        },
        {
          headerName: "Country",
          field: "country"
        },
        {
          headerName: "Year",
          field: "year"
        },
        {
          headerName: "Date",
          field: "date"
        },
        {
          headerName: "Sport",
          field: "sport"
        },
        {
          headerName: "Gold",
          field: "gold"
        },
        {
          headerName: "Silver",
          field: "silver"
        },
        {
          headerName: "Bronze",
          field: "bronze"
        },
        {
          headerName: "Total",
          field: "total"
        }
      ];
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  
      this.http.get("http://localhost:3000/athletes").subscribe(data => {
        params.api.setRowData(data);
      });
  
      params.api.sizeColumnsToFit();
    }

  ngOnInit() {
  }

}
