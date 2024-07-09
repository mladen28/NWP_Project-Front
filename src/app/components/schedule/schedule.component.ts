import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScheduleParameters} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {VacuumControlService} from "../../services/vacuumControl.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})


export class ScheduleComponent  implements OnInit{

  scheduleForm: FormGroup
  scheduleParameters: ScheduleParameters

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private vacuumControlService: VacuumControlService) {
    this.scheduleForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      action: ['', [Validators.required]],
      test: ['', [Validators.required]]

    })

    this.scheduleParameters = {
      id: 0,
      date: '',
      time: '',
      action: ''
    }
  }

  ngOnInit(): void {
    this.scheduleParameters.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
  }

  schedule(){
    console.log(this.scheduleParameters)
    this.vacuumControlService.scheduleVacuumControl(this.scheduleParameters).subscribe(result => {
      console.log(result)
    })

  }

}
