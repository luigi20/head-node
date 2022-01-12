import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
    async handle(req: Request, res: Response) {
        const { message } = req.body;
        const { user_id } = req;
        const createMessage = new CreateMessageService();
        try {
            const result = await createMessage.execute(message, user_id);
            return res.json(result);
        } catch (err) {
            return res.status(401).send({ ErrorCode: "Create Message Error" });
        }

    }
}

export { CreateMessageController }