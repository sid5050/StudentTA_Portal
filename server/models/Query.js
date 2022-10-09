const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

// Define Schema
const querySchema = new mongoose.Schema({
    examname: {
        type: String,
        required: true,
        trim: true
    },
    coursename: {
        type: String,
        required: true,
        trim: true
    },
    questionnum: {
        type: Number,
        required: true,
        trim: true
    },
    tarollno: {
        type: String,
        required: true,
        trim: true
    },
    studentrollno: {
        type: String,
        required: true,
        trim: true
    },
    tacomment: {
        type: String,
        trim: true,
        default: "",
    },
    studentcomment: {
        type: String,
        required: true,
        trim: true
    },
    isactive: {
        type: Boolean,
        required: true,
        trim: true,
    },
})

// querySchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"});
//     return token;
// }

//Model
const QueryModel = mongoose.model("query", querySchema);

const validateQuery = (data) => {
    const schema = Joi.object({
        examname: Joi.string().required().label("examname"),
        coursename: Joi.string().required().label("coursename"),
        questionnum: Joi.number().required().label("questionnum"),
        tarollno: Joi.string().required().label("tarollno"),
        studentrollno: Joi.string().required().label("studentrollno"),
        // tacomment: Joi.string().label("tacomment"),
        studentcomment: Joi.string().required().label("studentcomment"),
        isactive: Joi.boolean().required().label("isactive")
        // examname: Joi.string().required().label("examname"),
        // password: passwordComplexity().required().label("password"),
        // role: Joi.string().required().label("role")
    })
    return schema.validate(data);
    // const schema = Joi.string().required().label("rollno");
    // const schema = Joi.string().required().label("rollno");
}

module.exports = {QueryModel, validateQuery};