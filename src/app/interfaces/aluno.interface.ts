/**
 * Representa o modelo de domínio de um Aluno no sistema.
 *
 * @remarks
 * Esta interface define a estrutura de dados canônica de um aluno,
 * utilizada para armazenamento em estado, exibição em listas e
 * transmissão entre componentes.
 */
export interface Aluno {
    /** Nome completo do aluno. */
    nome: string;

    /** Idade do aluno em anos completos. */
    idade: number;

    /** Nome do curso em que o aluno está matriculado. */
    curso: string;

    /** Contador de faltas do aluno no período. Nunca deve ser negativo. */
    faltas: number;
}
