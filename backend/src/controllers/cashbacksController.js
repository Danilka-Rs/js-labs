const cashbacksService = require("../services/cashbacksService");

const getAllCashbacks = (req, res) => {
    const { title, category } = req.query;
    const cashbacks = cashbacksService.findAll(title, category);

    res.json(cashbacks);
};

const getCashbackById = (req, res) => {
    const id = parseInt(req.params.id);
    const cashback = cashbacksService.findOne(id);

    if (!cashback) {
        return res.status(404).json({
            error: "Кэшбэк-предложение не найдено"
        });
    }

    res.json(cashback);
};

const createCashback = (req, res) => {
    const { title, text, rate, category, image, images } = req.body;

    if (!title || !text || !rate || !category || (!image && !images)) {
        return res.status(400).json({
            error: "Не все поля заполнены"
        });
    }

    const newCashback = cashbacksService.create(req.body);

    res.status(201).json(newCashback);
};

const updateCashback = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCashback = cashbacksService.update(id, req.body);

    if (!updatedCashback) {
        return res.status(404).json({
            error: "Кэшбэк-предложение не найдено"
        });
    }

    res.json(updatedCashback);
};

const deleteCashback = (req, res) => {
    const id = parseInt(req.params.id);
    const success = cashbacksService.remove(id);

    if (!success) {
        return res.status(404).json({
            error: "Кэшбэк-предложение не найдено"
        });
    }

    res.status(204).send();
};

module.exports = {
    getAllCashbacks,
    getCashbackById,
    createCashback,
    updateCashback,
    deleteCashback
};
