import { ColDef } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';

import { useMemo, useRef, useState } from "react";

import "./cataloglist.module.css";

// Row Data Interface
interface IRow {
    make: string;
    model: string;
    price: number;
    electric: boolean;
}


export default function CatalogList() {
    const SIZE = 50;
    const gridRef = useRef<AgGridReact>(null);
    const [activeFilterCount, setActiveFilterCount] = useState(0);
  
    const columnDefs: ColDef<any>[] = useMemo(
      (): ColDef<any>[] => [
        // {
        //   field: 'name',
        //   cellRenderer: LinkRenderer,
        //   cellRendererParams: {
        //     route: '/catalog/{0}',
        //     idField: 'catalogIdentifier',
        //   },
        // },
        {
          headerName: 'Owner',
          field: 'organizationName',
          filter: 'agSetColumnFilter',
        },
        {
          headerName: 'Catalog Type',
          field: 'catalogTypeName',
        },
      ],
      [],
    );

    
   const [rowData, setRowData] = useState<IRow[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
]);

// Column Definitions: Defines & controls grid columns.
const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },

]);



return(
    <div className="wrapper">
      <div className="row">
        <div className="col-md-9">
        <div className="ag-theme-quartz" style={{ height: '600px'}}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
        </div>
      </div>
    </div>
)
}