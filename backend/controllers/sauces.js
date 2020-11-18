const sauces = require('../models/sauces');
const fs = require('fs');
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
 exports.createsauces = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  
  const sauce = new sauces({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      imageUrl: url + '/images/' + req.file.filename,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      mainPepper: req.body.sauce.mainPepper,
      manufacturer: req.body.sauce.manufacturer,
      likes: 0,
      dislikes: 0,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked
  });
  sauce.save().then(
      () => {
          res.status(201).json({
              message: 'New sauce added to database successfully!'
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
  /*exports.modifysauces = (req,res,next)=>{
    const sauce = new sauces({
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl
      
      });
    sauce.updateOne({_id: req.params.id}, sauce).then(
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
*/

  exports.modifysauces = (req, res, next) => {

    let sauce = new sauces({ _id: req.params.id });

    if (req.file) {
      req.body.sauce = JSON.parse(req.body.sauce);
      const url = req.protocol + '://' + req.get('host');
      sauce = {
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        imageUrl: url + '/images/' + req.file.filename,
        description: req.body.sauce.description,
        heat: req.body.sauce.heat,
        mainPepper: req.body.sauce.mainPepper,
        manufacturer: req.body.sauce.manufacturer,
        likes: 0,
        dislikes: 0,
        usersLiked: req.body.sauce.usersLiked,
        usersDisliked: req.body.sauce.usersDisliked
      }
    } else {
      sauce = {
        userId: req.body.userId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        heat: req.body.heat,
        mainPepper: req.body.mainPepper,
        manufacturer: req.body.manufacturer,
        
       
      
      }
    } 

    sauces.updateOne({_id: req.params.id},sauce ).then(
      () => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
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
  exports.deletesauces = (req, res, next) => {
    sauces.findOne({_id: req.params.id}).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          sauces.deleteOne({_id: req.params.id}).then(
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
      }
    );
  };