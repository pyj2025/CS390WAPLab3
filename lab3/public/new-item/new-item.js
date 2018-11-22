(function() {
    const form = document.getElementById('new-item-form');
    const token = localStorage.getItem('token');
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = new URLSearchParams();
        const headers = {
            'Authorization': token
        };
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }
        fetch("/new-item", {
            method: "POST",
            body: data,
            headers: headers
        })
        .then(res => {
            if (res.ok) {
                window.location.href = "/";
            }
        });
    }
}())
