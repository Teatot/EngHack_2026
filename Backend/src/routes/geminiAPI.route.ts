import "dotenv/config";
import { sendRequest} from "../helper/utils/aiHandler.js";
import { Data } from "../types/gemini_interfaces.js";
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

// Endpoint to handle POST requests to the Gemini API, receiving a question and file in the request body, sending it to the Gemini API using the sendRequest function, and returning the structured response or an error message if the request fails
router.post("/", async (req, res) => {
    try {
        const body = req.body as Data;
        const result = await sendRequest(body);
        res.json({ result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to use Gemini API" });
    }
});

export default router;
