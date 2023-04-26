const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should encript user password', async () => {
        const user = await User.create({
            name: 'Lukau', 
            lastname: 'Garcia',
            email: 'lukaugarcia@teste.com',
            password: '123123'
        });

        const hash = await bcrypt.hash('123123', 8);
        // expect(user.password_hash).toBe(hash);
        const compareHash = await bcrypt.compare('123123', user.password_hash);
        expect(compareHash).toBe(true);        
    })
})
