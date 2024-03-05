const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true,
});


          

const object_func=(data)=>{
    const options = {
        method: 'POST',
        url: 'https://image-classification-api.p.rapidapi.com/classify_img',
        params: {
          url: data
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'image-classification-api.p.rapidapi.com'
        }
      };
    return options;
}

const image_func=(data)=>{
    const options = {
        method: 'GET',
        url: 'https://ocr-extract-text.p.rapidapi.com/ocr',
        params: {
          url: `${data}`
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'ocr-extract-text.p.rapidapi.com'
        }
      };
return options;
}

const text_func=(data)=>{
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
          messages: [
            {
              role: 'user',
              content: `${data}`
            }
          ],
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256,
          web_access: false
        }
      };
      return options;
};
const convertBlobUrlToCloudinary = async (imageUrl) => {
    try {
      const result = await cloudinary.uploader.upload(imageUrl);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
};
  





module.exports = { object_func, image_func, text_func,convertBlobUrlToCloudinary};