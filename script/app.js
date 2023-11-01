document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const results = document.getElementById("results");
    const token_reg = "AIzaSyBesqu6dqIGh136psIOEZNrdH2WmBJF8GU";

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            searchBooks(query);
        }
    });

    function searchBooks(query) {
        // Make an API request to the Google Books API using the 'fetch' function.
        // You'll need to replace 'YOUR_API_KEY' with your actual API key.
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${token_reg}`)
            .then((response) => response.json())
            .then((data) => displayResults(data.items))
            .catch((error) => console.error(error));
    }

    function displayResults(books) {
        results.innerHTML = ""; // Clear previous results
        books.forEach((book) => {
            const bookTitle = book.volumeInfo.title;
            const bookAuthors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
            const bookDescription = book.volumeInfo.description ? book.volumeInfo.description : "No description available";
            const bookThumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "No image available";

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <img src="${bookThumbnail}" alt="${bookTitle}">
                <h2>${bookTitle}</h2>
                <p>By ${bookAuthors}</p>
                <p>${bookDescription}</p>
            `;

            results.appendChild(bookElement);
        });
    }
});
