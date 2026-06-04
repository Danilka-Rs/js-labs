# ЛР 3. Простое веб-приложение. Верстка

Потапов Данил ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Задание](#Задание)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** данной лабораторной работы - знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту.

## **Тема:** История живописи. Услуги — картины художников. Заявки — заявки на экспертизу для определения авторства картины.

## **Сайт** для вдохновения: https://rusmuseumvrm.ru/collections/painting/index.php

## **Задание** 
1. Установить Node.js и подготовить рабочую среду разработки (VS Code и Live Server).
2. Инициализировать проект npm:
* создать новую папку проекта;
* выполнить команду npm init;
* получить файл package.json.
3.	Подготовить структуру проекта:
* создать файл .gitignore;
* организовать структуру каталогов и файлов проекта.
4. Создать главную страницу приложения:
* создать файл index.html;
* подключить библиотеку Bootstrap;
* реализовать базовую HTML-разметку страницы.
5. Реализовать взаимодействие HTML и JavaScript:
* получать элементы страницы через getElementById;
* добавлять HTML-элементы через insertAdjacentHTML.
6. Добавить простую кнопку на JavaScript, которая выполняет действие при нажатии.
7. Организовать структуру проекта:
* разделить код по файлам;
* выделить папки для страниц, скриптов и ресурсов.
8. Сверстать главную страницу веб-приложения:
* создать базовый интерфейс;
* использовать компоненты Bootstrap.
9. Создать и сверстать страницу продукта:
* реализовать отдельную страницу с информацией о товаре (или элементе);
* оформить её с использованием HTML и Bootstrap.
10. Сделать кнопки "Добавить" и "Удалить" карточку

## **Дополнительные задания**
1. Создать карточки с использованием CSS-переменных и реализовать плавный эффект при наведении.

HTML (index.html):
```css
<div class="museum-card">
  <div class="museum-card__image-wrap">
    <img src="https://via.placeholder.com/380x280" class="museum-card__image" alt="Art">
  </div>
  <div class="museum-card__body">
    <h3 class="museum-card__title">Картина</h3>
    <p class="museum-card__text">Описание произведения искусства.</p>
    <button class="museum-button">Подробнее</button>
  </div>
</div>
```


```css
:root {
  --card-bg: #f1efea;
  --card-shadow: 0 14px 40px rgba(47, 36, 25, 0.08);
  --accent: #b31919;
  --accent-hover: #980505;
}

.museum-card {
  width: 380px;
  background: var(--card-bg);
  border: 1px solid #dcd4c8;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.museum-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 46px rgba(47, 36, 25, 0.14);
}

.museum-button {
  border: 0;
  background: var(--accent);
  color: #fff;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.museum-button:hover {
  background: var(--accent-hover);
}
```
2. Модульная структура JS и рендеринг страницы

```css
export class MainPage {
  constructor(root) {
    this.root = root;
  }

  render() {
    this.root.innerHTML = `
      <h1>Добро пожаловать в виртуальную коллекцию</h1>
      <p>Здесь вы можете просматривать различные произведения искусства.</p>
    `;
  }
}

import { MainPage } from "./pages/main/index.js";

const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();
```

## План выполнения работы
1. HTML-разметка  
2. Базовая структура HTML-документа  
3. Создание проекта  
4. Верстка калькулятора  
5. CSS  
6. Применение CSS к HTML-документу  
7. Стилизация интерфейса калькулятора  
8. Выполнение задания  
