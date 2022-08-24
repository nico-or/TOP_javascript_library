function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
}

console.log(new Book('1984', 'George Orwell', 120, true))
