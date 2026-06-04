const express = require("express");
const cors = require("cors");
const path = require("path");

const cashbacksRouter = require("./routes/cashbacks");
const cashbacksService = require("./services/cashbacksService");

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, "data/cashbacks.json");

cashbacksService.init(DATA_FILE_PATH);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.json({
        message: "Cashback API работает",
        endpoints: {
            getAll: "GET /cashbacks",
            getById: "GET /cashbacks/:id",
            searchByTitle: "GET /cashbacks?title=электронику",
            searchByCategory: "GET /cashbacks?category=Путешествия",
            create: "POST /cashbacks",
            update: "PATCH /cashbacks/:id",
            delete: "DELETE /cashbacks/:id"
        }
    });
});

app.use("/cashbacks", cashbacksRouter);

app.use((req, res) => {
    res.status(404).json({
        error: "Маршрут не найден"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Внутренняя ошибка сервера"
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
