const faker = require('faker');
const fs = require('fs');

let dataString = '';
for (let projectId = 1; projectId <= 300000; projectId++) {
  let project = [];
  project.push(projectId);
  project.push(faker.lorem.sentences());
  let lineString = project.join('|');
  dataString += lineString + '\n';

  if (projectId % 100000 === 0) {
    fs.appendFileSync(`${__dirname}/data/projects.txt`, dataString);
    dataString = '';
  }
}
