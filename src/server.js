require('dotenv').config();
const Hapi = require('@hapi/hapi');

// albums - submission 1
const albums = require('./api/albums');
const AlbumsServices = require('./services/postgres/AlbumsServices');
const AlbumsValidator = require('./validator/albums');

// songs - submission 1
const songs = require('./api/songs');
const SongsServices = require('./services/postgres/SongsServices');
const SongsValidator = require('./validator/songs');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: songs,
      options: {
        service: new SongsServices(),
        validator: SongsValidator,
      },
    },
    {
      plugin: albums,
      options: {
        service: new AlbumsServices(),
        validator: AlbumsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
