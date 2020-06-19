const PORT = 3000;

let express = require ('express');
let app = express();

let bodyParser = require("body-parser");
let path = require("path")

let fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/front/public')));

fs.readdir('./app', (err, data) => {
    if(err)return err;
    data.forEach(file =>{
        if(file == "front")return;
        let page = require(`./app/${file}`);
        app[page["Method"]](page["URL"],page["callback"]);
    });
});

app.listen(3000, ()=>{
    console.log(`Server conection in Port: ${PORT}`);
});