import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('loginModal', { static: true }) loginModal: any;
  pagePlanning: boolean = false;
  userLogin: string = '';
  userPassword: string = '';

  public readonly loginPrimaryAction: PoModalAction = {
    action: () => {
      this.confirmAction();
    },
    label: 'Entrar',
  };

  constructor(private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.loginModal.open();
  }

  private cleanForm() {
    this.userLogin = '';
    this.userPassword = '';
  }

  private confirmAction() {
    if (this.userLogin == 'admin' && this.userPassword == '1234') {
      this.pagePlanning = true;
      this.loginModal.close();
      this.cleanForm();
      this.poNotification.success("Login realizado com sucesso! Bem vindo, Administrador!");
    } else {
      this.poNotification.error("Usuário ou senha inválido!");
    }
  }
}
