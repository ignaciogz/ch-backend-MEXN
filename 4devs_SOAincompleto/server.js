const { config } = require('./config');
const serverMw = require('./utils/middlewares/serverMw');

const express = require("express");

const app = express();
const serverRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

serverRoutes(app);

app.use(serverMw.routeNotImplemented);

const server = app.listen(config.PORT, () => {
    console.log(`Server on http://localhost:${config.PORT}`);
})

server.on("error", error => console.log(error));