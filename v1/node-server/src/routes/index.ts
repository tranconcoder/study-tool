import { Router } from "express";
import apiRoute from "./api.route";

const rootRoute = Router();

rootRoute.use("/api", apiRoute);

export default rootRoute;
