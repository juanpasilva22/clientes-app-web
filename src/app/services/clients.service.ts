import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, share } from "rxjs";
import { ClienteDTO } from "../models/ClienteDTO";
import { KpiClienteDTO } from "../models/KpiClienteDTO";

@Injectable({
    providedIn: 'root'
})
/**
 * Servicio que contiene logica de adminitracion de Clientes.
 */
export class ClientsService extends BaseService {
  
    private endpoint = environment.apiUrl;
  
    constructor(
      protected http: HttpClient,
    ) {
      super(http);
    }
  
    /**
     * Crea un nuevo Cliente con los datos suministrados.
     * @param ClienteDTO 
     * @returns 
     */
    createClient(cliente: ClienteDTO): Observable<any> {
      return this.http.post<any>(`${this.endpoint}/creacliente/`, cliente).pipe(share());
    }
  
    /**
     * Lista todos los clientes.
     * @returns Observable<ClienteDTO[]>
     */
    getClients(): Observable<ClienteDTO[]> {
        return this.http.get<ClienteDTO[]>(`${this.endpoint}/listar`).pipe(share());
    }

    /**
     * Devuelve el promedio de edad y la desviacion estandar de los clientes.
     * @returns Observable<KpiClienteDTO> 
     */
    getKpiClients(): Observable<KpiClienteDTO> {
        return this.http.get<KpiClienteDTO>(`${this.endpoint}/kpideclientes`).pipe(share());
    }
}