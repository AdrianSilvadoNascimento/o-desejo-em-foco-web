import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { ClientModel } from '../../models/client-model'
import { ClientService } from '../../services/client.service'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-client-info-template',
  templateUrl: './client-info-template.component.html',
  styleUrls: ['./client-info-template.component.scss'],
})
export class ClientInfoTemplateComponent implements OnInit {
  @Input() headerMessage: string = 'Lista de Clientes'
  @Input() itemId!: string
  @Input() isEditing: boolean = false
  save_button: string = 'Cadastrar'
  faArrowLeft = faArrowLeft
  clientForm = new FormGroup({})
  clientInfos: ClientModel = new ClientModel()
  clientList: ClientModel[] = []
  
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.isEditing) {
      this.save_button = 'Salvar'
      this.clientService.getClient(this.itemId).subscribe(res => {
        this.clientInfos = res

        this.populateForm(this.clientInfos)
      })
    } else {
      console.log('chegou no else')
      this.createForm(new ClientModel())
    }

    this.fetchClients()
  }

  onSubmit(): void {

  }

  fetchClients(): void {
    if (!this.itemId) {
      this.clientService.getClients().subscribe(res => {
        this.clientService.updateClientList(res)
      })

      this.clientService.$clientList.subscribe(res => {
        this.clientList = [ ...res ]
      })
    }
  }

  populateForm(clientModel: ClientModel): void {
    this.clientForm.patchValue({
      name: clientModel.name,
      lastname: clientModel.lastname,
      age: clientModel.age,
      email: clientModel.email,
      street: clientModel.street,
      house_number: clientModel.house_number,
      neighbourhood: clientModel.neighbourhood,
      postal_code: clientModel.postal_code,
      country: clientModel.country,
    })
  }
  
  createForm(clientModel: ClientModel): void {
    this.clientForm = this.formBuilder.group({
      name: [clientModel.name, Validators.required],
      lastname: [clientModel.lastname, Validators.required],
      age: [clientModel.age, Validators.required],
      email: [clientModel.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      street: [clientModel.street, Validators.required],
      house_number: [clientModel.house_number, Validators.required],
      neighbourhood: [clientModel.neighbourhood, Validators.required],
      postal_code: [clientModel.postal_code, Validators.required],
      country: [clientModel.country, Validators.required],
    })
  }

  deleteClient(clientId: string): void {
    const confirm_delete = confirm('Tem certeza que deseja excluir este cliente?')

    if (confirm_delete) {
      this.clientService.deleteClient(clientId).subscribe(() => {
        alert('Cliente excluído com sucesso')

        this.clientService.getClients().subscribe(res => {
          this.clientService.updateClientList(res)
        })
      }, err => {
        alert(err.error.message)
      })
    }
  }

  return(): void {
    this.router.navigate(['/index'])
  }
}
