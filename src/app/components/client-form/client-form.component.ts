import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { ClientModel } from '../../models/client-model'
import { ClientService } from '../../services/client.service'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-client-info-template',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientInfoTemplateComponent implements OnInit {
  itemId!: string
  headerMessage: string = 'Cadastro de Cliente'
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
    if (this.itemId) {
      this.headerMessage = 'Edição de Cliente'
      this.save_button = 'Salvar'
      this.clientService.getClient(this.itemId).subscribe(res => {
        this.clientInfos = res

        this.populateForm(this.clientInfos)
      })
    } else {
      this.createForm(new ClientModel())
    }
  }

  onSubmit(): void {
    if (this.itemId) {
      this.clientService.updateClient(this.itemId, this.clientForm.value).subscribe(() => {
        alert('Cliente atualizado com sucesso!')
      }, err => {
        alert(err.error.message)
      })
    } else {
      this.clientService.registerClient(this.clientForm.value).subscribe(() => {
        alert('Cliente registrado com sucesso!')
      }, err => {
        alert(err.error.message)
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

  return(): void {
    this.router.navigate(['/clients'])
  }
}
