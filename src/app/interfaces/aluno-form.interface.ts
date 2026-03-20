/**
 * Representa o estado transitório do formulário de cadastro de um Aluno.
 *
 * @remarks
 * Separa o modelo de formulário (com campos anuláveis antes da submissão)
 * do modelo de domínio {@link Aluno}, seguindo o princípio de
 * separação de responsabilidades (SRP).
 *
 * Antes de persistir, os valores devem ser validados e convertidos
 * para o tipo {@link Aluno}.
 */
export interface AlunoForm {
    /** Nome do aluno digitado no campo de texto. Inicia como string vazia. */
    nome: string;

    /**
     * Idade digitada pelo usuário.
     * É `null` quando o campo ainda não foi preenchido,
     * garantindo que o formulário não submeta `0` acidentalmente.
     */
    idade: number | null;

    /** Curso digitado no campo de texto. Inicia como string vazia. */
    curso: string;
}
