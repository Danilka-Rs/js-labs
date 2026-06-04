# ЛР 2. Calculator. HTML/CSS

Потапов Данил ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** данной лабораторной работы — знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS, JavaScript. В ходе выполнения работы вам предстоит продолжить реализовывать простой калькулятор, а затем выполнить задания по варианту.

## **Тема:** История живописи. Услуги — картины художников. Заявки — заявки на экспертизу для определения авторства картины.

## **Сайт** для вдохновения: https://rusmuseumvrm.ru/collections/painting/index.php

## **Дополнительные задания**
1. Ограничение количества символов на экране

```css
const MAX_DIGITS = 17;

function appendDigit(d) {
  if (expr.length >= MAX_DIGITS) {
    return;
  }

  if (expr === "0") {
    expr = d;
  } else if (expr === "-") {
    expr = "-" + d;
  } else {
    expr += d;
  }

  render();
}
```
2. Добавление десятичной точки с проверкой

```css
function appendDot() {
  let i = expr.length - 1;
  while (i >= 0 && !isOperator(expr[i])) i--;

  const currentNumber = expr.slice(i + 1);

  if (currentNumber.includes(".")) return;

  if (expr === "0") expr = "0.";
  else if (isOperator(expr[expr.length - 1])) expr += "0.";
  else expr += ".";

  render();
}
```
3. Проверка операторов
```css
function isOperator(ch) {
  return ch === "+" || ch === "-" || ch === "*" || ch === "/";
}
```
## План выполнения работы

1. Программирование логики с помощью JavaScript
2. Доступ к HTML-элементам из JavaScript
3. Программирование кнопок калькулятора
4. Запуск калькулятора с помощью LiveServer
5. Задание

