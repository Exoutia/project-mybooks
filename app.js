const bookTable = document.querySelector('.books tbody');

let myLibrary = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    page: 310,
    isRead: true
  },
  {
    title: '1984',
    author: 'George Orwell',
    page: 328,
    isRead: false
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    page: 281,
    isRead: true
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    page: 180,
    isRead: false
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    page: 635,
    isRead: false
  }
];


function populateTable() {
  myLibrary.forEach((book, index) => addBookToList(book, index));
}

function addBookToList(book, index) {
  const myRow = document.createElement('tr');
  const count = document.createElement('td');
  count.innerText = cnt;
  myRow.appendChild(count);
  cnt++;

  Object.values(book).forEach(value => {
    const tdata = document.createElement('td');
    tdata.innerText = value;
    myRow.appendChild(tdata);
  });

  const actions = document.createElement('td');
  
  // Create remove button
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.dataset.index = index;
  removeButton.addEventListener('click', removeBook);
  actions.appendChild(removeButton);
  
  // Create toggle read button
  const toggleButton = document.createElement('button');
  toggleButton.innerText = book.isRead ? 'Unread' : 'Read';
  toggleButton.dataset.index = index;
  toggleButton.addEventListener('click', toggleReadStatus);
  actions.appendChild(toggleButton);

  myRow.appendChild(actions);
  bookTable.appendChild(myRow);
}

function removeBook(event) {
  const index = event.target.dataset.index;
  myLibrary.splice(index, 1);
  refreshTable();
}

function toggleReadStatus(event) {
  const index = event.target.dataset.index;
  myLibrary[index].isRead = !myLibrary[index].isRead;
  refreshTable();
}

function refreshTable() {
  bookTable.innerHTML = '';
  cnt = 1;
  populateTable();
}

const dialog = document.getElementById("bookDialog");
const showButton = document.getElementById("openDialog");
const closeButton = document.getElementById("closeDialog");

// Open the dialog
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// Close the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const form = document.getElementById("bookForm");

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const book = {
    title: formData.get('title'),
    author: formData.get('author'),
    page: parseInt(formData.get('page'), 10),
    isRead: formData.get('isRead') === 'on'
  };
  

  myLibrary.push(book);
  refreshTable();
  dialog.close();
  form.reset();
});

refreshTable();
