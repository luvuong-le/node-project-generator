import Options from '@modules/Enums/Options';
import { PromptResult } from '@modules/Types/PromptResult';
import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { Question } from '@modules/Types/Question';
import { ConfigResult } from '@modules/Types/ConfigResult';

export interface IGenerator {
    questions: QuestionContainer;

    getQuestions(): QuestionContainer;
    generate(option: PromptResult, type: Options, config: ConfigResult): void;
    prompt(question: Question[]): void;
    run(): void;
}
