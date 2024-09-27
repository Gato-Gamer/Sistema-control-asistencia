import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-mostrar-personal',
  templateUrl: './mostrar-personal.component.html',
  styleUrl: './mostrar-personal.component.scss'
})
export class MostrarPersonalComponent implements OnInit{
  usersList: any[] = [];

  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getPersonal().subscribe(data => {
      this.usersList = data;
    });
  }

}
