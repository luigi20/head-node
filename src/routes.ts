import { Router } from 'express';
import { AuthenticateUserController } from './Controllers/AuthenticateUserController';
import { CreateMessageController } from './Controllers/CreateMessageController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
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
export { routes };