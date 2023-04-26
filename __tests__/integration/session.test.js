const request = require('supertest');

const app = require('../../src/app');
// const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should authenticate with valid credentials', async () => {

        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })
        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })
        expect(response.status).toBe(401);
    })

    it('should return jwt token authenticated', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })
        expect(response.body).toHaveProperty('token');
    })

    it('shoul be able to acess private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .get("/dashboard")
            .set('authorizatio', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    })

    it('should not be able to acess private routes when not authenticated', async () => {
        
        const response = await request(app)
            .get("/dashboard");
        expect(response.status).toBe(401);
    })
});