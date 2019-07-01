import { QuestionContainer } from './../Types/Question';

export interface IGenerator {
    questions: QuestionContainer;

    getQuestions(): QuestionContainer;
    generate(): void;
    prompt(question: any): void;
    run(): void;
}
