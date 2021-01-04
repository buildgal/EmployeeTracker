const mysql = require("mysql");
const inquirer = require("inquirer");


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
              "View All",
              "View all by Role",
              "View by deparment",
              "View by employee",
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
              case "View All":
                viewAll();
            break;

              case "View all by Role":
              viewRole();

            break;

            case "View by deparment":
            break;

            case "View by employee":
            break;

            case "Add a department":
            break;

            case "Add a role":
            break;

            case "Add an employee":
            break;

            case "Update employee role":
            break;
                
                
                
          
          
          }
      })
  }

  function viewAll(){
      connection.query("SELECT * FROM employee_tb",
      function(err, res){
          if (err) throw err 
          console.log(res)
          displayQuestion();
      })
  }

  //Functions that add something to the table 
function addDept(){

  connection.query("###Update",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })

}

function addRole(){

  connection.query("###Update",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })

}

function addEmpoyee(){

  connection.query("###Update",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })

}


//functions that view the table 

function viewDept(){
  connection.query("SELECT * FROM employee_tb",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })
}

function viewRole(){
  connection.query("SELECT * FROM employee_tb",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })
}

function viewEmployee(){
  connection.query("SELECT * FROM employee_tb",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })
}



//functions that update the table 

function updateRole(){

  connection.query("###Update",
  function(err, res){
      if (err) throw err 
      console.log(res)
      displayQuestion();
  })

}

//I just have to add the query functions 
//I also have to use that fancy new display table 
//then this HW should be good to go... maybe like 2 hours left on this max... if not distracted! 