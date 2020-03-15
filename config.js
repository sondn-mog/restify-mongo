module.exports = {
  name: "rest-api",
  version: "1.0.1",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db: {
    uri: "mongodb://localhost:27017/test"
  }
};
