`mongodb://${MongoDBConfig.host}:${MongoDBConfig.port}`,
{
  dbName: MongoDBConfig.database,
  pass: MongoDBConfig.password,
  user: MongoDBConfig.username,
},