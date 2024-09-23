import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, Observable, throwError } from 'rxjs';
import { ClienteDTO } from 'src/app/models/ClienteDTO';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource<ClienteDTO>();
  
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'edad',
    'fechaNacimiento'
  ];
  clientes$: Observable<ClienteDTO[]>;
  loading: boolean;
  error: string;

  constructor(
    private service: ClientsService
  ) {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.clientes$ = this.service.getClients();
    this.clientes$
      .pipe(catchError(err => {
        // Ocurre algun error al intentar recuperar el listado de clientes.
        this.loading = false;
        this.error = 'ERROR AL CARGAR CLIENTES...';
        return throwError(() => err);
      }))
      .subscribe(response => {
        // cargar los datos en la tabla.
        this.loading = false;
        this.dataSource = new MatTableDataSource<ClienteDTO>(response);
        this.dataSource.paginator = this.paginator;
      });
  }

}
