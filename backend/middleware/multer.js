import multer from "multer";
import path from "path"; //The path module is a built-in Node.js module (not an Express module) used to work with file and directory paths safely across different operating systems.


//DEFINING WHERE TO STORE FILES AND NAMING OF FILES
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Files will be saved in the 'backend/uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Filter to accept only image files 
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase() //path.extname = .jPG,.JPEG EXTRACT KARE
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed."));
    }
};

//EXPORT THE FILE

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { filesize: 10 * 1024 * 1024 } //10MB LIMIT
})