var groupContent = document.getElementById("tag-reader");
var tag = document.getElementById("tag-field-id");
var buttonClick = document.getElementById("add-button");
var modal = document.getElementById("myModal");
var closeSpan = document.getElementById("close-span");
var modalText = document.getElementById("modal-text");
var modalHeaderText = document.getElementById("modal-header-text");

const CHAR_REGEX = new RegExp("^[0-9-]*$");


function validateInput(value) {
    if (+value && CHAR_REGEX.test(value) && value.length !== 0) {
        return true;
    }
    return false;
}

function validateCommas(input) {
    removableElem = input.substr(-1);
    if (removableElem === ";" || removableElem === ",") {
        input = input.substr(0, input.length - 1);
    }
    return input;
}

function addStyleToTag(tagContainer, tagNumberSpan) {
    if (tagNumberSpan.value < 0) {
        tagContainer.style.border = 'solid cyan 5px';
    } else {
        tagContainer.style.border = 'solid red 5px';
    }
}

function addTagToLocalStorage(tag) {
    var keyStorage = Object.keys(localStorage);
    var counter = keyStorage.length;
    counter++;
    window.localStorage.setItem(counter.toString(), tag.value);
}

function addItem(addToLocalStorage = true) {
    var tagNumberSpan = document.createElement("span");
    var tagContainer = document.createElement("div");

    tagContainer.classList.add("tag-container");
    tagContainer.append(tagNumberSpan);
    tag.value = validateCommas(tag.value);

    tagNumberSpan.setAttribute('id'.trim(), tag.value);
    tagNumberSpan.value = tag.value;

    if (validateInput(tag.value)) {
        groupNodes = groupContent.childNodes;
        addStyleToTag(tagContainer, tagNumberSpan);
        if (addToLocalStorage) {
            addTagToLocalStorage(tag);
        }
        for (let index = 1; index <= groupContent.childNodes.length - 1; index++) {
            if (tagNumberSpan.value === groupNodes[index].firstElementChild.id) {
                // add alert
                return;
            }
        }
        tagNumberSpan.appendChild(document.createTextNode(tagNumberSpan.id));
        groupContent.append(tagContainer);

        tagNumberSpan.onclick = () => {
            editable = tagNumberSpan.id;
            if (tag.value === "") {
                removeEditItem(editable);
                tag.value = editable;
            } else {
                // add alert to finish editing
                popModal();
                modalHeaderText.innerText = "Edit alert";
                modalText.innerText = "Finish editing the previous tag!";

                return;
            }
        }
        tag.value = "";
        tagContainer.append(attachDeleteButton());

    } else {
        tag.value = "";
        popModal();
        modalText.innerText = "Input can only consist of negative or positive number values!";
        modalHeaderText.innerText = "Invalid input!";
    }
}

function removeEditItem(editable) {
    var removable = document.getElementById(editable);
    var listOfTags = groupContent.childNodes;

    for (let index = 0; index <= listOfTags.length - 1; index++) {
        if (listOfTags[index].textContent == removable.id) {
            groupContent.childNodes[index].remove();
        }
    }
}

function removeAllItems() {
    var children = groupContent.children;
    for (let index = children.length - 1; index >= 0; index--) {
        children[index].remove();
    }
    tag.value = "";
    window.localStorage.clear();
}

function attachDeleteButton() {
    var delete_button = document.createElement('button');
    delete_button.classList.add("delete-button");
    var deleteElementPicture = document.createElement("i");
    deleteElementPicture.className = "fas fa-times";
    delete_button.append(deleteElementPicture);

    delete_button.onclick = () => {
        var removable = delete_button.parentElement.firstElementChild.value;
        removeEditItem(removable);
        var keyStorage = Object.keys(localStorage);
        for (let index = 0; index < keyStorage.length; index++) {
            if (localStorage.getItem(keyStorage[index]) == removable) {
                window.localStorage.removeItem(keyStorage[index]);
            }
        }
    }
    return delete_button;
}

function popModal() {
    modal.style.display = "block";
    closeSpan.onclick = function() {
        modal.style.display = "none";
    }
}

function hideModal() {
    modal.style.display = "none";
}


document.getElementById("add-button").onclick = addItem;
document.getElementById("delete-button").onclick = removeAllItems;
document.getElementById("close-span").onclick = hideModal;

document.getElementById("tag-field-id").addEventListener('keyup', (event) => {
    if (event.key === 'Enter' || event.code === 'Comma') {
        addItem(true);
    }
})



function retrieveTags() {
    Object.keys(localStorage).forEach((key) => {
        var storedTag = localStorage.getItem(key);
        tag.value = storedTag;
        addItem(false);
    })
    tag.value = "";
}
window.onload = retrieveTags();