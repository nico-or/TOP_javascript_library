const library = []

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

library.push(new Book('1984', 'George Orwell', 120, true))
library.push(new Book('I Robot', 'Isaac Asimov', 150, false))

// select shelve container
const shelve = document.getElementById('shelve')

// appends lirary books to the shelve container
for (const book of library) {
  shelve.appendChild(book.toTableRow())
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

// select form inputs
let title = new formInput('title');
let author = new formInput('author');
let pages = new formInput('pages');
let status = new formRadio('book_status');
