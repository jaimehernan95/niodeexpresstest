const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

const courses = [
   {id:1, name: ' Mark'},
   {id:2, name: ' Jhon'},
   {id:3, name: ' Jessica'},
];

app.get('/', (req, res) => {
   res.send('Hello');
});

app.get('/api/courses', (req, res) => {
   res.send(courses);
});

app.post('/api/courses', (req, res) => {
   const {error} = validateCourse(req.body);
   if (error) return res.status(400).send (error.details[0].message);

   const course = {
      id: courses.length + 1,
      name: req.body.name
   };
   courses.push(course);
   res.send( course);
});

app.put('/api/courses/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('Hello Stranger');

   const {error} = validateCourse(req.body);

   if (error) return res.status(400).send (error.details[0].message);
   
   course.name = req.body.name;
   res.send(course);
});


function validateCourse(course) {
   const schema = {
      name: Joi.string().min(3).required()
   };
   return Joi.validate(course, schema);
}


app.delete('/api/courses/:id', (req,res) => {
   // look up the course
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given ID given is incorrect');
   // not existing, return 404
   //delete
   const index = courses.indexOf(course);
   courses.splice(index, 1);
   
   res.send(course);
});


app.get ('/api/courses/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('Hello Stranger');
   res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
