const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

// Define Schema
const studentSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
})

studentSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"});
    return token;
}

//Model
const StudentModel = mongoose.model("student", studentSchema);

const validate = (data) => {
    const schema = Joi.object({
        rollno: Joi.string().required().label("rollno"),
        password: passwordComplexity().required().label("password"),
        role: Joi.string().required().label("role")
    })
    return schema.validate(data);
    // const schema = Joi.string().required().label("rollno");
    // const schema = Joi.string().required().label("rollno");
}

module.exports = {StudentModel, validate};