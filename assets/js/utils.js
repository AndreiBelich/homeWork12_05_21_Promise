"use strict";

function getFullName(firstName, lastName){
  return `${firstName} ${lastName}`.trim();
}

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function createElement(tagName, {
  classNames = [],
  handlers = {},
  attributes = {}
}, ...children){
  const element = document.createElement(tagName);
  element.classList.add(...classNames);

  for(const [attributeName, attributeValue] of Object.entries(attributes)){
    element.setAttribute(attributeName, attributeValue);
  }

  for(const [eventType, eventHandler] of Object.entries(handlers)){
    element.addEventListener(eventType, eventHandler);
  }
  element.append(...children);
  return element;
}