"use strict";

const cardsContainer = document.querySelector(".usersProfiles");
const users = [];
fetch("./assets/js/data1.json")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    users.push(...data.map((info) => createUserCard(info)));
    cardsContainer.append(...users);
  })
  .catch((error) => {
    console.log(error);
  });

function errorImageHandler({target}){
  target.hidden = true;
}

function loadImageHandler({target}){
  target.hidden = false;
}


function createUserCard({id, firstName, lastName, profilePicture, contacts}){
  const imageWrapper = createImageWrapper(id, profilePicture, firstName, lastName);
  const fullName = getFullName(firstName, lastName);
  const headingText = fullName.length ? fullName : "Unknown Person";
  const h2 = createElement("h2", {classNames: ["userName"]}, document.createTextNode(headingText));
  const socialBlock = createSocialBlock(contacts);
  const article = createElement("article", {classNames : ["userCard"]}, imageWrapper, h2, socialBlock);
  return article;
}



function createImageWrapper(id, profilePicture, firstName, lastName){
  const fullName = getFullName(firstName, lastName);
  const initialsText = fullName.length ? firstName[0] + lastName[0] : "UP";
  const initials = createElement("div", {classNames: ["initials"]}, createElement("span", {}, document.createTextNode(initialsText)));
  initials.style.backgroundColor = stringToColor(initialsText);
  const imageWrapper = createElement("div", {classNames: ["imageWrapper"]},initials, createImage(id, profilePicture));
  return imageWrapper;
}

function createImage(id, profilePicture){
  return createElement("img", {classNames: ["userImage"], handlers: {
    error : errorImageHandler,
    load : loadImageHandler
  }, attributes: {
    src: profilePicture,
    alt: `user id = ${id}`,
    hidden: false
  }});
}

function createSocialBlock(contacts){
  const socialIcons = contacts.map((contact) => {
    const url = new URL(contact).host;
    if(SOCIALS[url]){
      return createElement("a",
      {
        classNames: ["socialButton"],
        attributes: {
          href: contact,
          target: "blank"
        }
      },createElement("i",
          {
            classNames: SOCIALS[url].split(" ")
          }
        )
      )
    }else{
      return createElement("a",
      {
        classNames: ["socialButton"],
        attributes: {
          href: contact,
          target: "blank"
        }
      },createElement("i",
          {
            classNames: SOCIALS["unknown"].split(" ")
          }
        )
      )
    }
  });
  return createElement("div", {classNames: ["socials"]}, ...socialIcons);
}

/*Utils*/

