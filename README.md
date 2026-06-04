# ЛР №5. Добаление AJAX запросов к API.

Потапов Данил ИУ5-44Б


## Содержание

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Дополнительные задание](#задания)
- [API](#1-Работа-с-API.)
- [Урлы](#2-Работа-с-урлами.)
- [Генерация уникального ID](#3-генерация-уникального-id-при-создании)


## **Цель** данной лабораторной работы - взаимодействие с внешним API через XMLHttpRequest. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого взаимодействия с внешним API, получение данных и вывод их в интерфейс пользователя, и затем выполнить задания по варианту.

## **Тема:** История живописи. Услуги — картины художников. Заявки — заявки на экспертизу для определения авторства картины.

## **Сайт** для вдохновения: https://rusmuseumvrm.ru/collections/painting/index.php

## **Дополнительные задания**

Для работы будем использовать инструменты из предыдущих лабораторной работы: [VS Code](https://code.visualstudio.com/) + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).


### 1. Работа с API.

Перед началом работы с API разберемся с тем, как мы это будем делать в нашем проекте.
Первое с чего стоит начать - создадим еще один слой, где будем держать все методы работы с API.

Сейчас структура проекта выглядит так

```bash
├── pages
├── components
├── index.html
├── main.js
```

Добавим еще один слой `modules`

```bash
├── pages
├── components
├── modules
├── index.html
├── main.js
```
Мы будем работать с API через XHR. Для удобства создадим класс, в котором опишем методы для работы с API.

-   Создаем файл `modules/ajax.js`

```js
class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    delete(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {XMLHttpRequest} xhr - Объект запроса
     * @param {function} callback - Функция обратного вызова
     */
    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();
```

У нас есть готовый класс, через который мы можем выполнять запросы. Тут уже происходит вся нужная обработка и формирование JSON объекта из данных и вызов коллбека.

```js
import { ajax } from './ajax.js';

// GET пример
api.get('https://api.example.com/data', (data, status) => {
    console.log(status, data);
});

// POST пример
api.post('https://api.example.com/create', { name: 'John' }, (data, status) => {
    console.log(status, data);
});

// PATCH пример
api.patch(
    'https://api.example.com/update/1',
    { name: 'Updated' },
    (data, status) => {
        console.log(status, data);
    }
);

// DELETE пример
api.delete('https://api.example.com/delete/1', (data, status) => {
    console.log(status, data);
});
```

### 2. Работа с урлами.

Для работы нам понадобятся эндпоинты API, разработанные в предыдущей ЛР. Запустим сервер с помощью `npm run start` и убедимся, что он заработал и готов слушать запросы. Сервер запустится и будет доступен по адресу `http://localhost:3000`.

![Start server](assets/start-server.png)

Объявим нужные эндпоинты для карточек в отдельном файле, чтобы можно было переиспользовать в нескольких местах сразу и в случае чего, поменять базовый URL.

Базовый URL - `http://localhost:3000`, каждый запрос будет за карточками выполняться по `/stocks`.

-   Создаем файл `modules/stockUrls.js`

```js
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById() {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
```

Теперь, если нам нужно получить урл, то просто импортируем файл и получаем нужный нам урл.

```js
import { stockUrls } from './stockUrls.js';

stockUrls.getStocks();
```
