const API_URL = `http://localhost:8000/api/books`;

function getList() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => console.log(data));
}