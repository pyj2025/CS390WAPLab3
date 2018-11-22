(function() {
    const token = localStorage.getItem('token');
    let id = window.location.pathname.substring(13);
    fetch(`/items/${id}`, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(data => showData(data));
    let itemContainer = document.getElementById('item-info');
    function showData(data) {
        let cardTitle = document.createElement('span');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML = data.name;
        let cardDesc = document.createElement('p');
        cardDesc.innerHTML = data.description;
        itemContainer.appendChild(cardTitle);
        itemContainer.appendChild(cardDesc);
    }
}())