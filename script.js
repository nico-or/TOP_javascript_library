function Library(selector) {
  this.node = document.getElementById(selector)
  this.books = [];

  this.addBook = (book) => this.books.push(book)

  // deletes all books in the table
  this.reset = () => {
    let rows = Array.from(this.node.rows)
    rows.forEach( row => row.remove() )
  }

  // append all books to the table
  this.render = () => {
    this.reset()  // avoid duplicates
    for (const book of this.books) {
      this.node.appendChild(book.toTableRow())
    }
  }
}

function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status

  // returns a <tr> element with the book info
  this.toTableRow = function () {
    // returns a <td> element with input text
    function createTableData(text) {
      let node = document.createElement('td')
      node.textContent = text
      return node
    }

    let row = document.createElement('tr')

    row.appendChild(createTableData(this.title))
    row.appendChild(createTableData(this.author))
    row.appendChild(createTableData(this.pages))
    row.appendChild(createTableData(this.status))

    return row
  }
}

// handle input elements
function formInput(name){
  this.node = document.getElementById(name);

  this.value = () => this.node.value;
  this.reset = () => this.node.value = "";
}

// handle radio buttons
function formRadio(name){
  this.node = document.getElementsByName('book_status')

  this.value = () => {
    for (const radio of this.node) {
      if (radio.checked) {
        return radio.value == "true" ? true : false
      }
    }
  }

  this.reset = () => {
    for (const radio of this.node){
      radio.checked = false
    }
  }
}

// create Library
const library = new Library('shelve')

// select form inputs
let title = new formInput('title');
let author = new formInput('author');
let pages = new formInput('pages');
let status = new formRadio('book_status');

// submit buttons
let form = document.querySelector('#newBookForm')

form.addEventListener("submit", e => {
  e.preventDefault()

  let book = new Book(
    title.value(),
    author.value(),
    pages.value(),
    status.value()
  )

  library.addBook(book)
  library.render()

  title.reset();
  author.reset();
  pages.reset();
  status.reset();
});
