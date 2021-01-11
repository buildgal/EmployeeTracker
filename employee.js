const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "fire",
    database: "employee_list_db"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack); //what is err.stack? 
      return;
    }
    console.log("connected as id " + connection.threadId);
    displayQuestion();
  });

  function displayQuestion() {
      inquirer.prompt([{
          type: "list",
          message: "What action would you like to take?",
          name:"choice",
          choices: [
              "View all Employees",
              "View all by Role",
              "View by deparment",
               "Add a department",
              "Add a role",
              "Add an employee",
              "Update employee role",
              /*
              "Update employee managers",
              "View Employee Manager",
              "Delete department",
              "Delete role",
              "Delete Employee",
              "View department budget"
              */              
          ]}
        ]).then(function(data){
          switch (data.choice){
              case "View All Employees":
                viewEmployee();
            break;

              case "View all by Role":
              viewRole();

            break;

            case "View by deparment":
              viewDept();
            break;

            case "Add a department":
              addDept();
            break;

            case "Add a role":
              addRole();
            break;

            case "Add an employee":
              addEmpoyee();
            break;

            case "Update employee role":
              updateRole()
            break;          
          
          }
      })
  }

  //Functions that add something to the table 
function addDept(){
    inquirer.prompt([{
      name:"department_Name",
      type:"input",
      message:"Enter department name."
    }]).then (function (deptAnswers){
      connection.query("INSERT INTO department_tb SET ?",
      {
       department_name: deptAnswers.department_Name
      }, function (err){
        if (err) throw err 
        console.table(deptAnswers)
        displayQuestion()
      }
      )      

    })
  }


function addRole(){
  inquirer.prompt([
    {
      type:"input",
      message:"Enter a title.",
      name:"title"
    },
    {
      type:"input",
      message:"Enter a salary.",
      name:"salary"
    },
    {
      type:"input",
      message:"Enter a department ID.",
      name:"Department_ID"
      //choices:[
      //  "Select an ID"
      //]
    }]).then(function(data){
      //switch (data.choice){
       // case "Select an ID":
       // viewDept();
       // break;
       connection.query ("INSERT INTO role_tb SET?",

       {
         title: data.title,
         salary:data.salary,
         department_id:"Department_ID",

       },

       function(err){
        if (err) throw err 
        console.table(answers)
        displayQuestion()
      })
    
    })
    }


function addEmpoyee(){
//need to ask the user info, research inquirer 
inquirer.prompt([
  {
    
    type:"input",
    message: "Enter employee first name",
    name: "employeeFN"
  },
  {
    type:"input",
    message:"Enter employee last name",
    name:"employeeLN"

  },
  {
    type:"input",
    message:"Enter the employee's role id",
    name:"employeeR"
  },
  {
    type:"input",
    message:"Enter employee's manager's id",
    name:"employeeM'"
  }

]).then( function (answers){
  //we want to grab the answers and insert to SQL
  //grab answers 
  connection.query("INSERT INTO employee_tb SET ?",
  {
    first_name: answers.employeeFN,
    last_name:answers.employeeLN,
    role_id: answers.employeeR,
    manager_id: answers.employeeM
  },
  function(err){
    if (err) throw err 
    console.table(answers)
    displayQuestion()
  })

})
}
//functions that view the table 

function viewDept(){
  connection.query("SELECT * FROM department_tb",
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
  })
}

function viewRole(){
  connection.query("SELECT * FROM role_tb", 
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
  })
}

function viewEmployee(){
  connection.query("SELECT * FROM employee_tb",
  
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
  })
}



//functions that update the table 

function updateRole(){
  inquirer.prompt([
  {
    name: "updated role",
    type: "rawlist",
    message: "Enter the new title. ",
    choices: viewRole()
  },
]).then(function(updatedRole) {
let newRole = viewRole().indexOf(updateRole.role) + 1
connection.query("UPDATE employee_tb SET WHERE ?", 
{
  last_name: updatedRole.lastName
   
}, 
{
  role_id: newRole
   
}, 
function(err){
    if (err) throw err
    console.table(updateRole)
    displayQuestion();
})
})
}