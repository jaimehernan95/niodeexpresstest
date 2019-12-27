Create an API JavaScript (Node.js) on MAC
----------------------------------
 Create a File expressnode and CD to the expressnode file
- mkdir expressnode
- cd expressnode

Requirements
------------
To build a RESTful API, we will use:

Node.js
Go to the following website and download Node 

https://nodejs.org/en/download/

2) Inside the expressnode file we need to install other tools in order to run our Node.js API

Install Node.js
Install nvm – Node Version Manager
Install npm – Node Package Manager

In the terminal you can verify if the npm and node are working  by running the following commands:

npm --version
node --version

Implementation
--------------

Initializing the project with the command:  npm init

Running "npm init"  some questions will pop up as follows: name the project, licenses, and version. Hit Enter to all questions.

Installing Express
-----------------

command: npm install express

 GET method
 ----------  
 
 I used visual studio to edit and develop this API you can get it from this site (https://code.visualstudio.com/download)
 
 Create a file index.js inside the folder expressnode. (see index file , line 1, 2 and 3)

const express = require('express');
const app = express();

I added an array inside the index.js with get method we will be able to get each user with valid ID. I  

const members = [
   {id:1, name: 'Hello Mark'},
   {id:2, name: 'Hello Jhon'},
   {id:3, name: 'Hello Jessica'},
];

// if we query the ID : 1 , it will be displayed { id:1, name: 'Hello Mark'} .If you query ID:4 it will return 'Hello Stranger' or error. The full address will be  http://localhost:4000/api/courses/1


app.get ('/api/members/:id', (req,res) => {
   const member = members.find(c => c.id === parseInt(req.params.id));
   if(!member) return res.status(404).send('Hello Stranger');
   res.send(member);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}...`));


POST method to create a new member
---------------------------------
This method will allow to create a new member

app.put('/api/members/:id', (req,res) => {
   const member = members.find(c => c.id === parseInt(req.params.id));
   if(!member) return res.status(404).send('Hello Stranger');

   const {error} = validateMember(req.body);

   if (error) return res.status(400).send (error.details[0].message);
   
   member.name = req.body.name;
   res.send(member);
});

-- TESTING --
-------------
POSTMAN was used to test the GET and POST method :  https://www.getpostman.com

I run the following command to start: nodemon index.js
[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
listening on port 4000...

By click on SEND  GET  this address http://localhost:4000/api/members

I will display all members in our array.

[
    {
        "id": 1,
        "name": "Hello Mark"
    },
    {
        "id": 2,
        "name": "Hello Jhon"
    },
    {
        "id": 3,
        "name": " Hello Jessica"
    }
]


By click on SEND  GET  this address http://localhost:4000/api/members/1

I will display the  member with ID : 1 

{
    "id": 1,
    "name": "Hello Mark"
}


By click on SEND  GET  this address http://localhost:4000/api/members/5
http://localhost:4000/api/members/5

The message will be displayed : "Hello Stranger" because ID #5 doesn't exit in our array


DOCKER
-------
install docker from this website :  https://docs.docker.com/docker-for-mac/install/


The I Created a "DockerFile" and add the following information. 

-- DockerFile-- 
ROM node:8 

WORKDIR /src

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["node", "/src/index.js" ]


Create another file docker-compose.yml and insert the following info
 ------ docker-compose.yml. ------
version: '3'
services:
  app:
    container_name: expressnode
    restart: always
    build: .
    ports:
        - "4000:4000"
        
        
Create another fil .gitignore
---- .gitignore --- 
node_modules
npm-debug.log


Run docker
---------

run the following command to start docker : docker-compose up

To deploy your application across the swarm, use `docker stack deploy`.

Starting expressnode ... done
Attaching to expressnode
expressnode | listening on port 4000...

http://localhost:4000/api/members


GITHUB
-------

I created a new repository in order to store this information  niodeexpresstest

https://github.com/jaimehernan95/niodeexpresstest.git

Then I uploaded all the files to my new repo

Command to use upload the file and projects on github.

 cd/your project directory

 1) git init
 2) git add . or git add ['filename']
 3) git commit -m "Added files to Docker"
 4) git remote add origin https://github.com/jaimehernan95/niodeexpresstest.git
 5) git pull origin master
 6) git push origin master
