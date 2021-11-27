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
                <td class="text-center">
                    <button onclick="edit('${book._id}');" class="btn btn-sm btn-dark">
                        <i class="fa fa-edit" style="margin-right: 5px;"></i>
                        Edit
                    </button>
                    <button onclick="deleteBook('${book._id}');" class="btn btn-sm btn-dark">
                        <i class="fa fa-trash" style="margin-right: 5px;"></i>
                        Delete
                    </button>
                </td>
            </tr>`
        });

        document.getElementById('tbl-data').innerHTML = html;
    });
}

function add() {
    let title = document.getElementById('txt-title').value;
    let author = document.getElementById('txt-author').value;
    let price = document.getElementById('txt-price').value;
    let rating = document.getElementById('txt-rating').value;
    let genre = document.getElementById('txt-genre').value;
    let year = document.getElementById('txt-year').value;

    if(!title || !author || !price || !rating || !genre || !year) {
        alert(`All fields are required.`);
        return;
    }

    if(parseInt(rating) < 0 || parseInt(rating) > 10) {
        alert(`Rating should be between 0 and 10.`);
        return;
    }

    if(year.length !== 4) {
        alert(`Please provide a valid year.`);
        return;
    }

    let data = {
        title,
        author,
        price,
        rating,
        genre,
        year
    };

    
    let id = window.location.href.split('id=').pop();
    if(!id || id.length !== 24) {
        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            alert("Book saved successfully!");
            window.location.href = "index.html";
        });
    }
    else {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Book saved successfully!");
            window.location.href = "index.html";
        });
    }
}

function edit(id) {
    window.location.href = `new.html?id=${id}`;
}

function load() {
    let id = window.location.href.split('id=').pop();
    
    if(!id || id.length !== 24) return;
    
    fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('txt-title').value = data.title;
        document.getElementById('txt-author').value = data.author;
        document.getElementById('txt-price').value = data.price;
        document.getElementById('txt-rating').value = data.rating;
        document.getElementById('txt-genre').value = data.genre;
        document.getElementById('txt-year').value = data.year;
    });
}

function deleteBook(id) {
    if(confirm(`Are you sure you want to delete it?`)) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            alert("Book deleted successfully!");
            window.location.reload();
        });
    }
}