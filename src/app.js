const path = require('path')  // core built in module
const express = require('express')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather')

const app= express()
const port=process.env.PORT || 3000

//define paths
const publicDir = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.set('view engine','hbs') //setup handlebars
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req,res) =>{
    res.render('index', {
        title : 'Weather App',
        name : 'Tanya Gupta'

    })  
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title : 'About Me',
        name : 'Tanya Gupta'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title : 'Help',
        name : 'Tanya',
        helpTxt : 'Get help here.'
    })
})


//weather endpoint
app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {

        if(error)
        {
            return res.send({error})
        }
    
        weather(latitude,longitude,(error,wdata) => {
            if(error)
        {
            return res.send({error})
        }
        res.send({
            forecast : wdata,
            location,
            address : req.query.address
        })
        })
    })
})

/*app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error : 'Provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product :[]
    })
})*/

app.get('/help/*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Tanya Gupta',
        errorMessage : '404 help'
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Tanya Gupta',
        errorMessage : '404 All'
    })
})

app.listen(port,() => {
    console.log('Server running on port '+port)
})