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
      const user1 = await User.find({ email: emailUser });
      
      if (!user) {
        throw new Error("User not found");
      }
  
      console.log(user.email);
  
      const skills = await Skills.find({ email: user.email });
      const skillNames = skills.map(skill => skill.skillName);
      console.log(skillNames);
  
    //   const tempCreate = [
    //         {
    //             "companyName": "Amazon Web Services",
    //             "mail": "aws@amazon.com",
    //             "jobTitle": "Cloud Solutions Architect",
    //             "skillsReq": ["Cloud Computing", "AWS Services", "Architecture Design", "Security"],
    //             "jobDesc": "Designing and implementing cloud solutions for AWS clients | Level: Solutions Architect | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "IBM India",
    //             "mail": "ibm-india@ibm.com",
    //             "jobTitle": "Cybersecurity Analyst",
    //             "skillsReq": ["Cybersecurity", "Security Analysis", "Incident Response", "Security Tools"],
    //             "jobDesc": "Monitoring and analyzing security threats for IBM clients | Level: Analyst | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Microsoft India",
    //             "mail": "ms-india@microsoft.com",
    //             "jobTitle": "Software Engineer",
    //             "skillsReq": ["C#", "Azure Services", "Software Development", "Agile Methodology"],
    //             "jobDesc": "Developing software solutions for Microsoft's Azure platform | Level: Engineer | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Google India",
    //             "mail": "google-india@gmail.com",
    //             "jobTitle": "Data Analyst",
    //             "skillsReq": ["Data Analysis", "SQL", "Data Visualization", "Statistics"],
    //             "jobDesc": "Analyzing data and generating insights for Google services | Level: Analyst | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Netflix India",
    //             "mail": "netflix-india@netflix.com",
    //             "jobTitle": "Content Analyst",
    //             "skillsReq": ["Data Analysis", "Content Evaluation", "Recommendation Algorithms", "Streaming Services"],
    //             "jobDesc": "Analyzing viewer data to improve content recommendations and streaming experience | Level: Analyst | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Uber India",
    //             "mail": "uber-india@uber.com",
    //             "jobTitle": "Mobile App Developer",
    //             "skillsReq": ["Java", "Android Development", "Mobile App Testing", "UI/UX Design"],
    //             "jobDesc": "Developing mobile apps for Uber's ride-sharing platform | Level: Developer | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Salesforce India",
    //             "mail": "salesforce-india@salesforce.com",
    //             "jobTitle": "CRM Consultant",
    //             "skillsReq": ["Customer Relationship Management", "Salesforce CRM", "Consulting", "Business Analysis"],
    //             "jobDesc": "Consulting and implementing CRM solutions for Salesforce clients | Level: Consultant | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Adobe India",
    //             "mail": "adobe-india@adobe.com",
    //             "jobTitle": "UI/UX Designer",
    //             "skillsReq": ["UI/UX Design", "Adobe Creative Suite", "User Research", "Prototyping"],
    //             "jobDesc": "Designing intuitive user interfaces and engaging user experiences for Adobe products | Level: Designer | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Tata Consultancy Services (TCS)",
    //             "mail": "tcs-india@tcs.com",
    //             "jobTitle": "Data Scientist",
    //             "skillsReq": ["Python", "Machine Learning", "Data Analytics", "Statistics"],
    //             "jobDesc": "Working on data science and analytics projects for TCS clients | Level: Data Scientist | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Flipkart India",
    //             "mail": "flipkart-india@flipkart.com",
    //             "jobTitle": "E-commerce Specialist",
    //             "skillsReq": ["E-commerce Management", "Inventory Control", "Online Marketing", "Vendor Management"],
    //             "jobDesc": "Managing e-commerce operations and vendor relationships for Flipkart | Level: Specialist | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Swiggy India",
    //             "mail": "swiggy-india@swiggy.com",
    //             "jobTitle": "Food Delivery Coordinator",
    //             "skillsReq": ["Order Coordination", "Customer Service", "Delivery Tracking", "Problem Resolution"],
    //             "jobDesc": "Coordinating food deliveries and ensuring customer satisfaction for Swiggy | Level: Coordinator | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Airtel India",
    //             "mail": "airtel-india@airtel.com",
    //             "jobTitle": "Telecom Support Specialist",
    //             "skillsReq": ["Customer Support", "Telecom Services", "Problem Resolution", "Technical Support"],
    //             "jobDesc": "Providing support for Airtel's telecom services and assisting customers | Level: Support Specialist | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Paytm India",
    //             "mail": "paytm-india@paytm.com",
    //             "jobTitle": "Finance Analyst",
    //             "skillsReq": ["Financial Analysis", "Data Analysis", "Financial Modeling", "Risk Assessment"],
    //             "jobDesc": "Analyzing financial data and assessing risks for Paytm's financial services | Level: Analyst | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Myntra India",
    //             "mail": "myntra-india@myntra.com",
    //             "jobTitle": "Fashion Stylist",
    //             "skillsReq": ["Fashion Styling", "Trend Analysis", "Visual Merchandising", "Fashion Photography"],
    //             "jobDesc": "Creating trendy and appealing fashion collections for Myntra's online store | Level: Stylist | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "MakeMyTrip India",
    //             "mail": "makemytrip-india@makemytrip.com",
    //             "jobTitle": "Travel Consultant",
    //             "skillsReq": ["Travel Planning", "Customer Service", "Destination Knowledge", "Ticket Booking"],
    //             "jobDesc": "Assisting customers in planning and booking their travel experiences | Level: Consultant | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "BookMyShow India",
    //             "mail": "bookmyshow-india@bookmyshow.com",
    //             "jobTitle": "Event Coordinator",
    //             "skillsReq": ["Event Planning", "Ticketing", "Customer Engagement", "Venue Management"],
    //             "jobDesc": "Coordinating events and ticketing for BookMyShow's platform | Level: Coordinator | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Zee Entertainment India",
    //             "mail": "zeeindia@zeeentertainment.com",
    //             "jobTitle": "Media Analyst",
    //             "skillsReq": ["Media Analysis", "Content Evaluation", "Audience Insights", "Media Trends"],
    //             "jobDesc": "Analyzing media content and audience behavior for Zee Entertainment | Level: Analyst | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Reliance Retail India",
    //             "mail": "relianceretail-india@reliance.com",
    //             "jobTitle": "Retail Analyst",
    //             "skillsReq": ["Retail Analysis", "Market Research", "Inventory Control", "Business Strategy"],
    //             "jobDesc": "Analyzing retail data and optimizing operations for Reliance Retail | Level: Analyst | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Infosys",
    //             "mail": "infosys@infosys.com",
    //             "jobTitle": "Software Developer",
    //             "skillsReq": ["Java", "Python", "Software Development", "Database Management"],
    //             "jobDesc": "Developing software solutions and applications for clients | Level: Developer | Location: Bengaluru | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Bengaluru"
    //         },
    //         {
    //             "companyName": "Tata Consultancy Services",
    //             "mail": "tcs@tcs.com",
    //             "jobTitle": "Data Analyst",
    //             "skillsReq": ["Data Analysis", "SQL", "Data Visualization", "Statistics"],
    //             "jobDesc": "Analyzing data and generating insights for clients | Level: Analyst | Location: Mumbai | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Mumbai"
    //         },
    //         {
    //             "companyName": "Wipro",
    //             "mail": "wipro@wipro.com",
    //             "jobTitle": "Network Engineer",
    //             "skillsReq": ["Network Administration", "Cisco", "Troubleshooting", "Network Security"],
    //             "jobDesc": "Managing and optimizing network infrastructure for clients | Level: Engineer | Location: Pune | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "14000",
    //             "location": "Pune"
    //         },
    //         {
    //             "companyName": "HCL Technologies",
    //             "mail": "hcl@hcl.com",
    //             "jobTitle": "Machine Learning Engineer",
    //             "skillsReq": ["Machine Learning", "Python", "Deep Learning", "Data Science"],
    //             "jobDesc": "Working on machine learning projects and AI solutions | Level: Engineer | Location: Noida | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Noida"
    //         },
    //         {
    //             "companyName": "Reliance Industries",
    //             "mail": "reliance@reliance.com",
    //             "jobTitle": "Electrical Engineer",
    //             "skillsReq": ["Electrical Engineering", "Power Systems", "Renewable Energy", "Energy Management"],
    //             "jobDesc": "Designing and managing electrical systems for various projects | Level: Engineer | Location: Mumbai | Years of Exp: 3-7 years",
    //             "duration": "4-6 Months",
    //             "stipend": "16000",
    //             "location": "Mumbai"
    //         },
    //         {
    //             "companyName": "Paytm",
    //             "mail": "paytm@paytm.com",
    //             "jobTitle": "Mobile App Developer",
    //             "skillsReq": ["Android Development", "iOS Development", "Mobile App Testing", "UI/UX Design"],
    //             "jobDesc": "Developing mobile apps for Paytm's payment and financial services | Level: Developer | Location: Noida | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Noida"
    //         },
    //         {
    //             "companyName": "Zoho Corporation",
    //             "mail": "zoho@zoho.com",
    //             "jobTitle": "UI/UX Designer",
    //             "skillsReq": ["UI/UX Design", "Wireframing", "User Research", "Prototyping"],
    //             "jobDesc": "Designing user interfaces and experiences for Zoho's cloud software | Level: Designer | Location: Chennai | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Chennai"
    //         },
    //         {
    //             "companyName": "Swiggy",
    //             "mail": "swiggy@swiggy.com",
    //             "jobTitle": "Data Scientist",
    //             "skillsReq": ["Python", "Machine Learning", "Data Analytics", "Statistics"],
    //             "jobDesc": "Analyzing customer data and optimizing food delivery services | Level: Data Scientist | Location: Bengaluru | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Bengaluru"
    //         },
    //         {
    //             "companyName": "Ola",
    //             "mail": "ola@ola.com",
    //             "jobTitle": "Product Manager",
    //             "skillsReq": ["Product Management", "Market Research", "Business Strategy", "Agile Methodology"],
    //             "jobDesc": "Managing and improving Ola's ride-sharing products and services | Level: Product Manager | Location: Bengaluru | Years of Exp: 3-7 years",
    //             "duration": "4-6 Months",
    //             "stipend": "16000",
    //             "location": "Bengaluru"
    //         },
    //         {
    //             "companyName": "Accenture",
    //             "mail": "accenture@accenture.com",
    //             "jobTitle": "Cybersecurity Analyst",
    //             "skillsReq": ["Cybersecurity", "Incident Response", "Network Security", "Security Tools"],
    //             "jobDesc": "Protecting client systems and data from cyber threats | Level: Analyst | Location: Hyderabad | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "14000",
    //             "location": "Hyderabad"
    //         },
    //         {
    //             "companyName": "Cognizant",
    //             "mail": "cognizant@cognizant.com",
    //             "jobTitle": "Software Engineer",
    //             "skillsReq": ["Java", "C#", "Software Development", "Agile Methodology"],
    //             "jobDesc": "Developing software solutions for clients across industries | Level: Engineer | Location: Kolkata | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Kolkata"
    //         },
    //         {
    //             "companyName": "Tech Mahindra",
    //             "mail": "techm@techmahindra.com",
    //             "jobTitle": "Network Administrator",
    //             "skillsReq": ["Network Administration", "Routing and Switching", "Firewall Management", "Troubleshooting"],
    //             "jobDesc": "Managing network infrastructure and ensuring connectivity | Level: Administrator | Location: Pune | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Pune"
    //         },
    //         {
    //             "companyName": "Hindustan Unilever",
    //             "mail": "hul@unilever.com",
    //             "jobTitle": "Market Analyst",
    //             "skillsReq": ["Market Research", "Consumer Insights", "Data Analysis", "Business Strategy"],
    //             "jobDesc": "Analyzing market trends and consumer behavior for product strategies | Level: Analyst | Location: Mumbai | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Mumbai"
    //         },
    //         {
    //             "companyName": "Myntra",
    //             "mail": "myntra@myntra.com",
    //             "jobTitle": "Fashion Stylist",
    //             "skillsReq": ["Fashion Styling", "Trend Analysis", "Visual Merchandising", "Fashion Photography"],
    //             "jobDesc": "Creating trendy and appealing fashion collections for Myntra's online store | Level: Stylist | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "MakeMyTrip",
    //             "mail": "makemytrip@makemytrip.com",
    //             "jobTitle": "Travel Consultant",
    //             "skillsReq": ["Travel Planning", "Customer Service", "Destination Knowledge", "Ticket Booking"],
    //             "jobDesc": "Assisting customers in planning and booking their travel experiences | Level: Consultant | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Walmart India",
    //             "mail": "walmart@walmart.com",
    //             "jobTitle": "Supply Chain Analyst",
    //             "skillsReq": ["Supply Chain Management", "Inventory Control", "Data Analysis", "Logistics"],
    //             "jobDesc": "Optimizing supply chain operations and inventory management | Level: Analyst | Location: Gurugram | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Gurugram"
    //         },
    //         {
    //             "companyName": "Reliance Jio",
    //             "mail": "jio@reliance.com",
    //             "jobTitle": "Telecom Engineer",
    //             "skillsReq": ["Telecommunication", "Network Planning", "Wireless Technologies", "RF Engineering"],
    //             "jobDesc": "Managing and optimizing telecom networks for Reliance Jio | Level: Engineer | Location: Mumbai | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "14000",
    //             "location": "Mumbai"
    //         },
    //         {
    //             "companyName": "Bajaj Auto",
    //             "mail": "bajaj@bajajauto.com",
    //             "jobTitle": "Mechanical Engineer",
    //             "skillsReq": ["Mechanical Engineering", "CAD Design", "Product Development", "Manufacturing Processes"],
    //             "jobDesc": "Designing and improving mechanical systems for Bajaj Auto vehicles | Level: Engineer | Location: Pune | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Pune"
    //         },
    //         {
    //             "companyName": "TCS",
    //             "mail": "tcs@tcs.com",
    //             "jobTitle": "UI/UX Designer",
    //             "skillsReq": ["UI/UX Design", "User Interface Design", "Prototyping", "User Research"],
    //             "jobDesc": "Designing user-friendly interfaces for various web and mobile applications | Level: Designer | Location: Chennai | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "13000",
    //             "location": "Chennai"
    //         },
    //         {
    //             "companyName": "Airtel",
    //             "mail": "airtel@airtel.com",
    //             "jobTitle": "Network Engineer",
    //             "skillsReq": ["Network Administration", "Telecom Technologies", "Troubleshooting", "Network Security"],
    //             "jobDesc": "Managing and optimizing telecom networks for Airtel | Level: Engineer | Location: Gurugram | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Gurugram"
    //         },
    //         {
    //             "companyName": "OYO Rooms",
    //             "mail": "oyo@oyorooms.com",
    //             "jobTitle": "Hospitality Manager",
    //             "skillsReq": ["Hotel Management", "Customer Service", "Hospitality Operations", "Guest Relations"],
    //             "jobDesc": "Managing hospitality operations and guest experiences for OYO properties | Level: Manager | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Tata Motors",
    //             "mail": "tatamotors@tatamotors.com",
    //             "jobTitle": "Automotive Engineer",
    //             "skillsReq": ["Automotive Engineering", "Vehicle Design", "Testing and Validation", "Manufacturing Processes"],
    //             "jobDesc": "Designing and improving automotive systems and vehicles | Level: Engineer | Location: Pune | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Pune"
    //         },
    //         {
    //             "companyName": "PayPal India",
    //             "mail": "paypal@paypal.com",
    //             "jobTitle": "Data Analyst",
    //             "skillsReq": ["Data Analysis", "SQL", "Data Visualization", "Statistics"],
    //             "jobDesc": "Analyzing transaction data and financial trends for PayPal services | Level: Analyst | Location: Chennai | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "13000",
    //             "location": "Chennai"
    //         },
    //         {
    //             "companyName": "Bharat Petroleum",
    //             "mail": "bpcl@bpcl.com",
    //             "jobTitle": "Chemical Engineer",
    //             "skillsReq": ["Chemical Engineering", "Process Optimization", "Quality Control", "Refinery Operations"],
    //             "jobDesc": "Optimizing chemical processes and quality control for Bharat Petroleum | Level: Engineer | Location: Mumbai | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "12000",
    //             "location": "Mumbai"
    //         },
    //         {
    //             "companyName": "ICICI Bank",
    //             "mail": "icici@icicibank.com",
    //             "jobTitle": "Financial Analyst",
    //             "skillsReq": ["Financial Analysis", "Risk Management", "Financial Modeling", "Banking Operations"],
    //             "jobDesc": "Analyzing financial data and assessing risks for ICICI Bank | Level: Analyst | Location: Mumbai | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Mumbai"
    //         },
    //         {
    //             "companyName": "Zomato",
    //             "mail": "zomato@zomato.com",
    //             "jobTitle": "Restaurant Partnerships Manager",
    //             "skillsReq": ["Restaurant Partnerships", "Sales and Marketing", "Business Development", "Customer Relationship Management"],
    //             "jobDesc": "Building partnerships with restaurants and managing business relationships for Zomato | Level: Manager | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "14000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Flipkart",
    //             "mail": "flipkart@flipkart.com",
    //             "jobTitle": "Supply Chain Manager",
    //             "skillsReq": ["Supply Chain Management", "Inventory Control", "Logistics", "Vendor Management"],
    //             "jobDesc": "Optimizing supply chain operations and vendor relationships for Flipkart | Level: Manager | Location: Bengaluru | Years of Exp: 3-7 years",
    //             "duration": "4-6 Months",
    //             "stipend": "16000",
    //             "location": "Bengaluru"
    //         },
    //         {
    //             "companyName": "Amazon",
    //             "mail": "amzn@amazon.com",
    //             "jobTitle": "Data Scientist",
    //             "skillsReq": ["Python", "Machine Learning", "Data Analytics", "Statistics"],
    //             "jobDesc": "Practice: Talent & Organization - Organizational Analytics Analyst Network I Areas of Work: Learning Design and Development, Change Management and HR Transformation | Level: Analyst | Location: Gurugram, Bangalore, Mumbai, Pune, Hyderabad, and Chennai | Years of Exp: 1-3 years",
    //             "duration": "1-3 Months",
    //             "stipend": "12000",
    //             "location": "Bangalore"
    //         },
    //         {
    //             "companyName": "Google",
    //             "mail": "google@gmail.com",
    //             "jobTitle": "Data Scientist",
    //             "skillsReq": ["Python", "Machine Learning", "Data Analytics", "Statistics"],
    //             "jobDesc": "Practice: Talent & Organization - Organizational Analytics Analyst Network I Areas of Work: Learning Design and Development, Change Management and HR Transformation | Level: Analyst | Location: Gurugram, Bangalore, Mumbai, Pune, Hyderabad, and Chennai | Years of Exp: 1-3 years",
    //             "duration": "1-3 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Microsoft",
    //             "mail": "microsoft@microsoft.com",
    //             "jobTitle": "Software Engineer",
    //             "skillsReq": ["Java", "C++", "Software Development", "Problem Solving"],
    //             "jobDesc": "Developing cutting-edge software solutions for various platforms and applications | Level: Engineer | Location: Redmond, WA | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Redmond, WA"
    //         },
    //         {
    //             "companyName": "Apple",
    //             "mail": "apple@apple.com",
    //             "jobTitle": "iOS Developer",
    //             "skillsReq": ["Swift", "iOS App Development", "UI/UX Design", "Mobile App Testing"],
    //             "jobDesc": "Creating innovative and user-friendly iOS applications | Level: Developer | Location: Cupertino, CA | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Cupertino, CA"
    //         },
    //         {
    //             "companyName": "Facebook",
    //             "mail": "facebook@facebook.com",
    //             "jobTitle": "Social Media Analyst",
    //             "skillsReq": ["Data Analysis", "Social Media Insights", "Marketing Strategy", "Content Optimization"],
    //             "jobDesc": "Analyzing social media trends and optimizing content for maximum engagement | Level: Analyst | Location: Menlo Park, CA | Years of Exp: 1-3 years",
    //             "duration": "2-3 Months",
    //             "stipend": "13000",
    //             "location": "Menlo Park, CA"
    //         },
    //         {
    //             "companyName": "Tesla",
    //             "mail": "tesla@tesla.com",
    //             "jobTitle": "Electrical Engineer",
    //             "skillsReq": ["Electrical Engineering", "Circuit Design", "Power Systems", "Renewable Energy"],
    //             "jobDesc": "Designing and optimizing electrical systems for Tesla products | Level: Engineer | Location: Palo Alto, CA | Years of Exp: 3-7 years",
    //             "duration": "4-6 Months",
    //             "stipend": "16000",
    //             "location": "Palo Alto, CA"
    //         },
    //         {
    //             "companyName": "Netflix",
    //             "mail": "netflix@netflix.com",
    //             "jobTitle": "Content Analyst",
    //             "skillsReq": ["Data Analysis", "Content Evaluation", "Recommendation Algorithms", "Streaming Services"],
    //             "jobDesc": "Analyzing viewer data to improve content recommendations and streaming experience | Level: Analyst | Location: Los Gatos, CA | Years of Exp: 1-3 years",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "Los Gatos, CA"
    //         },
    //         {
    //             "companyName": "Uber",
    //             "mail": "uber@uber.com",
    //             "jobTitle": "Software Engineer",
    //             "skillsReq": ["Java", "Python", "Software Development", "Distributed Systems"],
    //             "jobDesc": "Developing software for Uber's ride-sharing platform | Level: Engineer | Location: San Francisco, CA | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "San Francisco, CA"
    //         },
    //         {
    //             "companyName": "IBM",
    //             "mail": "ibm@ibm.com",
    //             "jobTitle": "Machine Learning Engineer",
    //             "skillsReq": ["Machine Learning", "Deep Learning", "Data Science", "Python"],
    //             "jobDesc": "Working on cutting-edge machine learning projects at IBM Research | Level: Engineer | Location: Yorktown Heights, NY | Years of Exp: 2-5 years",
    //             "duration": "3-6 Months",
    //             "stipend": "15000",
    //             "location": "Yorktown Heights, NY"
    //         },
    //         {
    //             "companyName": "Adobe",
    //             "mail": "adobe@adobe.com",
    //             "jobTitle": "UI/UX Designer",
    //             "skillsReq": ["UI/UX Design", "Adobe Creative Suite", "User Research", "Prototyping"],
    //             "jobDesc": "Designing intuitive user interfaces and engaging user experiences for Adobe products | Level: Designer | Location: San Jose, CA | Years of Exp: 1-4 years",
    //             "duration": "2-4 Months",
    //             "stipend": "14000",
    //             "location": "San Jose, CA"
    //         },
    //         {
    //             "companyName": "Netflix India",
    //             "mail": "netflix-india@netflix.com",
    //             "jobTitle": "Web Development Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Frontend Frameworks"],
    //             "jobDesc": "Assisting in the development of web interfaces and user experiences for Netflix's online platform. | Level: Intern | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Microsoft India",
    //             "mail": "ms-india@microsoft.com",
    //             "jobTitle": "Frontend Development Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "React"],
    //             "jobDesc": "Working on frontend development projects for Microsoft's web applications. | Level: Intern | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "IBM India",
    //             "mail": "ibm-india@ibm.com",
    //             "jobTitle": "Web Developer Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Web Design"],
    //             "jobDesc": "Assisting in the design and development of web content for IBM's online presence. | Level: Intern | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Adobe India",
    //             "mail": "adobe-india@adobe.com",
    //             "jobTitle": "UI/UX Intern",
    //             "skillsReq": ["UI/UX Design", "User Research", "Prototyping", "Adobe Creative Suite"],
    //             "jobDesc": "Learning and working on UI/UX design projects for Adobe products. | Level: Intern | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "11000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Amazon Web Services",
    //             "mail": "aws@amazon.com",
    //             "jobTitle": "Backend Development Intern",
    //             "skillsReq": ["Node.js", "Python", "REST APIs", "Database Management"],
    //             "jobDesc": "Assisting in backend development projects for AWS services. | Level: Intern | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Google India",
    //             "mail": "google-india@gmail.com",
    //             "jobTitle": "Full Stack Web Developer Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Node.js"],
    //             "jobDesc": "Working on both frontend and backend aspects of web development for Google services. | Level: Intern | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Salesforce India",
    //             "mail": "salesforce-india@salesforce.com",
    //             "jobTitle": "Web Development Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Frontend Frameworks"],
    //             "jobDesc": "Learning and contributing to web development projects for Salesforce CRM. | Level: Intern | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Zoho Corporation",
    //             "mail": "zoho-india@zoho.com",
    //             "jobTitle": "Frontend Development Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Web Design"],
    //             "jobDesc": "Assisting in frontend development and web design for Zoho's cloud software. | Level: Intern | Location: Work from home",
    //             "duration": "2-3 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Ola India",
    //             "mail": "ola-india@ola.com",
    //             "jobTitle": "Web Application Developer Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Web Application Development"],
    //             "jobDesc": "Working on web application development projects for Ola's ride-sharing platform. | Level: Intern | Location: Work from home",
    //             "duration": "3-6 Months",
    //             "stipend": "13000",
    //             "location": "Work from home"
    //         },
    //         {
    //             "companyName": "Flipkart India",
    //             "mail": "flipkart-india@flipkart.com",
    //             "jobTitle": "Web Development Intern",
    //             "skillsReq": ["HTML", "CSS", "JavaScript", "Web Design"],
    //             "jobDesc": "Assisting in the development and design of web content for Flipkart's e-commerce platform. | Level: Intern | Location: Work from home",
    //             "duration": "2-4 Months",
    //             "stipend": "12000",
    //             "location": "Work from home"
    //         }
        
    //     ]
      

    //   const tempSave = await Company.insertMany(tempCreate);
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
        User: user1,
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
           const registerUser= new User({
            name: name,
            email: req.body.email,
            phone: req.body.Mobile_Number,
            gender:req.body.gender,
            whatsapp:req.body.whatsapp,
            country:req.body.country,
            marriage:req.body.marriage,
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
        const email = req.body.email;
        const password = req.body.password;
        const user= await User.findOne({email: email});
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
