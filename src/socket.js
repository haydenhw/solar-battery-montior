exports.loadConfig = io => {
  io.on('connection', socket => {
    console.log('User connected!');

    socket.on('join_establishment', establishmentId => {
      socket.join(establishmentId);
    });

    socket.on('order-created', ({ establishmentId, order }) => {
      socket.to(establishmentId).emit('order-created', order);
    });

    socket.on('disconnect', onDisconnect);
  });
};

const onDisconnect = () => {
  console.log(`Client disconnected`);
};
