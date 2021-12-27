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
  authors: [authorSchema]

}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
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
async function removeAuthorObj(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();

}
 
// updateAuthor('61ca12057f1dba8d0714be12');
// createCourse('Node Course', [
  //   new Author({ name: 'Mosh' }),
  //   new Author({ name: 'John' })
  // ]);
  
// addAuthor('61ca176bceaf3b3b05b24dac', new Author({ name: 'Amy'}));
removeAuthor('61ca176bceaf3b3b05b24dac', '61ca184d173df4de2410f5cd');
