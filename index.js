import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import axios from "axios";
import { promisify } from "util";
const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory cache to store processed orders
const orderCache = new Map();

// Mock function to simulate processing order asynchronously
async function processOrder(orderId) {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Simulate retrieving order details from XML file
    const orderDetails = await parseXml(orderId);

    // Simulate creating order in ERP system
    await createOrderInErp(orderDetails);

    // Save processed order to cache
    orderCache.set(orderId, orderDetails);
}

// Mock function to simulate parsing XML file
async function parseXml(orderId) {
    // Simulate reading XML file from SFTP
    const files = await readdirAsync("sftp_folder");
    const xmlFile = files.find((file) => file.includes(`order_${orderId}`));
    const xmlData = await readFileAsync(`sftp_folder/${xmlFile}`, "utf8");

    // Simulate parsing XML data to extract order details
    return `Order details for order ${orderId}`;
}

// Mock function to simulate creating order in ERP system
async function createOrderInErp(orderDetails) {
    // Simulate calling ERP API
    await axios.post("http://erp-api.com/orders", { orderDetails });
}

// Webhook endpoint to receive notifications from ToyUniverse
app.post("/webhook", async (req, res) => {
    const { orderId } = req.body;

    // Check if order ID is already processed
    if (orderCache.has(orderId)) {
        return res.status(200).send("Order already processed");
    }

    try {
        // Process order asynchronously
        await processOrder(orderId);
        return res.status(200).send("Order processed successfully");
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).send("Internal server error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
