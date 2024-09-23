import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ClienteDTO } from 'src/app/models/ClienteDTO';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  
  constructor(
    private firestore: AngularFirestore,
    private service: ClientsService
  ) {}

  onSubmit(form: any) {
    this.firestore.collection('clientes').add(form.value);
    form.reset();
  }

}
