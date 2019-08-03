import Options from '@modules/Enums/Options';
import { PromptResult } from '@modules/Types/PromptResult';
import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { Question } from '@modules/Types/Question';

export interface IGenerator {
    questions: QuestionContainer;

    getQuestions(): QuestionContainer;
    generate(promptResult: PromptResult, generatorTYpe: Options): void;
    prompt(question: Question[]): void;
    run(): void;
}
