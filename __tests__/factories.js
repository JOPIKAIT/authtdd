const { factory } = require('factory-girl');
const {User} = require('../src/app/models');

factory.define('User', User, {
    name: 'Lukau',
    lastname: 'Garcia',
    email: 'lukaugarcia@akira.ao',
    password: '123456'
})

module.exports = factory;
