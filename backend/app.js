const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const sauces = require('./models/sauces');
const userRoutes = require('./routes/user');
const app = express();

// connect with mongoose
//mongoose.connect('mongodb+srv://will:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true')
  //.then(() => {
   // console.log('Successfully connected to MongoDB Atlas!');
 // })
  //.catch((error) => {
   // console.log('Unable to connect to MongoDB Atlas!');
   // console.error(error);
 // });

//to prevent CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//connect with image folder
 // app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  app.get('/api/sauces',(req,res,next)=>{
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );

  });
 




  app.get('/api/sauces/:id',(req,res,next)=>{
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );

  });

 

  
  app.post('/api/sauces',(req,res,next)=>{
    const sauces = new Thing({
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl
      
      });
      thing.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
  
  });

  

  app.put('/api/sauces/:id',(req,res,next)=>{
    const sauces = new Thing({
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl
      
      });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );

  });

  

  app.delete('/api/sauces/:id',(req,res,next)=>{
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

 
  
  app.post('/api/sauces/:id/like',(req,res,next)=>{

  });

  



  
 // app.use('/api/auth', userRoutes);

module.exports=app;