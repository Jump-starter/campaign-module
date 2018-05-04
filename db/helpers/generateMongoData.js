const faker = require('faker');
const fs = require('fs');

// seed levels table
let levelId = 0;
let dataString = '';
let backingId = 0;
for (let projectId = 1; projectId <= 100000; projectId++) {
  let numberOfLevels = 3 + Math.floor(Math.random() * 8);
  let startingCutoffAmount = 50 + Math.floor(Math.random() * 100);
  for (let levelsId = 1; levelsId < numberOfLevels; levelsId++) {
    let level = {};
    levelId++;
    level.levelId = levelId;
    level.projectId = projectId;
    level.startingCutoffAmount = startingCutoffAmount;
    startingCutoffAmount += 50 + Math.floor(Math.random() * 100);
    level.name = faker.company.bsNoun();
    level.description = faker.lorem.sentence();
    level.estimatedDelivery = faker.date.future().toISOString().slice(0, 19).replace('T', ' ');
    level.shipsTo = faker.address.country();
    let includes = [];
    let includesTotal = 1 + Math.floor(Math.random() * 3);
    for (let includesIndex = 0; includesIndex < includesTotal; includesIndex++) {
      includes.push(faker.lorem.words());
    };
    level.maxBackers = 100 + Math.floor(Math.random() * 100);
    let totalBackers = 1 + Math.floor(Math.random() * 50);
    for (let numBackers = 0; numBackers < totalBackers; numBackers++) {
      level.id = backingId++;
      level.userId = 1 + Math.floor(Math.random() * 1000000);
      dataString += JSON.stringify(level) + '\n';
    }
  }
    if (projectId % 1000 === 0) {
      fs.appendFileSync('./data/mongolevels.json', dataString);
      dataString = '';
      console.log('The data was appended to file!')
      console.log(backingId);
    }
  }
