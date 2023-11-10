import axios from 'axios'
export let UploadToCloudinary = async (url) => {
    try {
        let form = new FormData();
        form.append('cloud_name', 'du9pkirsy')
        form.append('upload_preset','expense')
        form.append('file',url);
        let res = await axios.post('https://api.cloudinary.com/v1_1/du9pkirsy/image/upload',form)
        return res.data
    } catch (error) {
        console.error(error);
    }
}