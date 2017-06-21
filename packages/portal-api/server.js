'use strict';

const Brule = require('brule');
const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Toppsy = require('toppsy');
const Vision = require('vision');
const Pack = require('./package');
const Portal = require('./lib');

const server = new Hapi.Server();
server.connection({
  port: 3000,
  routes: {
    cors: true
  }
});

const swaggerOptions = {
  info: {
    'title': 'Portal API Documentation',
    'version': Pack.version
  }
};

const portalOptions = {
  data: {
    db: {
      host: process.env.RETHINK_HOST || 'localhost'
    }
  }
};

server.register([
  Brule,
  Inert,
  Vision,
  {
    register: Portal,
    options: portalOptions
  },
  {
    register: HapiSwagger,
    options: swaggerOptions
  },
  {
    register: Toppsy,
    options: { namespace: 'portal', subsystem: 'api' }
  }
],
  (err) => {
    handlerError(err);
    server.start((err) => {
      handlerError(err);
      console.log(`server started at http://localhost:${server.info.port}`);
    });
  }
);

function handlerError (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
}