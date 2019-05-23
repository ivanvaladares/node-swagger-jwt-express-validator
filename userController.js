let users = require("./data.js").users;

exports.getAll = () => {

  return new Promise(resolve => {

    return resolve(users);
    
  });

};


exports.findOne = (userId) => {

  return new Promise((resolve, reject) => {

    let user = users.find(x => x.id === userId);

    if (user) {
      return resolve(user);
    }

    reject(Error("User not found"));

  });

};

exports.create = (user) => {

  return new Promise((resolve, reject) => {

    let position = users.findIndex(x => x.id === user.id);

    if (position < 0) {
      users.push(user);
      return resolve(user);
    }

    reject(Error("User already exists"));

  });

};

exports.update = (user) => {

  return new Promise((resolve, reject) => {

    let position = users.findIndex(x => x.id === user.id);

    if (position >= 0) {
      users[position] = user;
      return resolve(user);
    }

    reject(Error("User not found"));

  });

};

exports.delete = (userId) => {

  return new Promise((resolve, reject) => {

    let user = users.find(x => x.id === userId);

    if (user) {
      users = users.filter(x => x.id !== userId);
      return resolve("OK");
    }

    reject(Error("User not found"));

  });

};