import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../interfaces/aluno.interface';
import { AlunoForm } from '../interfaces/aluno-form.interface';

/**
 * Página responsável pelo cadastro e gerenciamento de alunos.
 *
 * @remarks
 * Esta página foi migrada de `HomePage` para isolar a responsabilidade
 * de cadastro de alunos em um módulo dedicado, seguindo o princípio
 * de responsabilidade única (SRP).
 *
 * Rota: `/cadastro-usuario`
 */
@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
  standalone: false,
})
export class CadastroUsuarioPage implements OnInit {

  /**
   * Estado atual do formulário de cadastro.
   * Utiliza `AlunoForm` para permitir campos anuláveis antes da submissão.
   */
  form: AlunoForm = {
    nome: '',
    idade: null,
    curso: '',
  };

  /**
   * Lista de alunos cadastrados durante a sessão.
   * Em uma aplicação real, esta lista seria persistida via service/API.
   */
  alunos: Aluno[] = [];

  /**
   * @param router - Serviço de roteamento Angular para navegação programática.
   */
  constructor(private readonly router: Router) { }

  ngOnInit(): void { }

  /**
   * Valida os campos do formulário e cadastra um novo aluno.
   *
   * @remarks
   * Realiza guard clause para impedir cadastro com campos incompletos.
   * Após o cadastro, reinicia o estado do formulário para os valores padrão.
   */
  cadastrarAluno(): void {
    if (!this.form.nome || this.form.idade === null || !this.form.curso) return;

    const novoAluno: Aluno = {
      nome: this.form.nome,
      /** TypeScript narrows `form.idade` to `number` after the `=== null` guard above. */
      idade: this.form.idade,
      curso: this.form.curso,
      faltas: 0,
    };

    this.alunos.push(novoAluno);
    this.resetForm();
  }

  /**
   * Retorna a cor semântica do Ionic baseada na quantidade de faltas do aluno.
   *
   * @param aluno - O aluno a ser avaliado.
   * @returns `'danger'` se ≥ 10 faltas, `'warning'` se ≥ 5, `'success'` caso contrário.
   */
  getAlunoColor(aluno: Aluno): string {
    if (aluno.faltas >= 10) return 'danger';
    if (aluno.faltas >= 5) return 'warning';
    return 'success';
  }

  /**
   * Retorna uma mensagem personalizada para alunos específicos.
   *
   * @param aluno - O aluno a ser avaliado.
   * @returns String com a mensagem ou string vazia se não houver mensagem especial.
   */
  getAlunoMensagem(aluno: Aluno): string {
    if (aluno.nome === 'Matheus') return 'Caralho é um aluno muito homossexual e coda fraco';
    if (aluno.nome === 'Paulo') return 'Paulo é um aluno muito foda, o Mago do ASP.Net';
    return '';
  }

  /**
   * Incrementa o contador de faltas de um aluno em 1.
   *
   * @param aluno - O aluno que receberá a falta.
   */
  addFalta(aluno: Aluno): void {
    aluno.faltas++;
  }

  /**
   * Decrementa o contador de faltas de um aluno em 1.
   * O valor mínimo é 0 — nunca resulta em faltas negativas.
   *
   * @param aluno - O aluno que terá a falta removida.
   */
  removerFalta(aluno: Aluno): void {
    if (aluno.faltas > 0) {
      aluno.faltas--;
    }
  }

  /**
   * Remove um aluno da lista pelo seu índice.
   *
   * @param index - Índice do aluno no array `alunos`.
   */
  removerAluno(index: number): void {
    this.alunos.splice(index, 1);
  }

  /**
   * Navega de volta para a página inicial.
   */
  voltarParaHome(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Reinicia o estado do formulário para os valores iniciais (vazio/null).
   */
  private resetForm(): void {
    this.form = {
      nome: '',
      idade: null,
      curso: '',
    };
  }
}
