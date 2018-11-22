const express = require('express')
const app = express()
const port = 8650

let fs = require('fs');
let path = require('path');
let randtoken = require('rand-token');
let bodyParser = require('body-parser');

var userList = [
    {
        username: 'cs390wap',
        password: 'cs390wap'
    }
]

var itemList = [];

let itemListIndex = 4;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 2-a /items
// 3
app.get('/items', (req, res) => {
    const authorization = req.get('authorization');
    if (authorization != undefined && authorization.length ==20 ){
        res.status(200).send(itemList);
    }
    else {
        res.status(404).send({message: "Authorize First!!!"});
    }
})

// 2-b GET /items/search
// 3
app.get('/items/search', (req, res) => {

    let auth = req.get('authorization');

    if(auth != undefined && auth.length == 20) {
        let query = req.query.search;
        let price = req.query.price;
        let rating = req.query.rating;

        var tmpList = itemList.filter(item => {
            
            if (item.name.includes(query) && (price == 'low' && item.price < 20) && rating == item.rate) {
                return item
            } 

            if (item.name.includes(query) && (price == 'mid' && item.price >= 20 && item.price <= 40) && rating == item.rate) {
                return item
            } 

            if (item.name.includes(query) && (price == 'high' && item.price > 40) && rating == item.rate) {
                return item
            } 

            if (item.name.includes(query) && (price == 'all') && rating == item.rate) {
                return item
            } 
        });
   
        res.send(tmpList);

    }
    else {
        res.status(404).send({ message: 'Authorize First!!!' });
    }

});


// 2-c GET /items/<id>
// 3
app.get('/items/:itemID', (req, res) => {
    let auth = req.get('authorization');

    if(auth != undefined && auth.length == 20){
        let itemID = path.parse(req.params.itemID).base;
        res.send(itemList[itemID]);
    } 
    else {
        res.status(404).send({ message: 'Authorize First!!!' });
    }

});

// 2-d POST /new-item 
// 3
app.post('/new-item', (req, res) => {

    let auth = req.get('authorization');

    if(auth != undefined && auth.length == 20) {
        
        let itemName = req.body.name;
        let itemDescription = req.body.description;
        let itemPrice = req.body.price;
        let itemRate = req.body.rating;

        if(itemName === "" && itemDescription === "" && itemPrice === "" && itemRate === "") {
            res.send(404).send();
        }
        else if (itemPrice < 0.1) {
            res.send(404).send();
        }
        else if (itemRate < 1 || itemRate > 5) {
            res.send(404).send();
        }
        else {
            itemListIndex++;

            itemList.push({
                id: itemListIndex, 
                name: itemName, 
                description: itemDescription, 
                price: itemPrice, 
                rate: itemRate
            })

            res.sendFile('/index.html', { root: 'public' });
        }
    }
    else {
        res.status(404).send({ message: 'Authorize First!!!' });
    }    
});

// 2-e POST /login
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let checker = 0;
    for (let i = 0; i < userList.length; i++) {
        let user = userList[i];
        
        if (username === user.username && password === user.password) {
            checker = 1;
            let token = randtoken.generate(20);
            
            res.setHeader('Set-Authorization', token); //authorization 만듬
            res.send({ message: 'Authentication successful' });
        }
    }
    if (checker == 0) {
        res.status(404).send({ message: 'Authentication unsuccessful' });
    }
});

// 2-f login
app.get('/login', (req, res) => {
    return res.sendFile(`/login.html`, { root: 'public/login' });
})

// 2-g /item-detail/<id>
app.get('/item-detail/:detailID', (req, res) => {
    return res.sendFile(`/item-detail.html`, { root: 'public/item-detail' });
})

// 2-h GET/
app.get('/', (req, res) => {
    return res.sendFile(`/index.html`, { root: 'public' });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))