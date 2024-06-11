import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000; // Use PORT environment variable or default to 3000

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  httpServer.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });
});
