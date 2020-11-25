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
      (sauce) => {
        
        res.status(200).json(sauce);
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
      usersLiked: [''],
      usersDisliked: ['']
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

exports.modifysauces = (req, res, next) => {
let sauce = new sauces({ _id: req.params.id });
if (req.file) {
  const url = req.protocol + "://" + req.get("host");
  req.body.sauce = JSON.parse(req.body.sauce);
  
  sauce = {
    _id: req.params.id,
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: req.body.sauce.heat,
  };
}else {
  sauce = {
    _id: req.params.id,
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    heat: req.body.heat,
  };
}
sauces.updateOne({ _id: req.params.id }, sauce)
  .then(() => {
    res.status(201).json({ message: "Sauce updated successfully¡" });
  })
  .catch((error) => {
    res.status(400).json({ error: error });
  });
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

  exports.likeSauces = (req, res, next) => {
    sauces.findOne({_id: req.params.id}).then((sauce) => {
      if (req.body.like == 1) {
          sauce.usersLiked.push(req.body.userId)
          sauce.likes += req.body.like
      } else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
          sauce.usersLiked.remove(req.body.userId)
          sauce.likes -= 1
      } else if (req.body.like == -1) {
          sauce.usersDisliked.push(req.body.userId)
          sauce.dislikes += 1
      } else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
          sauce.usersDisliked.remove(req.body.userId)
          sauce.dislikes -= 1
      }
     
      sauce.save().then(
          () => {
              res.status(200).json({
                  message: "Sauce Like Updated!"
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

    
  };