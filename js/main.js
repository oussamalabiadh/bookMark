// ----------------- Start Global
var documentHtml = document,
   siteName = documentHtml.getElementById("siteName"),
   siteUrl = documentHtml.getElementById("siteUrl"),
   btnAdd = documentHtml.getElementById("btnAdd"),
   btnUpdate = documentHtml.getElementById("btnUpdate"),
   booksContainer = [],
   indexUpdate = 0,
   searchInput = documentHtml.getElementById("searchBook"),
   alertName = documentHtml.getElementById("alertName"),
   alertUrl = documentHtml.getElementById("alertUrl"),
   alertExite = documentHtml.getElementById("alertExite");

// ----------------- When  Start

if (getLocal() !== null) {
   booksContainer = getLocal();
   displayData();
}

// ----------------- Start Events
btnAdd.onclick = function () {
   addBookMark();
};

btnUpdate.onclick = function () {
   updateBook();
};

searchInput.oninput = function () {
   searchBook(this.value);
};

// ----------------- Start Function
function addBookMark() {
   if (nameValidation() & urlValidation()) {
      var book = {
         name: siteName.value,
         url: siteUrl.value,
      };
      booksContainer.push(book);
      setLocal();
      displayData();
      resetForm();
   }
}

function deleteBookMark(index) {
   booksContainer.splice(index, 1);
   displayData();
   setLocal();
   console.log(booksContainer);
}

function setUpdateInfo(index) {
   indexUpdate = index;
   siteName.value = booksContainer[index].name;
   siteUrl.value = booksContainer[index].url;
   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}

function updateBook() {
   if (nameValidation() & urlValidation()) {
      var book = {
         name: siteName.value,
         url: siteUrl.value,
      };
      booksContainer.splice(indexUpdate, 1, book);
      displayData();
      setLocal();
      resetForm();
      btnAdd.classList.remove("d-none");
      btnUpdate.classList.add("d-none");
   }
}

function searchBook() {
   displayData();
}

function displayData() {
   var tableBody = "";
   var term = searchInput.value.toLowerCase();

   for (var i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].name.toLowerCase().includes(term)) {
         tableBody += `
         <tr>
         <td scope="row">${booksContainer[i].name.toLowerCase().replaceAll(term, `<span class="text-bg-info">${term}</span>`)}</td>
         <td>
            <p class="small text-truncate" style="max-width: 300px">
              ${booksContainer[i].url}
            </p>
         </td>
         <td>
            <div class="hstack justify-content-center gap-2">
               <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-dark">
                  <i class="fa-regular fa-eye"></i>
               </a>
   
               <button class="btn btn-outline-warning" onclick="setUpdateInfo(${i})">
                  <i class="fa-regular fa-pen-to-square"></i>
               </button>
   
               <button class="btn btn-outline-danger" onclick="deleteBookMark(${i})">
                  <i class="fa-solid fa-trash"></i>
               </button>
            </div>
         </td>
      </tr>
         `;
      }
   }

   documentHtml.getElementById("tableBody").innerHTML = tableBody;
}

function resetForm() {
   siteName.value = "";
   siteUrl.value = "";
}

function setLocal() {
   localStorage.setItem("booksData", JSON.stringify(booksContainer));
}

function getLocal() {
   return JSON.parse(localStorage.getItem("booksData"));
}

// ----------------- Start Validation

function nameValidation() {
   if (siteName.value !== "") {
      alertName.classList.add("d-none");
      return true;
   } else {
      alertName.classList.remove("d-none");
      return false;
   }
}

function urlValidation() {
   var exite = false;
   for (var i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].url === siteUrl.value) {
         exite = true;
         break;
      }
   }

   if (siteUrl.value !== "") {
      alertUrl.classList.add("d-none");
      if (exite) {
         alertExite.classList.remove("d-none");
         return false;
      } else {
         alertExite.classList.add("d-none");
         return true;
      }
   } else {
      alertUrl.classList.remove("d-none");
      return false;
   }
}
