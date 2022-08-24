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
