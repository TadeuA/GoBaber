import {Router} from 'express';

import {getCustomRepository} from 'typeorm';

import AuthenticateUserService from '../services/AuthenticateUserService';
import userView from "../views/User"


const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) =>{


  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })


  return response.json([ userView.render(user), token ]);

})

export default sessionsRouter;
