import express from "express";
import numbersRoutes from "./routes/numbers-routes.js";
import usersRoutes from "./routes/users-routes.js";
import salesRoutes from "./routes/sales-routes.js";
import errorHandler from "./handler/error-handler.js";
import { connectToDatabase } from "./util/db.js";

await connectToDatabase();

const app = express();
app.use(express.json());

app.use("/api/numbers", numbersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/sales", salesRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running at ", `http://localhost:5000`);
});
