import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {VacuumControlSearchParameters, Role} from "../../models";
import {VacuumControlService} from "../../services/vacuumControl.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-all-vacuums',
  templateUrl: './all-vacuums.component.html',
  styleUrls: ['./all-vacuums.component.css']
})

export class AllVacuumsComponent implements OnInit, OnDestroy{

  searchForm: FormGroup
  vacuumControlSearchParameters: VacuumControlSearchParameters
  router: Router
  someSubscription: any
  vacuumControlList: any
  runningStatus:boolean
  stoppedStatus:boolean
  dischargeStatus:boolean
  userRoles: Role[]


  constructor(private vacuumControlService: VacuumControlService, router: Router, private formBuilder: FormBuilder) {
    this.router = router
    this.userRoles = []
    this.vacuumControlList = []
    this.runningStatus = false
    this.stoppedStatus = false
    this.dischargeStatus = false

    this.searchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],

    })

    this.vacuumControlSearchParameters = {
      name: '',
      dateFrom: null,
      dateTo: null
    }

    //https://medium.com/beingcoders/angular-basics-refresh-an-angular-component-without-reloading-the-same-component-b6c513f06fb2
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.someSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.someSubscription) {
      this.someSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllVacuumsByUser(localStorage.getItem("userMail")!)
    this.userRoles = JSON.parse(<string>localStorage.getItem("userRoles"))
  }

  getPermission(permission: string): boolean {
    return !!localStorage.getItem("userRoles")?.includes(permission);
  }

  getAllVacuumsByUser(mail: string){
    this.vacuumControlService.getAll(mail).subscribe(result => {
      result.forEach(machine => {
        if (machine.active) this.vacuumControlList.push(machine)
      })
      console.log(result)
    })
  }

  search(){
    let statusString: any
    if (this.runningStatus && this.stoppedStatus && this.dischargeStatus) statusString = "RUNNING,STOPPED,DISCHARGE"
    else if (!this.runningStatus && !this.stoppedStatus && !this.dischargeStatus) statusString = null
    else {
      statusString = ''
      if (this.runningStatus) statusString = statusString + "RUNNING"
      if (this.stoppedStatus) statusString = statusString + "STOPPED"
      if(this.dischargeStatus) statusString = statusString + "DISCHARGE"
    }

    console.log(statusString)

    this.vacuumControlService.searchVacuums(
      localStorage.getItem("userMail")!,
      this.vacuumControlSearchParameters.name,
      statusString,
      this.vacuumControlSearchParameters.dateFrom,
      this.vacuumControlSearchParameters.dateTo).subscribe(result => {
      this.vacuumControlList = result
      console.log(this.vacuumControlList)
    })
  }

  scheduleMachine(id: number){

  }

  startVacuumControll(id: number){//todo mozda da se stavi alert ako je dugme suprotstavlja specifikaciji
    console.log("startujemo " + id)
    this.vacuumControlService.startVacuumControl(id).subscribe(result => {
      this.router.navigate(['/vacuums'])
      console.log(result)
    })
  }

  stopVacuumControl(id: number){
    console.log("stoppujemo " + id)
    this.vacuumControlService.stopVacuumControl(id).subscribe(result => {
      this.router.navigate(['/vacuums'])
      console.log(result)
    })
  }

  dischargeVacuumControl(id: number){
    console.log("restartujemo " + id)
    this.vacuumControlService.dischargeVacuumControl(id).subscribe(result => {
      this.router.navigate(['/vacuums'])
      console.log(result)
    })
  }

  removeVacuumControl(id: number){
    console.log("brisemo " + id)
    this.vacuumControlService.removeVacuumControl(id).subscribe(result => {
      this.router.navigate(['/vacuums'])
      console.log(result)
    })
  }

  logOut(): void {
    localStorage.setItem("token", '')
    localStorage.setItem("roles", '')
  }

}
