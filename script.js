function Library(selector) {
  this.node = document.getElementById(selector)
  this.books = [];

  this.addBook = (book) => this.books.push(book)

  this.removeBookByIndex = (index) => {
    this.books.splice(index, 1)
    this.render()
  }

  // deletes all books in the table
  this.reset = () => {
    let rows = Array.from(this.node.rows)
    rows.forEach( row => row.remove() )
  }

  // append all books to the table
  this.render = () => {
    this.reset()  // avoid duplicates
    for (let i = 0; i < this.books.length; i++) {
      const book = this.books[i];
      let tr = document.createElement('tr')

      // FIXME library shouldn't have knowledge of representation
      tr.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status}</td>
      <td></td>`

      // add delete button
      node = tr.children[4]
      node.innerHTML = `<button data-book-index=${i}>delete</button>`

      this.node.appendChild(tr)
    }
  }
}

function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
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

// handle delete button clicks
const table = document.querySelector('table')
table.addEventListener('click', e => {
  if (e.target.type == "submit"){
    let tr = e.target.parentElement.parentElement
    library.removeBookByIndex(tr.dataset.bookIndex)
  }
})
