import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Página inicial da aplicação.
 *
 * @remarks
 * Após a migração, a `HomePage` tem foco exclusivo em boas-vindas e navegação.
 * O cadastro e gerenciamento de alunos foram movidos para `CadastroUsuarioPage`
 * (rota: `/cadastro-usuario`), seguindo o princípio de responsabilidade única (SRP).
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  /**
   * @param router - Serviço de roteamento Angular para navegação programática.
   */
  constructor(private readonly router: Router) { }

  /**
   * Navega para a página de cadastro de alunos.
   */
  irParaCadastro(): void {
    this.router.navigate(['/cadastro-usuario']);
  }
}
