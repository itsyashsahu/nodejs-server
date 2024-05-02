import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

require("dotenv").config();

import * as middlewares from "./middleware/utils";
import api from "./api";

const app = express();

app.use(express.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

//-------------------------------------

app.use("/api/v1", api);
app.use("/", (req,res)=>{
    return res.json({
        message: "API V1",
      });
});


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
