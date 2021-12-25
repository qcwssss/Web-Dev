const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could no connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/ 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: { // custom validator
            isAsync: true,
            validator: function(v) {
                let result = null;
                setTimeout(() => {
                    //Do some async work
                    result = v && v.length > 0;
                    if (result) {
                        Promise.resolve(true);
                    } else {
                        Promise.reject(new Error('fail'))
                        .catch(function() {
                            console.log('tags must have at least one attribute');
                            console.log('result: ', result)
                        });
                    }
                   
                }, 1000);
            }, 
            message: 'A course should have at least one tag.'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; }, 
        min: 10,
        max: 200
    }
});

// Classes, objects
// Course, nodeCourse
const Course = mongoose.model('Course', courseSchema); // class

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: null,
        isPublished: true,
        price: 15
    });

    try {
        await course.validate();
        // const result = await course.save();
        // console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }

}

// mongoDB query operator
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (less than or equal to)
// in 
// nin (not in)

async function getCourses() {
    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true })
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        
        // or, and
        .find()
        .or([ { author: 'Mosh'}, { isPublished: true} ])
        // .and([ ])
        .limit(10)
        .sort({ name: 1 })
        .select({name: 1, tags: 1})
    console.log(courses);
}

// UPDATE

// Approach: Query first
// findById()
// Modify its properties
// save()

// Approach: Update first
// Update directly
// Optionally: get the updated document
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another dude';

    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    const result = await course.save();
    console.log(result);
}

async function updateCourseDirectly(id) {
    const result = await Course.updateOne({_id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });

    console.log(result);
}


async function updateAndFind(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: true
        }
    }, {new: true} );
    console.log(course);
}


async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const result = await Course.findByIdAndRemove(id);
    console.log(result);
}

// updateCourse("61c51ed52108f8fb99dfb6a6");
// updateCourseDirectly("61c51ed52108f8fb99dfb6a6");
// updateAndFind("61c51ed52108f8fb99dfb6a6");
// removeCourse("61c51ed52108f8fb99dfb6a6");
createCourse();
// getCourses();
