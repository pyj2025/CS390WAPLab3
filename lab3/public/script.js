(function() {
    var urlParams = new URLSearchParams(window.location.search);
    const token = localStorage.getItem('token');
    let promise;
    const headers = {
        'Authorization': token
    };
    if(window.location.search.includes('?')) {
        promise = fetch(`/items/search${window.location.search}`, { headers });
    } else {
        promise = fetch(`/items`, { headers });
    }
    promise
        .then(res => res.json())
        .then(data => displayItems(data));
    let container = document.getElementById('container');
    function displayItems(items) {
        items.forEach(item => displayItem(item));
    }
    function displayItem(item) {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('col');
        cardDiv.classList.add('m4');
        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        let cardTitle = document.createElement('span');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML = item.name;
        let cardDesc = document.createElement('p');
        cardDesc.innerHTML = item.description;
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardDesc);
        cardDiv.appendChild(cardContent);
        cardDiv.onclick = () => {
            window.location.href=`/item-detail/${item.id}`;
        }
        container.appendChild(cardDiv);
    }
}())