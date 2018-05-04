const faker = require('faker');
const fs = require('fs');

// seed levels table
let levelId = 0;
let dataString = '';
for (let projectId = 1; projectId <= 300000; projectId++) {
  let numberOfLevels = 3 + Math.floor(Math.random() * 8);
  let startingCutoffAmount = 50 + Math.floor(Math.random() * 100);
  for (let levelsId = 1; levelsId < numberOfLevels; levelsId++) {
    let level = [];
    levelId++;
    level.push(levelId);
    level.push(projectId);
    level.push(startingCutoffAmount);
    startingCutoffAmount += 50 + Math.floor(Math.random() * 100);
    level.push(faker.company.bsNoun());
    level.push(faker.lorem.sentence());
    level.push(faker.date.future().toISOString().slice(0, 19).replace('T', ' '));
    level.push(faker.address.country());
    let includes = [];
    let includesTotal = 1 + Math.floor(Math.random() * 3);
    for (let includesIndex = 0; includesIndex < includesTotal; includesIndex++) {
      includes.push(faker.lorem.words());
    };
    level.push(JSON.stringify(includes));
    let maxBackers = 100 + Math.floor(Math.random() * 100);
    level.push(maxBackers);

    let lineString = level.join('|');
    dataString += lineString + '\n';
  }

  if (projectId % 50000 === 0) {
    fs.appendFileSync('./data/levels.txt', dataString);
    dataString = '';
    console.log('The data was appended to file!')
  }
}
