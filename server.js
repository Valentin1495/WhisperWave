import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000; // Use PORT environment variable or default to 3000
const app = next({ dev });
const handler = app.getRequestHandler();
const db = globalThis.prisma ?? new PrismaClient();
if (dev) globalThis.prisma = db;

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    socket.on('sendMessage', async (data) => {
      const { newMessage, fileUrl, channelId, currentMemberId } = data;

      try {
        const message = await db.message.create({
          data: {
            content: newMessage,
            fileUrl,
            channelId,
            memberId: currentMemberId,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        });

        io.emit('newMessage', message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('editMessage', async (data) => {
      const { messageId, channelId, editedMessage } = data;

      try {
        const message = await db.message.update({
          where: {
            id: messageId,
            channelId,
          },
          data: {
            content: editedMessage,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        });

        io.emit('editedMessage', message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('deleteMessage', async (data) => {
      const { messageId, channelId } = data;

      try {
        const message = await db.message.delete({
          where: {
            id: messageId,
            channelId,
          },
          include: {
            member: {
              include: {
                profile: true,
              },
            },
          },
        });

        io.emit('deletedMessage', message);
      } catch (error) {
        console.error(error);
      }
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
