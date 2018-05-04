const faker = require('faker');
var fs = require('fs');

let users = [];
for (let usersId = 1; usersId <= 10000000; usersId++) {
  let user = {};
  user.id = usersId;
  users.push(user);
}

let dataString = '';
for (let userIndex = 0; userIndex < users.length; userIndex++) {
  let lineString = [];
  for (let key in users[userIndex]) {
    lineString.push(users[userIndex][key]);
  }
  lineString = lineString.join('|');
  dataString += lineString + '\n';
}

fs.appendFile('./data/users.txt', dataString, (err) => {
  if (err) throw err;
  console.log('The data was appended to file!');
});
