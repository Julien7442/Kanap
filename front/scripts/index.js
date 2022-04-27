items(); // items from HTML

async function items() {
    const articles = await getArticles(); // articles contains all products await till promise is resolve
    for (article of articles) {
        // loop to show all article of articles
        displayArticle(article);
        console.log(articles);
    }
}

function getArticles() {
    return fetch('http://localhost:3000/api/products/') // link to backend products
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json(); // transform to json
        })
        .then(function (articles) {
            // taking all articles
            return articles;
            console.log(articles);
        })
        .catch(function (error) {
            // if doesnt work display error
            alert(error);
        });
}

function displayArticle(article) {
    // display different articles. Taking id, imageUrl, name and description
    const templateElement = document.getElementById('templateArticle'); // product inside html template
    const cloneElement = document.importNode(templateElement.content, true); // clone the product
    // taking everything needed from product.js to display on screen
    cloneElement.getElementById('imgProduct').src = article.imageUrl; // image
    cloneElement.getElementById('productName').textContent = article.name; // name
    cloneElement.getElementById('idProduct').href += '?id' + article._id; // id
    cloneElement.getElementById('productDescription').textContent =
        article.description; // description

    document.getElementById('items').appendChild(cloneElement);
}
