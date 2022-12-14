class Library {
  constructor(selector) {
    this.node = document.getElementById(selector);
    this.books = [];
  }

  addBook = (book) => {
    this.books.push(book);
  };

  removeBookByIndex = (index) => {
    this.books.splice(index, 1);
    this.render();
  };

  toggleStatusByIndex = (index) => {
    const book = this.books[index];
    book.status = !book.status;
    this.render();
  };

  // deletes all books in the table
  reset = () => {
    const rows = Array.from(this.node.rows);
    rows.forEach((row) => row.remove());
  };

  // append all books to the table
  render = () => {
    this.reset(); // avoid duplicates
    for (let i = 0; i < this.books.length; i++) {
      const book = this.books[i];
      const tr = document.createElement("tr");

      // FIXME library shouldn't have knowledge of representation
      tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td></td>
      <td></td>`;

      // add book status checkbox
      const statusColumn = tr.children[3];
      if (book.status == true) {
        statusColumn.innerHTML = `Yes`;
      } else {
        statusColumn.innerHTML = `
          <label for="status_${i}">mark as read</label>
          <input type="checkbox" name="status" id="status_${i}" data-book-index=${i}>`;
      }

      // add delete button
      const buttonColumn = tr.children[4];
      buttonColumn.innerHTML = `<button data-book-index=${i}>delete</button>`;

      // add row to table
      this.node.appendChild(tr);
    }
  };
}

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// handle input elements
function formInput(name) {
  this.node = document.getElementById(name);

  this.value = () => this.node.value;
  this.reset = () => (this.node.value = "");
}

// handle radio buttons
function formRadio(name) {
  this.node = document.getElementsByName("book_status");

  this.value = () => {
    for (const radio of this.node) {
      if (radio.checked) {
        return radio.value == "true" ? true : false;
      }
    }
  };

  this.reset = () => {
    for (const radio of this.node) {
      radio.checked = false;
    }
  };
}

// create Library
const library = new Library("shelve");

// select form inputs
let title = new formInput("title");
let author = new formInput("author");
let pages = new formInput("pages");
let status = new formRadio("book_status");

// submit buttons
let form = document.querySelector("#newBookForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let book = new Book(
    title.value(),
    author.value(),
    pages.value(),
    status.value()
  );

  library.addBook(book);
  library.render();

  title.reset();
  author.reset();
  pages.reset();
  status.reset();
});

// handle delete button clicks
const table = document.querySelector("table");
table.addEventListener("click", (e) => {
  if (e.target.type == "submit") {
    library.removeBookByIndex(e.target.dataset.bookIndex);
  }
});

table.addEventListener("change", (e) => {
  index = e.target.dataset.bookIndex;
  library.toggleStatusByIndex(index);
});
