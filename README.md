# Лабораторная работа №4: Разработка REST API на Express.js

Потапов Данил ИУ5-44Б

## Содержание

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Задание](#Задание)
- [Реализация дополнительных заданий](#реализация-дополнительных-заданий)
- [Фильтрация по имени](#1-фильтрация-списка-персонажей-по-имени)
- [Настройка CORS](#2-настройка-cors-для-клиента)
- [Генерация уникального ID](#3-генерация-уникального-id-при-создании)


- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** 
Изучить основы разработки веб-серверов на платформе Node.js с использованием библиотеки Express.js.
Научиться:
- Настраивать базовый HTTP-сервер.
- Реализовывать маршрутизацию (Routing).
- Использовать Middleware.
- Разделять логику приложения на слои (Controllers, Services, Data Access).
- Работать с файловой системой для хранения данных.


## **Тема:** История живописи. Услуги — картины художников. Заявки — заявки на экспертизу для определения авторства картины.

## **Сайт** для вдохновения: https://rusmuseumvrm.ru/collections/painting/index.php

## **Задание**

Разработать REST API сервис для управления коллекцией карточек "Смешарики" с использованием фреймворка Express.js. Приложение должно реализовывать CRUD-операции (Create, Read, Update, Delete) и хранить данные в JSON-файле.

Требуемый функционал API:
- `GET /characters` — получение списка всех персонажей (с поддержкой поиска).
- `GET /characters/:id` — получение персонажа по ID.
- `POST /characters` — создание нового персонажа.
- `PATCH /characters/:id` — частичное обновление данных персонажа.
- `DELETE /characters/:id` — удаление персонажа.

---

## Реализация дополнительных заданий

В ходе защиты лабораторной работы были выполнены следующие дополнительные задания по доработке функционала.

### 1. Фильтрация списка персонажей по имени

**Задача:** Реализовать возможность поиска персонажей по частичному совпадению имени через query-параметр.

**Реализация:**
В сервисе `charactersService.js` метод `findAllCharacters` проверяет наличие параметра `title`. Если он передан, массив фильтруется.

```javascript
/* src/services/charactersService.js */
const findAllCharacters = (title) => {
    const characters = fileService.readData(dataFilePath);
    // Проверка наличия query-параметра title
    if (title) {
        return characters.filter(character =>
            // Фильтрация без учета регистра
            character.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return characters;
};
```

### 2. Настройка CORS для клиента

**Задача:** Разрешить запросы к API с других доменов (например, от фронтенд-приложения, запущенного на другом порту), чтобы избежать ошибки `Cross-Origin Request Blocked`.

**Реализация:**
Установлен пакет `cors` и подключен как глобальный middleware в `index.js`.

```javascript
/* src/index.js */
const cors = require('cors');
// ...
const app = express();

// Подключение CORS middleware для всех маршрутов
app.use(cors());

app.use(express.json());
// ...
```

### 3. Генерация уникального ID при создании

**Задача:** Реализовать автоматическое присвоение уникального идентификатора (`id`) для новых создаваемых карточек, чтобы клиенту не приходилось передавать его вручную.

**Реализация:**
В методе `createNewCharacter` вычисляется максимальный существующий ID и увеличивается на единицу.

```javascript
/* src/services/charactersService.js */
const createNewCharacter = (characterData) => {
    const characters = fileService.readData(dataFilePath);

    // Находим максимальный ID в массиве и прибавляем 1
    const newId = characters.length > 0
        ? Math.max(...characters.map(c => c.id)) + 1
        : 1;

    const newCharacter = { id: newId, ...characterData };
    characters.push(newCharacter);
    fileService.writeData(dataFilePath, characters);

    return newCharacter;
};
```
