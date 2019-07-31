import FileHelper from '../source/Helpers/FileHelper';

describe('File Helper Tests', () => {
    it('should correct filename', async () => {
        expect(FileHelper.getFileName('code', 'Controller')).toEqual(
            'Controller.js'
        );
    });
});
