var fs = require('fs');

let backingId = 0;
let dataString = '';
for (let userId = 1; userId <= 800000; userId++) {
  let projectsBackedTotal = 1 + Math.floor(Math.random() * 30);
  for (let projectsBacked = 0; projectsBacked < projectsBackedTotal; projectsBacked++) {
    let backing = [];
    backingId++;
    backing.push(backingId)
    backing.push(userId);
    let levelId = Math.floor(Math.random() * 1200000);
    backing.push(levelId);
    let lineString = backing.join('|');
    dataString += lineString + '\n';
  };
  if (userId % 100000 === 0) {
    fs.appendFileSync('./data/userslevels.txt', dataString);
    dataString = '';
  }
}
