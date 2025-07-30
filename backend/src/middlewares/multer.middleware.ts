import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads')
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}-${file.fieldname}${ext}`)
    },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only images are allowed'));
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});
