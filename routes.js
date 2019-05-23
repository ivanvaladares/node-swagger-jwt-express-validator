const express = require('express'),
  security = require('./security.js'),
  userController = require("./userController.js"),
  userValidator = require("./userValidator.js");

const router = express.Router();

/**
 * @typedef User
 * @property {string} id.required  - [XXX999999]
 * @property {string} name.required  
 * @property {string} email.required 
 * @property {string} phone
 */
/**
 * @typedef Error
 * @property {number} code 
 * @property {string} message 
 */

 /**
 * @typedef Token
 * @property {string} token
 */


/**
 * ### We can also comment ### 
 * - this is parsed by doctrine
 * - neat stuff
 * 
 * ### Another topic ### 
 * - great
 * @route GET /users
 * @group Users 
 * @produces application/json
 * @consumes application/json
 * @returns {Array.<User>} 200 - An array of user DTO
 * @security JWT
 */

const getAllUsers = function (req, res) {
  userController.getAll().then(users => {
    return res.json(users);
  })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};


/**
 * @route POST /users
 * @param {User.model} user.body.required - user DTO 
 * @group Users 
 * @produces application/json
 * @consumes application/json
 * @returns {User.model} Success
 * @returns {Error.model} Error
 * @security JWT
 */

const createUser = function (req, res) {

  req.getValidationResult()
    .then(userValidator.validationHandler())
    .then(() => {

      return userController.create(req.body).then(user => {
        return res.json(user);
      });

    })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};

router.route('/users')
  .post(security.checkToken, userValidator.validate('validateUser'), createUser)
  .get(security.checkToken, getAllUsers);


/**
 * @route PUT /user
 * @param {User.model} user.body.required - User DTO
 * @group Users 
 * @produces application/json
 * @consumes application/json
 * @returns {User.model} Success
 * @returns {Error.model} Error
 * @security JWT
 */

const updateUser = function (req, res) {

  req.getValidationResult()
    .then(userValidator.validationHandler())
    .then(() => {

      return userController.update(req.body).then(user => {
        return res.json(user);
      });

    })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};

router.route('/user')
  .put(security.checkToken, userValidator.validate('validateUser'), updateUser);

/**
 * This function comment is parsed by doctrine
 * @route GET /user/{userId}
 * @group Users 
 * @produces application/json
 * @param {string} userId.path.required - eg: XXX999999
 * @returns {User.model} Success
 * @returns {Error.model} Error
 * @security JWT 
 */

const getOneUser = function (req, res) {

  req.getValidationResult()
    .then(userValidator.validationHandler())
    .then(() => {

      return userController.findOne(req.params.userId).then(user => {
        return res.json(user);
      });

    })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};

/**
 * This function comment is parsed by doctrine
 * @route DELETE /user/{userId}
 * @group Users 
 * @param {string} userId.path.required - eg: XXX999999
 * @returns {string} 200 - OK
 * @returns {Error.model} Error
 * @security JWT
 */

const deleteUser = function (req, res) {

  req.getValidationResult()
    .then(userValidator.validationHandler())
    .then(() => {

      return userController.delete(req.params.userId).then(() => {
        return res.send("OK");
      });

    })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};

router.route('/user/:userId')
  .get(security.checkToken, userValidator.validate('checkUserId'), getOneUser)
  .delete(security.checkToken, userValidator.validate('checkUserId'), deleteUser);


/**
 * This function will return a token to test all endpoints 
 * @route GET /token
 * @group Token 
 * @produces application/json
 * @consumes application/json
 * @returns {Token.model} 200 - JWT Token
 * @returns {Error.model} Error  
 */

const getToken = function (req, res) {

  let payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4"
  };

  let token = security.createToken(payload);

  res.json({token});

};

router.route('/token')
  .get(getToken);


module.exports = router;