/*
created by Benjamin Lamprecht
30.12.2022
*/



var sendBtn = document.getElementById('sendBtn');


var friend;
var attributes;
var messages;

var dialog = document.getElementById("dialogSendMessage");
var notification = document.getElementById("notification");

function getSession() {
    return sessionStorage.getItem("friend");
}

async function init() {


    friend = JSON.parse(getSession());
    var tabName = document.getElementById("tabName");
    var ownerImage = document.getElementById("owner");
    var ownerName = document.getElementById("ownerName");

    tabName.innerHTML = friend.name;
    ownerImage.src = friend.img;
    ownerName.innerText = friend.name;

    try {
        let attributes = JSON.parse(friend.attributes);
        for (let i = 0; i < attributes.length; i++) {
            let attribute = JSON.parse(attributes[i]);
            await createAttributeLine(attribute.title, attribute.content);
        }
    } catch {
        console.log("no attributes");
    }
    try {
        let messages = JSON.parse(friend.messages);
        for (let i = 0; i < messages.length; i++) {
            let message = JSON.parse(messages[i]);
            await createMessageLine(message.text, message.img);
        }
    } catch {
        console.log("no messages");
    }

}

async function openWindow() {
    dialog.showModal();
}

async function sendMessage() {
    dialog.close();
    if (document.getElementById('content').value != '') {
        notification.innerHTML = "Message sent: " + document.getElementById('content').value;

        notification.showModal();

        setTimeout(function () {
            notification.close();
            console.log("goddammit!");
        }, 3000);
    }
}

function back() {
    parent.location = 'index.html';
}

init();

async function createAttributeLine(titleTxt, contentTxt) {
    let section = document.getElementById("listAttributes");
    let attribute = document.createElement("div");
    let title = document.createElement("span");
    let content = document.createElement("span");
    let image = document.createElement("img");
    image.src = "img/attribute.png";

    attribute.className = "attribute";
    title.className = "title";
    content.className = "content";

    title.innerHTML = titleTxt;
    content.innerHTML = contentTxt;

    section.appendChild(attribute);
    attribute.appendChild(image);
    attribute.appendChild(title);
    attribute.appendChild(content);
}

async function createMessageLine(messageText, img) {
    let section = document.getElementById("listMessages");
    let container = document.createElement("div");
    let text = document.createElement("p");
    let image = document.createElement("img");

    container.className = "message";
    text.innerHTML = messageText;
    image.src = await img;

    section.appendChild(container);
    container.appendChild(text);
    container.appendChild(image);
}
