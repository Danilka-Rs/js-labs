# ЛР №5. Добавление AJAX-запросов к API

Потапов Данил

## Содержание

* [Цель работы](#цель-работы)
* [Тема](#тема)
* [Сайт для вдохновения](#сайт-для-вдохновения)
* [Описание проекта](#описание-проекта)
* [Структура проекта](#структура-проекта)
* [Работа с API](#1-работа-с-api)
* [Работа с URL](#2-работа-с-url)
* [Получение данных на главной странице](#3-получение-данных-на-главной-странице)
* [Получение одной карточки](#4-получение-одной-карточки)
* [Удаление карточки через API](#5-удаление-карточки-через-api)
* [Генерация уникального ID при создании](#6-генерация-уникального-id-при-создании)
* [Запуск проекта](#запуск-проекта)
* [Вывод](#вывод)

## Цель работы

Цель данной лабораторной работы — реализовать взаимодействие frontend-части приложения с backend API через AJAX-запросы с использованием `XMLHttpRequest`.

В ходе выполнения лабораторной работы был доработан проект из предыдущих лабораторных работ. Frontend больше не использует статические данные внутри JavaScript-файлов, а получает данные с backend-сервера.

## Тема

Тема проекта: **Кэшбэк-сервис**.

В проекте реализованы карточки cashback-предложений. Каждая карточка содержит название, описание, категорию, процент кэшбэка, изображения и дополнительную информацию.

## Сайт для вдохновения

В качестве вдохновения использовались сайты и приложения с cashback-предложениями, маркетплейсами и банковскими программами лояльности.
https://backit.me

## Описание проекта

Проект состоит из двух частей:

```bash
├── backend
└── frontend
```

Backend реализован на `Express.js`. Он отвечает за хранение данных, обработку HTTP-запросов и отправку JSON-ответов.

Frontend реализован на HTML, CSS и JavaScript-модулях. Он отвечает за отображение интерфейса, карточек, страниц и пользовательских действий.

В лабораторной работе были реализованы AJAX-запросы:

```bash
GET     /cashbacks
GET     /cashbacks/:id
GET     /cashbacks?title=...
POST    /cashbacks
PATCH   /cashbacks/:id
DELETE  /cashbacks/:id
```

## Структура проекта

### Backend

```bash
backend
├── package.json
└── src
    ├── index.js
    ├── routes
    │   └── cashbacks.js
    ├── controllers
    │   └── cashbacksController.js
    ├── services
    │   ├── cashbacksService.js
    │   └── fileService.js
    └── data
        └── cashbacks.json
```

### Frontend

```bash
frontend
├── index.html
├── main.js
├── styles.css
├── modules
│   ├── ajax.js
│   └── cashbackUrls.js
├── pages
│   ├── main
│   │   └── index.js
│   └── product
│       └── index.js
└── components
    ├── cashback-card
    │   └── index.js
    ├── cashback-details
    │   └── index.js
    └── back-button
        └── index.js
```

В проект был добавлен новый слой:

```bash
modules
```

Он нужен для хранения технической логики, связанной с API-запросами и URL-адресами backend.

## 1. Работа с API

Для работы с API был создан файл:

```bash
modules/ajax.js
```

В этом файле описан класс `Ajax`, который содержит методы для выполнения HTTP-запросов через `XMLHttpRequest`.

Пример метода `GET`:

```js
get(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            this._handleResponse(xhr, callback);
        }
    };
}
```

Данный метод выполняет GET-запрос по переданному URL.

Сначала создаётся объект:

```js
const xhr = new XMLHttpRequest();
```

Затем открывается соединение:

```js
xhr.open("GET", url);
```

После этого запрос отправляется:

```js
xhr.send();
```

Когда состояние запроса становится равным `4`, это означает, что запрос завершён. После этого вызывается метод `_handleResponse`, который обрабатывает ответ сервера.

Обработка ответа вынесена в отдельный метод:

```js
_handleResponse(xhr, callback) {
    try {
        const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
        callback(data, xhr.status);
    } catch (e) {
        console.error("Ошибка парсинга JSON:", e);
        callback(null, xhr.status);
    }
}
```

Этот метод преобразует JSON-строку в JavaScript-объект и передаёт данные в callback-функцию.

Пример использования:

```js
ajax.get("http://localhost:3000/cashbacks", (data, status) => {
    console.log(status, data);
});
```

## 2. Работа с URL

Для хранения URL-адресов backend API был создан файл:

```bash
modules/cashbackUrls.js
```

В этом файле описан класс `CashbackUrls`.

```js
class CashbackUrls {
    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    getCashbacks(title = "") {
        const params = new URLSearchParams();

        if (title.trim()) {
            params.set("title", title.trim());
        }

        const query = params.toString();

        return `${this.baseUrl}/cashbacks${query ? `?${query}` : ""}`;
    }

    getCashbackById(id) {
        return `${this.baseUrl}/cashbacks/${id}`;
    }

    createCashback() {
        return `${this.baseUrl}/cashbacks`;
    }

    removeCashbackById(id) {
        return `${this.baseUrl}/cashbacks/${id}`;
    }

    updateCashbackById(id) {
        return `${this.baseUrl}/cashbacks/${id}`;
    }
}

export const cashbackUrls = new CashbackUrls();
```

Такой подход нужен для того, чтобы не писать URL-адреса вручную в разных частях проекта.

Например, если backend будет запущен не на порту `3000`, а на порту `5000`, достаточно изменить только одну строку:

```js
this.baseUrl = "http://localhost:5000";
```

Остальной frontend-код продолжит работать.

## 3. Получение данных на главной странице

На главной странице данные загружаются через метод `getData()`.

```js
getData() {
    this.showLoading();

    ajax.get(cashbackUrls.getCashbacks(this.currentTitle), (data, status) => {
        if (status >= 200 && status < 300) {
            this.renderData(data);
            return;
        }

        this.showError();
    });
}
```

Сначала показывается состояние загрузки:

```js
this.showLoading();
```

Затем вызывается метод `ajax.get`.

URL формируется через:

```js
cashbackUrls.getCashbacks(this.currentTitle)
```

Если фильтр не указан, запрос будет таким:

```bash
GET http://localhost:3000/cashbacks
```

Если пользователь ввёл фильтр по названию, например `одежда`, запрос будет таким:

```bash
GET http://localhost:3000/cashbacks?title=одежда
```

После получения ответа проверяется HTTP-статус:

```js
if (status >= 200 && status < 300)
```

Если запрос успешный, вызывается метод:

```js
this.renderData(data);
```

Он отрисовывает карточки на странице.

## 4. Получение одной карточки

При нажатии на кнопку открытия карточки frontend переходит на страницу подробной информации.

Для получения одной карточки используется запрос:

```bash
GET http://localhost:3000/cashbacks/:id
```

Пример:

```bash
GET http://localhost:3000/cashbacks/3
```

На frontend URL формируется так:

```js
cashbackUrls.getCashbackById(this.id)
```

После ответа backend возвращает один объект cashback-предложения:

```json
{
  "id": 3,
  "title": "Кэшбэк на электронику",
  "text": "Получай выгодный возврат за гаджеты",
  "rate": "до 15%",
  "category": "Электроника"
}
```

После этого компонент детальной карточки выводит данные в интерфейс.

## 5. Удаление карточки через API

На странице подробной карточки реализована возможность удаления cashback-предложения.

Для удаления используется HTTP-метод `DELETE`.

```js
deleteCashback() {
    const isConfirmed = confirm("Удалить это cashback-предложение?");

    if (!isConfirmed) {
        return;
    }

    ajax.delete(cashbackUrls.removeCashbackById(this.id), (data, status) => {
        if (status === 204) {
            alert("Карточка удалена");
            this.clickBack();
            return;
        }

        alert("Не удалось удалить карточку");
    });
}
```

Сначала появляется окно подтверждения:

```js
confirm("Удалить это cashback-предложение?");
```

Если пользователь подтверждает удаление, отправляется запрос:

```bash
DELETE http://localhost:3000/cashbacks/:id
```

Если backend возвращает статус `204`, значит карточка успешно удалена.

После этого пользователь возвращается на главную страницу.

## 6. Генерация уникального ID при создании

На backend при создании новой карточки генерируется уникальный `id`.

Пример логики:

```js
const newId = cashbacks.length > 0
    ? Math.max(...cashbacks.map((item) => item.id)) + 1
    : 1;
```

Если массив карточек не пустой, программа находит максимальный существующий `id` и прибавляет к нему `1`.

Например, если в файле есть карточки:

```bash
1, 2, 3, 4, 5, 6
```

то новая карточка получит id:

```bash
7
```

Если массив пустой, первая карточка получит id:

```bash
1
```

После создания новая карточка добавляется в массив и записывается обратно в JSON-файл.

## Backend API

Backend предоставляет следующие endpoint'ы:

| Метод  | URL                    | Описание                            |
| ------ | ---------------------- | ----------------------------------- |
| GET    | `/cashbacks`           | Получение всех cashback-предложений |
| GET    | `/cashbacks/:id`       | Получение одной карточки по id      |
| GET    | `/cashbacks?title=...` | Поиск карточек по названию          |
| POST   | `/cashbacks`           | Создание новой карточки             |
| PATCH  | `/cashbacks/:id`       | Обновление карточки                 |
| DELETE | `/cashbacks/:id`       | Удаление карточки                   |

## Связь frontend и backend

Общая схема работы приложения:

```bash
Frontend
   ↓
ajax.js
   ↓
XMLHttpRequest
   ↓
Backend Express.js
   ↓
Controller
   ↓
Service
   ↓
cashbacks.json
   ↓
JSON response
   ↓
Frontend
   ↓
Отрисовка карточек
```

Frontend не обращается напрямую к JSON-файлу. Он отправляет запросы на backend.

Backend читает данные из файла, обрабатывает запрос и возвращает ответ в формате JSON.

## Используемые принципы

### Разделение ответственности

Каждый слой проекта отвечает за свою задачу.

```bash
routes       — маршруты API
controllers  — обработка request и response
services     — бизнес-логика
data         — хранение данных
modules      — работа с API на frontend
components   — элементы интерфейса
pages        — страницы приложения
```

### DRY

Принцип `Don't Repeat Yourself` используется для того, чтобы не повторять один и тот же код.

Например, логика `XMLHttpRequest` вынесена в отдельный файл:

```bash
modules/ajax.js
```

Благодаря этому на страницах не нужно каждый раз заново писать создание и обработку XHR-запроса.

### Component-based architecture

Frontend построен из компонентов.

Например:

```bash
CashbackCardComponent
CashbackDetailsComponent
BackButtonComponent
```

Каждый компонент отвечает только за свою часть интерфейса.

### REST API

Для работы с данными используются стандартные HTTP-методы:

```bash
GET     — получение данных
POST    — создание данных
PATCH   — изменение данных
DELETE  — удаление данных
```

## Запуск проекта

### Запуск backend

Необходимо перейти в папку backend:

```bash
cd backend
```

Установить зависимости:

```bash
npm install
```

Запустить сервер:

```bash
npm run dev
```

или:

```bash
npm run start
```

После запуска backend будет доступен по адресу:

```bash
http://localhost:3000
```

Проверить работу API можно по адресу:

```bash
http://localhost:3000/cashbacks
```

### Запуск frontend

Необходимо перейти в папку frontend:

```bash
cd frontend
```

Установить зависимости:

```bash
npm install
```

После этого открыть папку `frontend` в VS Code и запустить проект через расширение Live Server.

Обычно frontend открывается по адресу:

```bash
http://127.0.0.1:5500
```

## Проверка работы

Для проверки лабораторной работы нужно:

1. Запустить backend.
2. Открыть `http://localhost:3000/cashbacks`.
3. Убедиться, что backend возвращает JSON.
4. Запустить frontend через Live Server.
5. Проверить, что карточки загружаются на главной странице.
6. Проверить фильтр по названию.
7. Открыть отдельную карточку.
8. Проверить удаление карточки через кнопку на странице деталей.

## Вывод

В ходе выполнения лабораторной работы был реализован обмен данными между frontend и backend через AJAX-запросы с использованием `XMLHttpRequest`.

Frontend был доработан таким образом, что карточки cashback-предложений теперь загружаются с backend API, а не из статического массива. Также реализована загрузка одной карточки по id, фильтрация карточек по названию и удаление карточки через API.

В результате была закреплена работа с REST API, XHR-запросами, JSON-данными, модульной структурой frontend и слоистой архитектурой backend.
