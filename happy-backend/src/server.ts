import express from "express";
import path from "path";
import routes from "./routes";
import "express-async-errors";
import cors from "cors";

import "./database/connection";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(1717);
