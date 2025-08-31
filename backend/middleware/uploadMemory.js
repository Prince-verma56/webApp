import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const ext = file.mimetype && file.mimetype.split("/")[1];
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only JPEG/PNG images are allowed"), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter,
});

export default upload;
