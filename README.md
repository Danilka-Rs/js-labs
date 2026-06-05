# Лабораторная работа №4: Разработка REST API на Express.js

Потапов Данил

## Содержание

* [Цель работы](#цель-работы)
* [Тема](#тема)
* [Сайт для вдохновения](#сайт-для-вдохновения)
* [Задание](#задание)
* [Стек технологий](#стек-технологий)
* [Структура проекта](#структура-проекта)
* [API Endpoints](#api-endpoints)
* [Реализация дополнительных заданий](#реализация-дополнительных-заданий)
* [1. Фильтрация cashback-предложений](#1-фильтрация-cashback-предложений)
* [2. Настройка CORS для клиента](#2-настройка-cors-для-клиента)
* [3. Генерация уникального ID при создании](#3-генерация-уникального-id-при-создании)
* [План выполнения работы](#план-выполнения-работы)
* [Запуск проекта](#запуск-проекта)
* [Примеры запросов](#примеры-запросов)
* [Вывод](#вывод)

---

## Цель работы

Изучить основы разработки веб-серверов на платформе Node.js с использованием библиотеки Express.js.

Научиться:

* Настраивать базовый HTTP-сервер.
* Реализовывать маршрутизацию.
* Использовать middleware.
* Разделять логику приложения на слои: routes, controllers, services, data.
* Работать с файловой системой для хранения данных.
* Реализовывать REST API с CRUD-операциями.

---

## Тема

Сервис cashback-предложений.

Услуги — cashback-предложения для разных категорий покупок: маркетплейсы, продукты, электроника, одежда, путешествия, образование.

Заявки — добавление и изменение cashback-предложений через REST API.

---

## Сайт для вдохновения

В качестве идеи для предметной области использовались современные cashback-сервисы и банковские приложения с каталогом предложений по категориям.
https://backit.me
---

## Задание

Разработать REST API сервис для управления коллекцией cashback-предложений с использованием фреймворка Express.js.

Приложение должно реализовывать CRUD-операции:

* Create — создание нового cashback-предложения.
* Read — получение списка предложений и получение предложения по ID.
* Update — частичное обновление данных предложения.
* Delete — удаление cashback-предложения.

Данные должны храниться в JSON-файле.

Требуемый функционал API:

* `GET /cashbacks` — получение списка всех cashback-предложений.
* `GET /cashbacks/:id` — получение cashback-предложения по ID.
* `POST /cashbacks` — создание нового cashback-предложения.
* `PATCH /cashbacks/:id` — частичное обновление cashback-предложения.
* `DELETE /cashbacks/:id` — удаление cashback-предложения.

---

## Стек технологий

В работе использовались:

* Node.js
* Express.js
* JavaScript
* JSON
* Nodemon
* CORS
* Postman / браузер для тестирования запросов

---

## Структура проекта

```text
cashback-express/
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── cashbacks.js
│   ├── controllers/
│   │   └── cashbacksController.js
│   ├── services/
│   │   ├── cashbacksService.js
│   │   └── fileService.js
│   └── data/
│       └── cashbacks.json
├── package.json
└── package-lock.json
```

Описание основных папок:

* `routes` — описание маршрутов API.
* `controllers` — обработка HTTP-запросов и HTTP-ответов.
* `services` — бизнес-логика приложения.
* `data` — JSON-файл с данными.
* `index.js` — точка входа приложения.

---

## API Endpoints

| Метод    | Endpoint         | Описание                               |
| -------- | ---------------- | -------------------------------------- |
| `GET`    | `/cashbacks`     | Получить все cashback-предложения      |
| `GET`    | `/cashbacks/:id` | Получить cashback-предложение по ID    |
| `POST`   | `/cashbacks`     | Создать новое cashback-предложение     |
| `PATCH`  | `/cashbacks/:id` | Частично обновить cashback-предложение |
| `DELETE` | `/cashbacks/:id` | Удалить cashback-предложение           |

Также реализована фильтрация через query-параметры:

```text
GET /cashbacks?title=электронику
GET /cashbacks?category=Путешествия
```

---

## Реализация дополнительных заданий

В ходе выполнения лабораторной работы были реализованы дополнительные возможности:

1. Фильтрация cashback-предложений по названию и категории.
2. Настройка CORS для клиента.
3. Автоматическая генерация уникального ID при создании новой карточки.

---

## 1. Фильтрация cashback-предложений

**Задача:**
Реализовать возможность поиска cashback-предложений по частичному совпадению названия и категории через query-параметры.

**Реализация:**
В сервисе `cashbacksService.js` метод `findAll` проверяет наличие параметров `title` и `category`. Если параметры переданы, массив фильтруется без учета регистра.

```javascript
/* src/services/cashbacksService.js */

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
```

В контроллере query-параметры получаются из `req.query`.

```javascript
/* src/controllers/cashbacksController.js */

const getAllCashbacks = (req, res) => {
    const { title, category } = req.query;
    const cashbacks = cashbacksService.findAll(title, category);

    res.json(cashbacks);
};
```

Пример запроса:

```text
GET http://localhost:3000/cashbacks?title=электронику
```

Пример запроса по категории:

```text
GET http://localhost:3000/cashbacks?category=Путешествия
```

---

## 2. Настройка CORS для клиента

**Задача:**
Разрешить запросы к API с других доменов или портов, например от frontend-приложения, запущенного отдельно.

**Реализация:**
Для настройки CORS был установлен пакет `cors`.

```bash
npm install cors
```

После установки пакет был подключен в файле `index.js` как глобальный middleware.

```javascript
/* src/index.js */

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
```

Благодаря этому клиентское приложение может отправлять запросы к backend-серверу без ошибки `Cross-Origin Request Blocked`.

---

## 3. Генерация уникального ID при создании

**Задача:**
Реализовать автоматическое присвоение уникального идентификатора `id` для новых cashback-предложений.

Клиент не должен передавать `id` вручную.

**Реализация:**
В методе `create` вычисляется максимальный существующий ID, после чего новое значение увеличивается на единицу.

```javascript
/* src/services/cashbacksService.js */

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
```

Такой подход позволяет автоматически создавать уникальные идентификаторы для всех новых записей.

---

## План выполнения работы

1. Создать проект Node.js.
2. Установить зависимости `express`, `nodemon`, `cors`.
3. Создать структуру проекта.
4. Создать JSON-файл для хранения cashback-предложений.
5. Реализовать сервис для чтения и записи данных в файл.
6. Реализовать сервис бизнес-логики для cashback-предложений.
7. Реализовать контроллеры для обработки HTTP-запросов.
8. Реализовать маршруты API.
9. Подключить middleware `express.json()` и `cors()`.
10. Протестировать CRUD-операции через Postman или браузер.

---

## Запуск проекта

Установка зависимостей:

```bash
npm install
```

Запуск в режиме разработки:

```bash
npm run dev
```

Обычный запуск:

```bash
npm run start
```

После запуска сервер доступен по адресу:

```text
http://localhost:3000
```

---

## Примеры запросов

### Получение всех cashback-предложений

```http
GET /cashbacks
```

Пример ответа:

```json
[
  {
    "id": 1,
    "title": "Кэшбэк на маркетплейсы",
    "text": "Возвращай часть денег за покупки на крупных маркетплейсах и онлайн-магазинах.",
    "rate": "до 12%",
    "category": "Маркетплейсы",
    "image": "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
  }
]
```

---

### Получение cashback-предложения по ID

```http
GET /cashbacks/3
```

Пример ответа:

```json
{
  "id": 3,
  "title": "Кэшбэк на электронику",
  "text": "Получай выгодный возврат за гаджеты, аксессуары и технику для дома.",
  "rate": "до 15%",
  "category": "Электроника",
  "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
}
```

---

### Создание нового cashback-предложения

```http
POST /cashbacks
Content-Type: application/json
```

Тело запроса:

```json
{
  "title": "Кэшбэк на кафе и рестораны",
  "text": "Оплачивай заказы в кафе и ресторанах и получай часть суммы обратно.",
  "rate": "до 7%",
  "category": "Еда",
  "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
}
```

Пример ответа:

```json
{
  "id": 7,
  "title": "Кэшбэк на кафе и рестораны",
  "text": "Оплачивай заказы в кафе и ресторанах и получай часть суммы обратно.",
  "rate": "до 7%",
  "category": "Еда",
  "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
}
```

---

### Частичное обновление cashback-предложения

```http
PATCH /cashbacks/7
Content-Type: application/json
```

Тело запроса:

```json
{
  "rate": "до 9%",
  "text": "Обновленное предложение: повышенный кэшбэк на кафе и рестораны."
}
```

---

### Удаление cashback-предложения

```http
DELETE /cashbacks/7
```

При успешном удалении сервер возвращает статус:

```text
204 No Content
```

---

## Вывод

В ходе лабораторной работы был разработан REST API сервис на Express.js для управления cashback-предложениями.

Были реализованы основные CRUD-операции:

* получение списка cashback-предложений;
* получение предложения по ID;
* создание нового предложения;
* частичное обновление предложения;
* удаление предложения.

Данные хранятся в JSON-файле. Логика приложения разделена на маршруты, контроллеры и сервисы. Также были реализованы дополнительные задания: фильтрация по названию и категории, настройка CORS и автоматическая генерация уникального ID.
