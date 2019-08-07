const { graphql } = require('graphql');
const { schema } = require('../app');
const User = require('../models/User');
const mutations = require('../resolvers/User/Mutations');
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
describe('Test User Create', () => {
  beforeEach(async () => await setUpTest());
  it('Should create user', async () => {
      const user = {
        email: "prueba@prueba.com",
        password: "prueba123",
        phone: "55555555",
        name: "prueba",
      }
      const res = await graphql(schema, MUTATION_ADD_USER, null, {}, {
        user
      });
      expect(res.data.createUser).toHaveProperty('_id');
  });
});

/**
 * Creo que ya sé cuál es el problema con los test.
 * Chicos, me corren de mi escuela, la estructura del test es 
 * la que escribí, pero hay algo con las peticiones que 
 * está fallando, mañana empezamos a ver React.
 * Por medía día les mando lo que haremos para instalar para 
 * que así cómo se conecten empezamos a descargarlo y hagamos 
 * el ejercicio y darle aunque sea 20 min a este test ya resuelto 
 * al final de la clase. Ustedes que sí se escuchan ¿qué opinan? 
 */

/**
 * El update ~u~
 */

const MUTATION_UPDATE =`
  mutation UPDATE($data:updateOneUser!){
    updateUser(data:$data){
      email,
      password,
      name 
    }
  }
`

describe('Test User Update', () => {
  beforeEach(async () => await setUpTest());
  it('Should update user data', async () => {
    /**
     * Creamos un nuevo usuario que va a insertarse en la base de datos.
     */
    const mockUser = {
      email: "prueba@prueba1.com",
      password: "prueba123",
      phone: "55555555",
      name: "prueba",
    }

    const user = await User.create(mockUser);
    /*
     * Nos logeamos con el usuario que creamos.
    
    await mutations.login(null,{email:user.email,password:user.password},null,null);
     * En esta parte, es dónde entra el mock de la funcionalidad 
     * que estamos testeando que en esta caso es el update. 
     */
    const data = { email:'otroemail@prueba.com' }
    const res = await graphql(schema, MUTATION_UPDATE, null, {user}, {data});
    /**
     * Luego de mandar a ejecutar nuestra mutacion, accederemos a las propiedades y
     * verificaremos que en efecto el usuario ha sido actualizado.
     */
    expect(res.data.updateUser.email).toBe('otroemail@prueba.com');
    /**
     * Probemoslo.
     */
  });
  /*   it('Should create user with photo', () => {
      
    }); */
});

/*
const res = await graphql(schema, MUTATION_LOGIN, null, {}, {
      email: user.email,
      password: password.email,
    });
*/