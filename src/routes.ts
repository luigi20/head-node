import { Router } from 'express';
import { AuthenticateUserController } from './Controllers/AuthenticateUserController';
import { CreateMessageController } from './Controllers/CreateMessageController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { GetLast3MessageController } from './Controllers/GetLast3MessageController';
import { ProfileUserController } from './Controllers/ProfileUserController';
const routes = Router();

routes.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

routes.get('/signin/callback', (req, res) => {
    const { code } = req.query;
    return res.json(code);
})

routes.post('/authenticate', new AuthenticateUserController().handle);
routes.post('/message', ensureAuthenticated, new CreateMessageController().handle);
routes.get('/messages/last3', new GetLast3MessageController().handle);
routes.get('/profile', ensureAuthenticated, new ProfileUserController().handle);
export { routes };