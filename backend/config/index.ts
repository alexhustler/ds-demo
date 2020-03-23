import fs from "fs";

const { env } = process;

const rdsCa = fs.readFileSync(__dirname + "/rds-ca-2019-root.pem");

let dialectOptions = {};
if (env.DB_SSL_ENABLED === "true") {
  dialectOptions = {
    ssl: {
      rejectUnauthorized: true,
      ca: [rdsCa],
    },
  };
}

export default Object.freeze({
  nodeEnv: env.NODE_ENV || "",
  aws: {
    accessKeyId: env.AWS_ACCESS_KEY_ID || "",
    s3BucketName: env.AWS_S3_BUCKET_NAME || "",
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || "",
  },
  logLevel: env.LOG_LEVEL || "debug",
  db: {
    database: env.DB_DATABASE || "demo-dev",
    username: env.DB_USERNAME || "root",
    password: env.DB_SECRET || "secret",
    port: parseInt(env.DB_PORT, 10) || 3310,
    host: env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 50,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions,
    ssl: true,
    logging: false,
    returning: false,
  },
  server: {
    port: process.env.PORT || 3001,
    rootPublicDomain:
      "https://dev-app.demo.com" || process.env.SERVER_ROOT_PUBLIC_DOMAIN,
    sessionSecret:
      process.env.SESSION_SECRET || "*U*UffuuAj38fooqndydnnn3JJPP0ajwnnb3AIIH",
  },
});
