const fileService = require("./fileService");

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const normalizeCashback = (cashback) => {
    const images = Array.isArray(cashback.images) && cashback.images.length > 0
        ? cashback.images
        : cashback.image
            ? [cashback.image]
            : [];

    return {
        ...cashback,
        image: cashback.image || images[0] || "",
        images,
        detailText: cashback.detailText || cashback.text,
        popoverTitle: cashback.popoverTitle || "Информация",
        popoverText: cashback.popoverText || "Подробная информация о cashback-предложении."
    };
};

const findAll = (title, category) => {
    let cashbacks = fileService.readData(dataFilePath).map(normalizeCashback);

    if (title) {
        cashbacks = cashbacks.filter((item) =>
            item.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (category) {
        cashbacks = cashbacks.filter((item) =>
            item.category.toLowerCase().includes(category.toLowerCase())
        );
    }

    return cashbacks;
};

const findOne = (id) => {
    const cashbacks = fileService.readData(dataFilePath).map(normalizeCashback);
    return cashbacks.find((item) => item.id === id);
};

const create = (cashbackData) => {
    const cashbacks = fileService.readData(dataFilePath);

    const newId = cashbacks.length > 0
        ? Math.max(...cashbacks.map((item) => item.id)) + 1
        : 1;

    const newCashback = normalizeCashback({
        id: newId,
        ...cashbackData
    });

    cashbacks.push(newCashback);
    fileService.writeData(dataFilePath, cashbacks);

    return newCashback;
};

const update = (id, cashbackData) => {
    const cashbacks = fileService.readData(dataFilePath);
    const index = cashbacks.findIndex((item) => item.id === id);

    if (index === -1) {
        return null;
    }

    cashbacks[index] = normalizeCashback({
        ...cashbacks[index],
        ...cashbackData,
        id
    });

    fileService.writeData(dataFilePath, cashbacks);

    return cashbacks[index];
};

const remove = (id) => {
    const cashbacks = fileService.readData(dataFilePath);
    const filteredCashbacks = cashbacks.filter((item) => item.id !== id);

    if (filteredCashbacks.length === cashbacks.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredCashbacks);
    return true;
};

module.exports = {
    init,
    findAll,
    findOne,
    create,
    update,
    remove
};
