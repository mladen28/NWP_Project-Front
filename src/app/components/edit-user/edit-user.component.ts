import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role, User} from "../../models";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  updateForm: FormGroup
  userInfo: User
  readRole: boolean
  createRole: boolean
  updateRole: boolean
  deleteRole: boolean

  searchRole: boolean
  startRole: boolean
  stopRole: boolean
  dischargeRole: boolean
  addVacuumControlRole: boolean
  removeRole: boolean
  scheduleRole: boolean

  serverRoles: Role[]
  userRoles: Role[]

  // serverRolesMap = new Map()


  constructor(private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mail: ['', [Validators.required]]
    })
    this.userInfo = {
      id: 0,
      name: '',
      lastName: '',
      mail: '',
      roles: []
    }
    this.serverRoles = []
    this.userRoles = []

    this.readRole = false
    this.createRole = false
    this.updateRole = false
    this.deleteRole = false
    this.searchRole = false
    this.startRole = false
    this.stopRole = false
    this.dischargeRole = false
    this.addVacuumControlRole = false
    this.removeRole = false
    this.scheduleRole = false
  }

  ngOnInit(): void {
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.userInfo.id = id
    this.getServerRoles()
    this.getUser(id)
  }

  getUser(id: number): void{
    this.userService.getUser(id).subscribe(result => {

      this.userInfo.name = result.name
      this.userInfo.lastName = result.lastName
      this.userInfo.mail = result.mail
      this.userRoles = result.roles

      result.roles.forEach(element => {
        if(element.name.includes("can_read_users")) this.readRole = true
        if(element.name.includes("can_create_users")) this.createRole = true
        if(element.name.includes("can_update_users")) this.updateRole = true
        if(element.name.includes("can_delete_users")) this.deleteRole = true

        if(element.name.includes("can_search_vacuums")) this.searchRole = true
        if(element.name.includes("can_start_vacuums")) this.startRole = true
        if(element.name.includes("can_stop_vacuums")) this.stopRole = true
        if(element.name.includes("can_discharge_vacuums")) this.dischargeRole = true
        if(element.name.includes("can_add_vacuums")) this.addVacuumControlRole = true
        if(element.name.includes("can_remove_vacuums")) this.removeRole = true
        if(element.name.includes("can_schedule_vacuums")) this.scheduleRole = true
      });

    })
  }

  updateUser(): void{
    if (this.readRole) this.addRoles('can_read_users')
    if (this.createRole) this.addRoles('can_create_users')
    if (this.updateRole) this.addRoles('can_update_users')
    if (this.deleteRole) this.addRoles('can_delete_users')

    if (this.searchRole) this.addRoles('can_search_vacuums')
    if (this.startRole) this.addRoles('can_start_vacuums')
    if (this.stopRole) this.addRoles('can_stop_vacuums')
    if (this.dischargeRole) this.addRoles('can_discharge_vacuums')
    if (this.addVacuumControlRole) this.addRoles('can_add_vacuums')
    if (this.removeRole) this.addRoles('can_remove_vacuums')
    if (this.scheduleRole) this.addRoles('can_schedule_vacuums')

    this.userService.updateUser(this.userInfo).subscribe(result => {
      console.log(result)
    })

    this.userInfo.roles = []
  }

  addRoles(name: string): void{
    this.serverRoles.forEach(role => {
      if (role.name.includes(name)){
        this.userInfo.roles.push(role)
      }
    })
  }

  getServerRoles(): void{
    this.userService.getRoles().subscribe(result => {
      this.serverRoles = result
      // result.forEach(role => {this.serverRolesMap.set(role.name, role.id)})
    })
  }

}
