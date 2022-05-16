(async function () {
    const articleId = getArticleId();
    console.log(articleId);
    const article = await getArticle(articleId);
    console.log(article);
    hydrateArticle(article);
})();

function getArticleId() {
    return new URL(location.href).searchParams.get('id');
    addBasket(article);
}

function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/products/${articleId}`) // link to backend products
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json(); // transform to json
        })
        .then(function (articles) {
            // taking all articles
            return articles;
        })
        .catch(function (error) {
            // if doesnt work display error
            alert(error);
        });
}

function hydrateArticle(article) {
    document.getElementById('imgProductPage').src = article.imageUrl;
    document.getElementById('title').textContent = article.name;
    document.getElementById('description').textContent = article.description;
    document.getElementById('price').textContent = article.price;
    document.getElementById('colors').textContent = article.colors;
    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement('option');
        document.querySelector('#colors').appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
}
