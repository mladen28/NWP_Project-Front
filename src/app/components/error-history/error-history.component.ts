import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ErrorMessage} from "../../models";
import {VacuumControlService} from "../../services/vacuumControl.service";

@Component({
  selector: 'app-error-history',
  templateUrl: './error-history.component.html',
  styleUrls: ['./error-history.component.css']
})
export class ErrorHistoryComponent  implements OnInit{

  router: Router
  errorMessageList: ErrorMessage[]
  userMail = ''

  constructor(private vacuumControlService: VacuumControlService, router: Router) {
    this.router = router
    this.errorMessageList = []
  }

  ngOnInit(): void {
    this.userMail = localStorage.getItem("userMail")!
    this.getAllErrorMessagesByUser(this.userMail!)

  }

  getAllErrorMessagesByUser(mail: string){
    this.vacuumControlService.getErrorMessagesForUser(mail).subscribe(result => {
      this.errorMessageList = result
    })
  }


}
