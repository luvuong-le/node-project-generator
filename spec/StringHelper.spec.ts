import StringHelper from '../source/Helpers/StringHelper';

describe('String Helper Tests', () => {
    it('should convert to camelcase', async () => {
        expect(StringHelper.uppercaseCamelCase('homeController')).toEqual(
            'HomeController'
        );
    });
});
