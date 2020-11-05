const sauces = require('../models/sauces');
//get all sauces
exports.getAllSauces = (req,res,next)=>{
    sauces.find().then(
      (result) => {
        res.status(200).json(result);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );

  };
  //get one sauces by id 
  exports.getOnesauces = (req,res,next)=>{
    sauces.findOne({
      _id: req.params.id
    }).then(
      (object) => {
        res.status(200).json(object);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );

  };
 // create the sauces
 exports.createsauces = (req,res,next)=>{
    const sauce = new sauces({
      userId:req.body.userId,
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes:req.body.dislikes,
      usersLikes: req.body.usersLikes,
      usersDislikes:req.body.usersDislikes,
      
      });
      sauce.save().then(
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
  
  };
  //modify the sauces
  exports.modifysauces = (req,res,next)=>{
    const sauce = new sauces({
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl
      
      });
    sauce.updateOne({_id: req.params.id}, thing).then(
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

  };
  
  // delete the sauces
   exports.deletesauces = (req,res,next)=>{
    s.deleteOne({_id: req.params.id}).then(
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
  };