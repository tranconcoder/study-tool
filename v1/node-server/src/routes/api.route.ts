import { Router } from "express";

const apiRoute = Router();

apiRoute.get("/test", (req, res) => {
    res.json({
        message: "API route is working!",
    });
});

export default apiRoute;
