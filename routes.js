module.exports = function(ctx) {
  const db = ctx.db;
  server = ctx.server;

  const todosCollection = db.collection("todos");

  server.post("/todos", (req, res, next) => {
    const data = Object.assign({}, req.body, {
      created: new Date(),
      updated: new Date()
    });
    todosCollection
      .insertOne(data)
      .then(doc => res.send(200, doc.ops[0]))
      .catch(err => res.send(500, err));
    next();
  });

  server.get("/todos", (req, res, next) => {
    let limit = parseInt(req.query.lint, 10) || 10,
      skip = parseInt(req.query.lint, 10) || 0,
      query = req.query || {};
    delete query.skip;
    delete query.limit;

    todosCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray()
      .then(docs => res.send(200, docs))
      .catch(err => res.send(200, err));
    next();
  });
};
