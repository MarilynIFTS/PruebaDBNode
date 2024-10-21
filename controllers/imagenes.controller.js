const db = require("../db/db");

const allImages = (req, res) => {
    const sql = "SELECT * FROM imagenes";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        res.json(rows);
    });
};

const showImage = (req, res) =>{
    const {IDImagen} = req.params;
    const sql = "SELECT * FROM imagenes WHERE IDImagen = ?";
    db.query(sql,[IDImagen], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(rows.length === 0){
            return res.status(404).send({error: "ERROR: No existe la imagen buscada"})
        }
        res.json(rows[0]);
    });
};

const storeImage = (req, res) => {
    console.log(req.file);
    let imageName = "";
    if (req.file) {
        imageName = req.file.filename;
    }

    const { usuario } = req.body; // Asegúrate de que el campo usuario esté siendo enviado

    const sql = "INSERT INTO imagenes (imagen, usuario) VALUES (?, ?)";
    db.query(sql, [imageName, usuario], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde" });
        }

        const imagenData = { ...req.body, id: result.insertId };
        res.status(201).json(imagenData);
    });
};

const updateImage = (req, res) =>{
    const {IDImagen} = req.params;
    const {imagen} = req.body;
    const sql = "UPDATE imagenes SET imagen = ? WHERE IDImagen = ?";
    db.query(sql,[imagen, IDImagen], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: la categoría a imagen no existe"})
        }

        const imagenData = {...req.body, id: result.params};
        res.json(imagenData)
    });
};

const destroyImage = (req, res) =>{
    const {IDImagen} = req.params;
    const sql = "DELETE FROM imagenes WHERE IDImagen = ?";
    db.query(sql,[IDImagen], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: la imagen a eliminar no existe"})
        }
        res.json({mensaje: "Imagen eliminada"})
    });
};

module.exports = {
    allImages,
    showImage,
    storeImage,
    updateImage,
    destroyImage,
};