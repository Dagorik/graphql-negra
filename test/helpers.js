const mongoose = require('mongoose');

const clearDatabase = () => {
  return new Promise ( resolve => {
    let count = 0;
    const maxObjects = Object.keys(mongoose.connection.collections).length;

    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(() => {
        count++;
        if(count === maxObjects){
          resolve();
        }
      })
    }
  });
};

module.exports = async function setUpTest() {
    await clearDatabase();
};
