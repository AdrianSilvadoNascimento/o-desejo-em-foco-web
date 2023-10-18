import { Component } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ClientModel } from '../../models/client-model'
import { ClientService } from '../../services/client.service'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-client-info-template',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  standalone: false,
})
export class ClientInfoTemplateComponent {
  clientId!: string
  headerMessage: string = ''
  save_button: string = ''
  faArrowLeft = faArrowLeft
  clientForm: FormGroup = new FormGroup({})
  clientInfos: ClientModel = new ClientModel()
  clientList: ClientModel[] = []
  listOfSex: { html: string, value: string }[] = [
    { html: 'Masculino', value: 'Masculino' },
    { html: 'Feminino', value: 'Feminino' },
  ]
  
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.headerMessage = 'Cadastro de Cliente'
    this.save_button = 'Cadastrar'
    
    this.activateRoute.params.subscribe(param => {
      this.clientId = param['id']
    })
    
    this.createForm(new ClientModel())

    if (this.clientId) {
      this.headerMessage = 'Edição de Cliente'
      this.save_button = 'Salvar'
      this.clientService.getClient(this.clientId).subscribe(res => {
        this.populateForm(res)
      })
    }
  }

  onSubmit(): void {
    if (this.clientId) {
      this.clientService.updateClient(this.clientId, this.clientForm.value).subscribe(() => {
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
      sex: clientModel.sex,
      age: clientModel.age,
      email: clientModel.email,
      street: clientModel.street,
      house_number: clientModel.house_number,
      neighborhood: clientModel.neighborhood,
      postal_code: clientModel.postal_code,
      country: clientModel.country,
    })
  }
  
  createForm(clientModel: ClientModel): void {
    this.clientForm = this.formBuilder.group({
      name: [clientModel.name, Validators.required],
      lastname: [clientModel.lastname, Validators.required],
      sex: [clientModel.sex, Validators.required],
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
      neighborhood: [clientModel.neighborhood, Validators.required],
      postal_code: [clientModel.postal_code, Validators.required],
      country: [clientModel.country, Validators.required],
    })
  }

  return(): void {
    this.router.navigate([this.clientId ? `/info-client/${this.clientId}` : '/clients'])
  }
}
