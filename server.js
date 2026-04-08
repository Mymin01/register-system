const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const WEBHOOK = "https://discord.com/api/webhooks/1491276649453588510/xqTVu8FZbMhnPFMK7YjmIInEjVVFiXBgiz22Irdg1bd2KQkXf4oYfVHLe75oye31slf_";

app.post("/submit", async (req, res) => {
    const data = req.body;

    let oldData = [];
    if (fs.existsSync("data.json")) {
        oldData = JSON.parse(fs.readFileSync("data.json"));
    }

    oldData.push(data);
    fs.writeFileSync("data.json", JSON.stringify(oldData, null, 2));

    await axios.post(WEBHOOK, {
        content: `📋 สมัครใหม่\n👤 ${data.name}\n🎂 ${data.age}\n💬 ${data.reason}`
    });

    res.send({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
