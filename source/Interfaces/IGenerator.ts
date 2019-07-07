import { PromptResult } from '@modules/Types/PromptResult';
import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { Question } from '@modules/Types/Question';

export interface IGenerator {
    questions: QuestionContainer;

    getQuestions(): QuestionContainer;
    generate(
        option: PromptResult,
        type: string,
        projectName: PromptResult
    ): void;
    prompt(question: Question[]): void;
    run(): void;
}
