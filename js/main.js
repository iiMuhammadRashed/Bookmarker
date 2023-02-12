var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("websiteUrl");
var bookmarksList = [];

if (localStorage.getItem("bookmarksList") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmarks(bookmarksList);
}

document
  .querySelector("#addBookmarkBtn")
  .addEventListener("click", function () {
    getBookmarks();
  });
function getBookmarks() {
  if (validateName()) {
    validateN = true;
    document
      .querySelector(".name-error p")
      .classList.replace("d-block", "d-none");
  } else {
    validateN = false;
    document
      .querySelector(".name-error p")
      .classList.replace("d-none", "d-block");
  }
  if (validateUrl()) {
    validateU = true;
    document
      .querySelector(".url-error p")
      .classList.replace("d-block", "d-none");
  } else {
    validateU = false;
    document
      .querySelector(".url-error p")
      .classList.replace("d-none", "d-block");
  }
  if (checkOldNames()) {
    checkOldNamesFlag = false;
    document
      .querySelector(".repeat-name-error p")
      .classList.replace("d-none", "d-block");
  } else {
    checkOldNamesFlag = true;
    document
      .querySelector(".repeat-name-error p")
      .classList.replace("d-block", "d-none");
  }
  if (checkOldUrl()) {
    checkOldUrlFlag = false;
    document
      .querySelector(".repeat-url-error p")
      .classList.replace("d-none", "d-block");
  } else {
    checkOldUrlFlag = true;
    document
      .querySelector(".repeat-url-error p")
      .classList.replace("d-block", "d-none");
  }
  if (validateN && validateU && checkOldNamesFlag && checkOldUrlFlag) {
    var Bookmark = {
      bName: bookmarkName.value,
      bUrl: bookmarkUrl.value,
    };
    bookmarksList.push(Bookmark);
    displayBookmarks(bookmarksList);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
  }
}
function validateName() {
  RegExp = /[A-Z][a-z]{3,15}/;
  return RegExp.test(bookmarkName.value);
}
function validateUrl() {
  RegExp =
    /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi;
  return RegExp.test(bookmarkUrl.value);
}
function checkOldNames() {
  for (var i = 0; i < bookmarksList.length; i++) {
    return bookmarksList[i].bName == bookmarkName.value;
  }
}
function checkOldUrl() {
  for (var i = 0; i < bookmarksList.length; i++) {
    return bookmarksList[i].bUrl == bookmarkUrl.value;
  }
}

function displayBookmarks(bookmarkArray) {
  var bookmarkContainer = ` `;

  for (var i = 0; i < bookmarkArray.length; i++) {
    bookmarkContainer += `
      <tr>
    <td colspan="8" class="text-start px-5">${bookmarkArray[i].bName}</td>
    <td><a href="${bookmarkArray[i].bUrl}" target="_blank">
      <button class="btn btn-outline-light">
        <i class="fa-regular fa-eye"></i>
      </button></a>
    </td>
    <td>
      <button class="btn btn-outline-danger" onclick="deleteBookmark(${i})">
        <i class="fa-regular fa-trash"></i>
      </button>
    </td>
      </tr>
      `;
  }
  document.getElementById("bookmarksTable").innerHTML = bookmarkContainer;
}
function deleteBookmark(productIndex) {
  bookmarksList.splice(productIndex, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
  displayBookmarks(bookmarksList);
}
