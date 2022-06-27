// const  API_URL = "http://192.168.43.242:8000";
// const  API_URL = "http://localhost:8000";
const  API_URL = process.env.API_URL;



const MEDIA_S3= process.env.MEDIA_S3;
export {API_URL,MEDIA_S3};