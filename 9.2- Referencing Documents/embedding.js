const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground2')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }

}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// Find then upate
async function updateAuthor1(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Mosh Hamedani';
  course.save();
}

// Directly update
async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $set: {
      'author.name': 'John Smith'
    }
  });
}

// Directly update
async function removeAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  });
}
 
// createCourse('Node Course', new Author({ name: 'Mosh' }));
// updateAuthor('61ca12057f1dba8d0714be12');
removeAuthor('61ca12057f1dba8d0714be12');
