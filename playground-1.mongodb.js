// Select the database to use.
use('LoginAPI');

// Insert a few documents into the sales collection.
db.getCollection('Users').insertMany([
  {"Name": "Anupam Verma", "Role":"API","Age":21},
  {"Name": "Shraddha Mishra", "Role":"AI/ML","Age":20},
  {"Name": "Shefali Guatam", "Role":"Cloud Computing","Age":22}
]);
db.getCollection("Users").find();



