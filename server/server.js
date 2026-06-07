import dotenv from "dotenv";

dotenv.config({ path: new URL("./.env", import.meta.url) });

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing. Add it to server/.env before starting the API.");
  process.exit(1);
}

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Fitness Tracker API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
