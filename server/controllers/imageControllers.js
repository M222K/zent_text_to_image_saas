import userModel from '../models/userModels.js'
import FormData from 'form-data'
import axios from 'axios'


export const generateImage = async (req, res) => {
    try {

        //get the input prompt and userid from req body
        //userid will be taken via token from middleware
        const { userId, prompt } = req.body || {};

        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }

        //if available then check the user credit balance
        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({
                success: false,
                message: "No credit Balance",
                creditBalance: user.creditBalance
            })
        }

        //via clipdrop docs -create a multipart formdata
        const formData = new FormData(); //create object from it
        formData.append('prompt', prompt); //add the prompt

        //we are using axios to make api request-alternative-(hitesh-course currency crypto) -format .post(api endpoint,prompt in form, headers)
        //store the response of api call in object
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        //from arraybuffer we need to convert the image to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        //create the image url
        const resultImage = `data:image/png;base64,${base64Image}`;

        //deduct the usercredit and send the image in response
        await userModel.findByIdAndUpdate(user._id, {
            creditBalance: user.creditBalance - 1
        })

        res.json({
            success: true,
            message: "Image generated",
            creditBalance: user.creditBalance - 1,
            resultImage //sent the image uri
        })







    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })

    }
}