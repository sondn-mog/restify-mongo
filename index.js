const config = require("./config");
const restify = require("restify");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const server = restify.createServer({
  name: config.name,
  version: config.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.port, () => {
  MongoClient.connect(config.db.uri, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    console.log(
      "%s v%s ready to accept connections on port %s in % eviroment.",
      server.name,
      config.version,
      config.port,
      config.env
    );
    const db = client.db();
    require('./routes')({db, server});
  });
});