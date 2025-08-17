import { Sequelize } from "sequelize";

const uri = process.env.DATABASE_URI;
let sequelize;

if (!uri) {
  console.warn("⚠️ No DATABASE_URI found. Skipping DB init...");
} else {
  // Heuristic: if you're hitting *.render.com externally, require SSL.
  const needsSSL = /render\.com/i.test(uri); // matches External URL host
  sequelize = new Sequelize(uri, {
    dialect: "postgres",
    logging: false,
    ...(needsSSL && {
      dialectOptions: { ssl: { require: true } }, // add rejectUnauthorized:false only if you hit cert issues
    }),
  });
}

export const connectDB = async () => {
  if (!sequelize) {
    console.warn("⚠️ Sequelize not initialized (no DATABASE_URI).");
    return;
  }
  await sequelize.authenticate();
  console.log("✅ PostgreSQL connected via Sequelize.");
};

export { sequelize };
