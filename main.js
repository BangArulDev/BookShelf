const STORAGE_KEY = "BOOKSHELF_APPS_DATA";

function getBooksFromStorage() {
  const books = localStorage.getItem(STORAGE_KEY);
  return books ? JSON.parse(books) : [];
}

function saveBooksToStorage(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function generateBookId() {
  return +new Date();
}

function createBookObject(title, author, year, isComplete) {
  return {
    id: generateBookId(),
    title,
    author,
    year: Number(year),
    isComplete: Boolean(isComplete),
  };
}

function renderBooks() {
  const books = getBooksFromStorage();
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("data-bookid", book.id);
    bookItem.setAttribute("data-testid", "bookItem");

    const titleElem = document.createElement("h3");
    titleElem.setAttribute("data-testid", "bookItemTitle");
    titleElem.textContent = book.title;

    const authorElem = document.createElement("p");
    authorElem.setAttribute("data-testid", "bookItemAuthor");
    authorElem.textContent = `Penulis: ${book.author}`;

    const yearElem = document.createElement("p");
    yearElem.setAttribute("data-testid", "bookItemYear");
    yearElem.textContent = `Tahun: ${book.year}`;

    const actionContainer = document.createElement("div");

    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    toggleButton.textContent = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    toggleButton.addEventListener("click", () => {
      book.isComplete = !book.isComplete;
      saveBooksToStorage(books);
      renderBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.addEventListener("click", () => {
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        saveBooksToStorage(books);
        renderBooks();
      }
    });

    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.textContent = "Edit Buku";
    editButton.addEventListener("click", () => {
      document.getElementById("bookFormTitle").value = book.title;
      document.getElementById("bookFormAuthor").value = book.author;
      document.getElementById("bookFormYear").value = book.year;
      document.getElementById("bookFormIsComplete").checked = book.isComplete;
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        saveBooksToStorage(books);
        renderBooks();
      }
    });

    actionContainer.appendChild(toggleButton);
    actionContainer.appendChild(deleteButton);
    actionContainer.appendChild(editButton);

    bookItem.appendChild(titleElem);
    bookItem.appendChild(authorElem);
    bookItem.appendChild(yearElem);
    bookItem.appendChild(actionContainer);

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}

document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("bookFormTitle").value.trim();
  const author = document.getElementById("bookFormAuthor").value.trim();
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  if (!title || !author || !year) return;

  const books = getBooksFromStorage();
  books.push(createBookObject(title, author, year, isComplete));
  saveBooksToStorage(books);
  renderBooks();
  this.reset();
});

document.getElementById("searchBook").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document
    .getElementById("searchBookTitle")
    .value.trim()
    .toLowerCase();
  const books = getBooksFromStorage();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query)
  );

  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("data-bookid", book.id);
    bookItem.setAttribute("data-testid", "bookItem");

    const titleElem = document.createElement("h3");
    titleElem.setAttribute("data-testid", "bookItemTitle");
    titleElem.textContent = book.title;

    const authorElem = document.createElement("p");
    authorElem.setAttribute("data-testid", "bookItemAuthor");
    authorElem.textContent = `Penulis: ${book.author}`;

    const yearElem = document.createElement("p");
    yearElem.setAttribute("data-testid", "bookItemYear");
    yearElem.textContent = `Tahun: ${book.year}`;

    const actionContainer = document.createElement("div");

    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    toggleButton.textContent = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    toggleButton.addEventListener("click", () => {
      book.isComplete = !book.isComplete;
      saveBooksToStorage(books);
      renderBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.textContent = "Hapus Buku";
    deleteButton.addEventListener("click", () => {
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        saveBooksToStorage(books);
        renderBooks();
      }
    });

    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.textContent = "Edit Buku";
    editButton.addEventListener("click", () => {
      document.getElementById("bookFormTitle").value = book.title;
      document.getElementById("bookFormAuthor").value = book.author;
      document.getElementById("bookFormYear").value = book.year;
      document.getElementById("bookFormIsComplete").checked = book.isComplete;
      const index = books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        books.splice(index, 1);
        saveBooksToStorage(books);
        renderBooks();
      }
    });

    actionContainer.appendChild(toggleButton);
    actionContainer.appendChild(deleteButton);
    actionContainer.appendChild(editButton);

    bookItem.appendChild(titleElem);
    bookItem.appendChild(authorElem);
    bookItem.appendChild(yearElem);
    bookItem.appendChild(actionContainer);

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
});

window.addEventListener("DOMContentLoaded", renderBooks);
