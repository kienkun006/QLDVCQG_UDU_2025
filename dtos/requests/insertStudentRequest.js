import Joi from "joi";

class insertStudentRequest{
    constructor(data){
        this.msv = data.msv;
        this.name = data.name;
        this.dob = data.dob;
        this.class = data.class;
        this.score = data.score;
    }
    static validate(data){
        const schema = Joi.object({
             msv: Joi.string().required(),
            name: Joi.string().required(),
            dob: Joi.date().iso().required(),        
            class: Joi.string().required(),
            score: Joi.number().min(0).max(10).required()
        });
        return schema.validate(data) //key-value
    }
}
export default insertStudentRequest;