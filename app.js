const express = require('express')
const connectDB=require('./db/connect')
const routes = require('./routes/main')
const {default: mongoose}=require('mongoose')
const hbs=require('hbs')


const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.static('./public'))
app.use("/static",express.static("public"))
app.use("",routes)
app.use(express.json())

app.set('view engine', 'hbs')
app.set("views","views")

hbs.registerPartials("views/partials")
mongoose.set('strictQuery', false);

const port =process.env.PORT || 3000

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('DataBase connected...')
       
            app.listen(port, ()=>{
                console.log(`listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
