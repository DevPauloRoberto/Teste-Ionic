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

  /** Gradientes para os avatares de alunos. */
  private readonly avatarGradients = [
    'linear-gradient(135deg, #6C5CE7, #a29bfe)',
    'linear-gradient(135deg, #00CEC9, #81ecec)',
    'linear-gradient(135deg, #fd79a8, #fab1a0)',
    'linear-gradient(135deg, #e17055, #fdcb6e)',
    'linear-gradient(135deg, #00b894, #55efc4)',
    'linear-gradient(135deg, #0984e3, #74b9ff)',
  ];

  /**
   * Retorna um gradiente para o avatar baseado no índice do aluno.
   */
  getAvatarGradient(index: number): string {
    return this.avatarGradients[index % this.avatarGradients.length];
  }

  /**
   * Retorna a porcentagem de faltas para a barra de progresso (máx 15).
   */
  getFaltasPercent(aluno: Aluno): number {
    return Math.min((aluno.faltas / 15) * 100, 100);
  }

  /**
   * Retorna a classe CSS de status baseada na quantidade de faltas.
   */
  getStatusClass(aluno: Aluno): string {
    if (aluno.faltas >= 10) return 'status-badge danger';
    if (aluno.faltas >= 5) return 'status-badge warn';
    return 'status-badge ok';
  }

  /**
   * Retorna o label de status baseado na quantidade de faltas.
   */
  getStatusLabel(aluno: Aluno): string {
    if (aluno.faltas >= 10) return 'Crítico';
    if (aluno.faltas >= 5) return 'Atenção';
    return 'Regular';
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
