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
              "View all by Role"
          ]}
        ]).then(function(data){
          switch (data.choice){
              case "View All":
                viewAll();
            break;

              case "View all by Role":
              viewRole();
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

