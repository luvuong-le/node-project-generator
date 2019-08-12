import lodash from 'lodash';

export default abstract class StringHelper {
    /**
     * @param  {string} text
     * @returns {string}
     */
    public static uppercaseCamelCase(text: string): string {
        let camelCaseText: string = lodash.camelCase(text);
        return `${camelCaseText[0].toUpperCase()}${camelCaseText.slice(1)}`;
    }
}
