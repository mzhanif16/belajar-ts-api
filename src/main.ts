import {web} from "./application/web";
import {logger} from "./application/logging";

web.listen(3000, ()=> {
    logger.info("Server started on port 3000.");
})