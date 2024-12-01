require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}`;
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://your-webapp-url.com';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Telegram webhook
app.post(`/webhook/${TOKEN}`, async (req, res) => {
  try {
    const { message } = req.body;

    if (message && message.text === "/menu") {
      const chatId = message.chat.id;

      const data = {
        chat_id: chatId,
        text: "Нажмите на кнопку ниже, чтобы открыть приложение:",
        reply_markup: {
          inline_keyboard: [[{ text: "Открыть приложение", web_app: { url: WEB_APP_URL } }]],
        },
      };

      await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Ошибка при обработке вебхука:", error);
    res.sendStatus(500);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
