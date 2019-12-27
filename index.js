const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

const members = [
   {id:1, name: 'Hello Mark'},
   {id:2, name: 'Hello Jhon'},
   {id:3, name: ' Hello Jessica'},
];

app.get('/', (req, res) => {
   res.send('Hello');
});

app.get('/api/members', (req, res) => {
   res.send(members);
});

app.post('/api/members', (req, res) => {
   const {error} = validateMember(req.body);
   if (error) return res.status(400).send (error.details[0].message);

   const member = {
      id: members.length + 1,
      name: req.body.name
   };
   members.push(member);
   res.send( member);
});

app.put('/api/members/:id', (req,res) => {
   const member = members.find(c => c.id === parseInt(req.params.id));
   if(!member) return res.status(404).send('Hello Stranger');

   const {error} = validateMember(req.body);

   if (error) return res.status(400).send (error.details[0].message);
   
   member.name = req.body.name;
   res.send(member);
});


function validateMember(member) {
   const schema = {
      name: Joi.string().min(3).required()
   };
   return Joi.validate(member, schema);
}


app.delete('/api/members/:id', (req,res) => {
   // look up the member
   const member = members.find(c => c.id === parseInt(req.params.id));
   if(!member) return res.status(404).send('The member with the given ID given is incorrect');
   // not existing, return 404
   //delete
   const index = members.indexOf(member);
   members.splice(index, 1);
   
   res.send(member);
});


app.get ('/api/members/:id', (req,res) => {
   const member = members.find(c => c.id === parseInt(req.params.id));
   if(!member) return res.status(404).send('Hello Stranger');
   res.send(member);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}...`));
