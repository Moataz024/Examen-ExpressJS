const yup = require('yup');

const validate = async (req,res,next) => {
    try{
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            adresse: yup.string().required(),
        })
        await schema.validate(req.body);
        next();
    }
    catch (error){
        res.status(400).send({ error: error.message });
    }
}
module.exports = {validate};