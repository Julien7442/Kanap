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
    document.getElementById('items').innerHTML += `
    <a href="./product.html?id=${article._id}">
    <article>
    <img
            src="${article.imageUrl}"
            alt="Lorem ipsum dolor sit amet, Kanap name1" /><h3 class="productName">${article.name}</h3><p class="productDescription">
                ${article.description}
            </p></></>
</article></a>`;
}
