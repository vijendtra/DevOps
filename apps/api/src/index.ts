import { log } from "logger";
import server from "./server";

const port = process.env.PORT || 3001;

server.listen(port, () => {
    log(`Server listening on port ${port}`);
});

