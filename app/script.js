const API_URL = `http://localhost:8000/api/books`;

function getList() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        let html = ``;
        data.forEach(book => {
            html += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>$${book.price}</td>
                <td>${book.rating}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
            </tr>`
        });

        document.getElementById('tbl-data').innerHTML = html;
    });
}