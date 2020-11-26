const path = require('path')
const express = require('express')
const hbs = require('hbs')
const expressLayouts = require('express-ejs-layouts')
const fetch = require('node-fetch')

const app = express()
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyq-4awayf405ZuXbHyQi4Z70THNWohgZQmaqdThQQn9bBkbTTT/exec"

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/views')

//middleware for expres.js
// app.use(expressLayouts)
//set ejs for express application
//app.set("view engine", "ejs")

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(viewsPath)
app.use(express.urlencoded({extended: true}))

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
    res.render('register',{
        
    })
})

app.post('/', (req, res) => {
    const user_body = req.body

    const user_name = user_body.username
    const user_gender = user_body.usergender
    const user_phone = user_body.userphone
    const user_email = user_body.useremail

    //google sheet
    //const url = '$(GOOGLE_SHEET_URL)?Name=$(encodeURIComponent(user_name))&Gender=$(encodeURIComponent(user_gender))&Phone=$(encodeURIComponent(user_phone))&Email=$(encodeURIComponent(user_email))'

    const url = `${GOOGLE_SHEET_URL}?Name=${encodeURIComponent(user_name)}&Gender=${encodeURIComponent(user_gender)}&Phone=${encodeURIComponent(user_phone)}&Email=${encodeURIComponent(user_email)}`

    fetch(url).then((res) => res.json()).then((res) => console.log("google sheet res", {res})).catch((e) => console.error(e))


    res.end()
  })


app.listen(3006, () =>  {
    console.log('Server is listening on PORT 3006')
    
})