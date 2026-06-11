import multer from "multer";

const storage = multer.diskStorage({
     destination: (req, file, callback) => {
        callback(null, 'upload/images/');
    },
    filename:(req,file,callback)=>{
        callback(null, Date.now()+'_'+file.originalname);
    }
});
const imageUpload = multer({storage:storage});

export default imageUpload;