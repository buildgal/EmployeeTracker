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

  connection.query("###Update",
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
  })



function addRole(){

  connection.query("###Update",
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
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
  connection.query("SELECT * FROM employee_tb, role_tb.title, role_tb.salary, department_tb.name",
  
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
  })
}



//functions that update the table 

function updateRole(){

  connection.query("###",
  function(err, res){
      if (err) throw err 
      console.table(res)
      displayQuestion();
  })

}
