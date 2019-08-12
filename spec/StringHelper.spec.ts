import StringHelper from '../source/Helpers/StringHelper';

describe('String Helper Tests', () => {
    it('should convert to camelcase', () => {
        expect(StringHelper.uppercaseCamelCase('homeController')).toEqual(
            'HomeController'
        );
    });
});
