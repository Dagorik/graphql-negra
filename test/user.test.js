const { graphql } = require('graphql');
const { schema } = require('../app');
const User = require('../models/User');
//CONFIGURACIÓN DE DATOS
const setUpTest = require('./helpers');

const MUTATION_ADD_USER = `
  mutation add_user($user:createUser!){
    createUser(user:$user){
      _id,
      email,
      password,
      phone,
      name
    }
  }
  `
describe('Test User Mutation', () =>{
  beforeEach(async () => await setUpTest());

  it('Should create user', () => {
    const makeTest = async () => {
      const user = {
        email: "prueba@prueba.com",
        password: "prueba123",
        phone: "55555555",
        name: "prueba", 
      }
      const res = await graphql(schema, MUTATION_ADD_USER, null, {}, { user });
      expect(res.user.createUser).toHaveProperty('_id');
    }
    makeTest();
  });

/*   it('Should create user with photo', () => {
    
  }); */
});