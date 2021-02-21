export interface DBConfig {
  url: string;
  options?: {
    useNewUrlParser?: boolean;
    useCreateIndex?: boolean;
    useUnifiedTopology?: boolean;
    useFindAndModify?: boolean;
    autoIndex?: boolean;
  };
}

export default (): DBConfig => {
  let repl = null;
  if (process.env.instance_database_replicaSet == 'true') {
    repl = {
      name: process.env.instance_database_replicaSet_name,
      enabled: true,
      nodes: [
        {
          host: process.env.mongo_01_host,
          port: process.env.mongo_01_port,
        },
        {
          host: process.env.mongo_02_host,
          port: process.env.mongo_02_port,
        },
      ],
    };
  }

  const host = process.env.mongo_01_host || 'localhost',
    port = process.env.mongo_01_port || 27017,
    database = process.env.instance_database_name || 'test',
    login = process.env.instance_database_user || '',
    password = process.env.instance_database_pwd || '',
    replicaSet = repl || {
      name: 'rs1',
      nodes: [
        {
          host: '127.0.0.1',
          port: 27017,
        },
      ],
      enabled: false,
    };

  let url = 'mongodb://' + host + ':' + port;
  if (login && password) {
    url = 'mongodb://' + login + ':' + password + '@' + host + ':' + port;
  }
  if (replicaSet.enabled) {
    replicaSet.nodes.forEach((node) => {
      url += ',' + node.host + ':' + node.port;
    });
    url += '/' + database + '?replicaSet=' + replicaSet.name;
  } else {
    url += '/' + database;
  }

  return {
    url: url,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
    },
  };
};
