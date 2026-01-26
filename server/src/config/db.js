import { Sequelize } from "sequelize";

const uri = process.env.DATABASE_URI;
let sequelize;

if (!uri) {
  console.warn("⚠️ No DATABASE_URI found. Skipping DB init...");
} else {
  // Enable SSL for Supabase and any external database
  const isExternalDB = /supabase\.co|render\.com|neon\.tech/i.test(uri);
  sequelize = new Sequelize(uri, {
    dialect: "postgres",
    logging: false,
    ...(isExternalDB && {
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, 
    }),
  });
}

export const connectDB = async () => {
  if (!sequelize) {
    console.warn("⚠️ Sequelize not initialized (no DATABASE_URI).");
    return;
  }
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize.");
  } catch (error) {
    console.error("🔥 Failed to connect to the database:", error.message);
  }
};

export { sequelize };
