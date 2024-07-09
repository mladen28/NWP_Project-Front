import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VacuumControlService} from "../../services/vacuumControl.service";
import {Router} from "@angular/router";
import {AddRequest} from "../../models";

@Component({
  selector: 'app-add-vacuumControl',
  templateUrl: './create-vacuumControle.component.html',
  styleUrls: ['./create-vacuumControle.component.css']
})
export class CreateVacuumControleComponent implements OnInit{

  name: string
  createVacuumControlForm: FormGroup
  createRequest: AddRequest

  constructor(private vacuumControlService: VacuumControlService, private formBuilder: FormBuilder, private router: Router) {
    this.name = ""
    this.createVacuumControlForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.createRequest = {
      name: '',
      mail: ''
    }
  }

  ngOnInit(): void {//todo porpavi ovaj kurac
    this.createRequest.mail = localStorage.getItem("userMail")!
  }

  createVacuumControl(){
    this.vacuumControlService.addVacuumControl(this.createRequest).subscribe(result => {
      this.router.navigate(['/vacuums'])
      console.log(result)
    })
  }

}
