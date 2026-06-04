const fileService = require("./fileService");

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title, category) => {
    let cashbacks = fileService.readData(dataFilePath);

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
    const cashbacks = fileService.readData(dataFilePath);
    return cashbacks.find((item) => item.id === id);
};

const create = (cashbackData) => {
    const cashbacks = fileService.readData(dataFilePath);

    const newId = cashbacks.length > 0
        ? Math.max(...cashbacks.map((item) => item.id)) + 1
        : 1;

    const newCashback = {
        id: newId,
        ...cashbackData
    };

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

    cashbacks[index] = {
        ...cashbacks[index],
        ...cashbackData,
        id
    };

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