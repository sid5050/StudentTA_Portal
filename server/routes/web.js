const express = require('express');
const StudentController = require('../controllers/studentController');
const {StudentModel, validate} = require("../models/Student");
const {QueryModel, validateQuery} = require("../models/Query");
const bcrypt = require('bcrypt');

const router = express.Router();

// router.get('/student', StudentController.getAllDoc)

router.post("/signup", async(req, res) => {
    try {
        // console.log(req.body);
        const { error } = validate(req.body);
        console.log(error);
        if(error)
            return res.status(400).send({message: error.details.details[0].message});
        const user = await StudentModel.findOne({rollno: req.body.rollno});
        if(user)
            return res.status(409).send({message: "User with Roll Number already exists!!"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new StudentModel({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"});
    } catch(err) {
        console.log(err);
        res.status(500).send({message: "Internal Server Error!"});
    }
})

router.post("/addquery", async(req, res) => {
    try {
        console.log(req.body);
        console.log("Here, In add query");
        // const { error } = validateQuery(req.body);
        // if(error)
        //     return res.status(400).send({message: error.details.details[0].message});
        const student = await StudentModel.findOne({rollno: req.body.studentrollno});
        // // console.log(student.generateAuthToken());
        console.log("Student found", req.body);
        if(!student){
            console.log("Student not found");
            return res.status(401).send({message: "Error submitting query!"});
        }
        console.log("Before Query submit");
        await new QueryModel({...req.body}).save();
        console.log("Query Submitted");
        return res.status(200).send({message: "Query Submitted!!"});
    } catch(error) {
        console.log(error);
        return res.status(500).send({message: "Server Error!!"});
    }
})

router.get("/getqueries", async(req, res) => {
    try{
        console.log(req.query);
        const queries = await QueryModel.find({rollno : req.query.rollno});
        return res.status(200).send(queries);
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;