const express = require("express");
const app = express();

app.use(express.json());

const platoRouter = require("./routers/plato.router");
const categoriaRouter = require("./routers/categoria.router");
app.use("/plato", platoRouter);
app.use("/categoria", categoriaRouter);

app.get("/", (req, res) => {
    res.send("Hola Menu");
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));