const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/readMe');
//const generateMd = require('./src/read');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'project-title',
      message: 'What is the project title name?(Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please  enter a project title!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter a description!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'installInstructions',
      message: 'Please enter install instructions(Required)',
      validate: installInstructions => {
        if (installInstructions) {
          return true;
        } else {
          console.log('Please enter install instructions!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'usageInfo',
      message: 'Please enter usage information.(Required)',
      validate: usageInfo => {
        if (usageInfo) {
          return true;
        } else {
          console.log('Please enter usage information!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'contribute',
      message: 'Please enter contribution guidelines.(Required)',
      validate: contribute => {
        if (contribute) {
          return true;
        } else {
          console.log('Please enter contribution guidelines!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'testInstructions',
      message: 'Please enter test instructions.(Required)',
      validate: testInstructions => {
        if (testInstructions) {
          return true;
        } else {
          console.log('Please enter test instructions!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'Check from the list of licence options',
      choices: ['Public Domain', 'Permissive', 'LGPL', 'copyleft', 'Propietary']
    },

    {
      type: 'input',
      name: 'githubUsername',
      message: 'Please enter a github username(Required)',
      validate: githubUsername => {
        if (githubUsername) {
          return true;
        } else {
          console.log('Please enter a github username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'emailAddress',
      message: 'Please enter an email addressRequired)',
      validate: emailAddress => {
        if (emailAddress) {
          return true;
        } else {
          console.log('Please enter an email address!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
const pageMd=generateMd();
    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });
