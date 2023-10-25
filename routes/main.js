const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const WorkExperiences =require('../models/workExp')
const Education =require('../models/education')
const Test =require('../models/test')
const Skills = require('../models/skills')
const Company = require('../models/company')
const User =require('../models/user')
const Register = require('../models/registration')
const auth = require('../middlewares/auth')
const SECRET_KEY = "SECRET_KEY";
require('dotenv').config()

routes.use(bodyParser.urlencoded({ extended: true }))
routes.use(bodyParser.json());
routes.use("/static",express.static("public"))


routes.get("/", async(req,res)=>{
    let emailLogin = req.query.email;
    let test = await Test.find({email : emailLogin});
    let edu = await Education.find({email : emailLogin});
    let work = await WorkExperiences.find({email : emailLogin});
    let skill = await Skills.find({email : emailLogin});
    let user = await User.find({email : emailLogin});
    res.render("index",
    {
        WorkExperiences: work,
        Education: edu,
        Test : test,
        Skill : skill,
        User : user,
    })
})

routes.post("/company-match", async (req, res) => {
    try {
        let emailUser = req.query.email;
      const user = await User.findOne({ email: emailUser });
      if (!user) {
        throw new Error("User not found");
      }
  
      console.log(user.email);
  
      const skills = await Skills.find({ email: user.email });
      const skillNames = skills.map(skill => skill.skillName);
      console.log(skillNames);
  
    //   const companies = await Company.find({ skillsReq: { $in: skillNames } });
    const companies = await Company.aggregate([
        {
          $match: {
            skillsReq: {
              $regex: skillNames.map(skillName => `(${skillName})`).join('|'),
              $options: 'i', // 'i' option makes it case-insensitive
            },
          },
        },
      ]);
      res.status(200).render("company-match", {
        Company: companies,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  });
  
routes.get("/newuser", (req,res)=>{
    res.render("registration")
})

routes.post("/newuser", async (req, res) =>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const name= req.body.firstname+" "+req.body.lastname;
        if(cpassword===password){
           const registerUser= new Register({
            name: name,
            email: req.body.email,
            Mobile_Number: req.body.Mobile_Number,
            gender:req.body.gender,
            password:password,
            confirmpassword:cpassword,
           })

           const registered= await registerUser.save();
           res.status(201).redirect("/login")
        }
        else{
            res.send("Password not same").status(404);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

routes.post("/login", async (req, res) => {
    try {
        // const email = req.body.email;
        const password = req.body.password;
        const user= await Register.findOne({email: "anaypund@gmail.com"});
        // const isMatch = await bcrypt.compare(password, user.password)
        if(password == user.password){
            res.status(201).redirect("/?email=" + user.email);
        }
        else{
            res.send("password not same");
        }
    } catch (error) {
        res.status(400).send("Invalid login details");
    }
})


routes.get("/login", async (req, res) => {
    res.render("login")
}) 


routes.post("/addWork", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let user = await User.findOne({email : emailUser});
        const createWork = new WorkExperiences({
            id: new mongoose.Types.ObjectId(),
            email: user.email,
            jobRole:req.body.jobRole,
            company:req.body.company,
            jobDescription:req.body.jobDesc,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
        })
        const temp = await createWork.save();
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})

routes.post("/addSkill", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let user = await User.findOne({email : emailUser});
        const createSkill = new Skills({
            id: new mongoose.Types.ObjectId(),
            email: user.email,
            skillName:req.body.skillName,
            learnFrom:req.body.learnFrom,
            skillDesc:req.body.skillDesc,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
        })
        const temp = await createSkill.save();
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})

routes.post("/addEducation", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let user = await User.findOne({email : emailUser});
        const createEdu = new Education({
            id: new mongoose.Types.ObjectId(),
            email: user.email,
            level:req.body.level,
            city:req.body.eduCity,
            state:req.body.eduState,
            country:req.body.eduCountry,
            school:req.body.eduSchool,
            grading:req.body.gradingSystem,
            university:req.body.eduCollege,
            field:req.body.eduField,
            marks:req.body.eduMarks,
            language:req.body.eduLang,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            course:req.body.course
        })
        const temp = await createEdu.save();
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})

routes.post("/addTest", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let user = await User.findOne({email : emailUser});
        const createTest = new Test({
            id: new mongoose.Types.ObjectId(),
            email: user.email,
            testName : req.body.testName,
            score:req.body.testScore,
            date:req.body.testDate,
        })
        const temp = await createTest.save();
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})

routes.post("/updateWork", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        // const temp = await WorkExperiences.findOne({id:taskID})
        const update = {
            jobRole:req.body.jobRole,
            company:req.body.company,
            jobDescription:req.body.jobDesc,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
        }
        const workedit = await WorkExperiences.findByIdAndUpdate({_id:id}, update,{
            new:true,
            runValidators:true,
        } )
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})

routes.post("/updateSkill", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        const update = {
            skillName:req.body.skillName,
            learnFrom:req.body.learnFrom,
            skillDesc:req.body.skillDesc,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
        }
        const skillEdit = await Skills.findByIdAndUpdate({_id:id}, update,{
            new:true,
            runValidators:true,
        } )
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})

routes.post("/updateEducation", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        const update = {
            level:req.body.level,
            city:req.body.eduCity,
            state:req.body.eduState,
            country:req.body.eduCountry,
            school:req.body.eduSchool,
            grading:req.body.gradingSystem,
            university:req.body.eduCollege,
            field:req.body.eduField,
            marks:req.body.eduMarks,
            language:req.body.eduLang,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            course:req.body.course
        }
        const eduEdit = await Education.findByIdAndUpdate({_id:id}, update,{
            new:true,
            runValidators:true,
        } )
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})
routes.post("/updateTest", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        const update = {
            testName : req.body.testName,
            score:req.body.testScore,
            date:req.body.testDate,
        }
        const testEdit = await Test.findByIdAndUpdate({_id:id}, update,{
            new:true,
            runValidators:true,
        } )
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})
routes.post("/deleteEdu", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        
        
        const testEdit = await Education.findByIdAndDelete({_id:id})
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})
routes.post("/deleteWork", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        const testEdit = await WorkExperiences.findByIdAndDelete({_id:id})
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})
routes.post("/deleteSkill", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        const skillEdit = await Skills.findByIdAndDelete({_id:id})
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})
routes.post("/deleteTest", async (req, res)=>{{
    try {
        let emailUser = req.query.email;
        let id= req.query.id;
        id= new mongoose.Types.ObjectId(id);
        const testEdit = await Test.findByIdAndDelete({_id:id})
        res.redirect("/?email=" + emailUser);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}})



module.exports = routes;
