const fs = require('fs');
const inquirer = require('inquirer');

inquirer.prompt([

{

name:'projectTitle',
message:'What is the project title',
type:'input'




},{

    name:'description',
    message:'What is the despription of your project?',
    type:'input'
 



},{
    name:'installInstructions',
    message:'What are the install instructions of your program?',
    type:'input'





},{
    name:'usageInformation',
    message:'What is the usage information of your project?',
    type:'input'

 


},{
    name:'contribute',
    message:'What are the contribution guidelines?',
    type:'input'
  





},{
    name:'testInstructions',
    message:'Please enter test instructions?',
    type:'input'





},{
    type: 'checkbox',
    name: 'licenseOptions',
    message: 'Check from the list of licence options',
    choices: ['Public Domain', 'Permissive', 'LGPL', 'copyleft', 'Propietary']
 


},{
    name:'githubUsername',
    message:'Please enter Github username?',
    type:'input'






},{
    name:'email',
    message:'Please enter an email address?',
    type:'input'
   





}








])
.then(function(answer){


fs.writeFile('./readme.md', "# Project Title<br />"+" ## "
+answer.projectTitle+"<br /> # Description"+"<br /> ## "+answer.description
+" <br /># Install Instructions"+" <br />## "+answer.installInstructions+"<br /> # Usage Information"
+" <br />## "+answer.usageInformation+" <br /># Contribution Guidelines"+" <br />## "+answer.contribute+" <br /># Test Instructions"+
" <br>## "+answer.testInstructions+"<br> # License Options"+" <br>## "+answer.licenseOptions+
" <br /># Github Username"+" <br />## "+answer.githubUsername+"<br /> # Email"+" <br />## "+answer.email

, err => {
    if (err) throw new Error(err);

    console.log('Page created! Check out README.md in this directory to see it!');
  });


});
