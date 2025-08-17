import { connectDB, sequelize } from "./config/db.js";

const startServer = async (app, PORT) => {
  try {
    await connectDB();
    await sequelize.sync(); // ensures tables are created
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

export default startServer;
