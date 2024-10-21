const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jepg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLocaleLowerCase()
        );
        if(mimetype && path.extname){
            return cb(null,true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1},

});

const controller = require("../controllers/imagenes.controller");

router.get("/", controller.allImages);
router.get("/:IDImagen", controller.showImage);
router.post("/", upload.single("imagen"), controller.storeImage);
router.put("/:IDImagen", controller.updateImage);
router.delete("/:IDImagen", controller.destroyImage);

module.exports = router;