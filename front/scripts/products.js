/* (async function () {
    const articleId = getArticleId();
    const article = await getArticle(articleId);
    console.log(article);
    hydrateArticle(article);
})();

function getArticleId() {
    return new URL(location.href).searchParams.get('id');
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
    document.getElementById('src').textContent = article.imageUrl;
} */
