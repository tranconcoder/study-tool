import { HOST, PORT } from "./src/configs/env.config";
import app from "./src";
import connectMongoDB from "./dist/configs/db";

let server: any;

Promise.resolve()
    .then(() => connectMongoDB())
    .then(() => {
        server = app.listen(PORT, HOST, async () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("ERROR ON STARTING: " + error);
    });

process.on("SIGINT", async () => {
    console.log("STOPPING: Server is stopping...");

    // Stopping express server
    server.close(() => {
        console.log("STOPPED: Server stopped by user!");
    });

    process.exit(0);
});
