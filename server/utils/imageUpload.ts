import cloudinary from "./cloudinary";

const uploadImageOnCloudinary = async (file: Express.Multer.File) => {


    // jse frontend se koi image seledct ki tu usk aoath aaata hai pr vi directly save ni krskte islie base64 m krra
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    return uploadResponse.secure_url;
};

export default uploadImageOnCloudinary;