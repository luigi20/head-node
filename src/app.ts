import express from "express";
import 'dotenv/config';
import { routes } from './routes';
import http from "http";
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
app.use(cors());
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    }
});
io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`);
});
app.use(express.json());
app.use(routes);

export { serverHttp, io }