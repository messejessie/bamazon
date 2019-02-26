const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");

let itemStmt = "";


// create the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "products_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  //connection.end();
  console.log("I works");
  start()
});
function start() {
  connection.query("SELECT * FROM inventory", function (err, results) {

    if (err) throw err;
    //console.log(results);
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              let department_info = "";
              department_info = results[i].department_name
              //item_info = results[i].item_name + " " + results[i].department_name + " " + "price =" + " " + results[i].price;
              choiceArray.push(department_info);
            }
            return choiceArray;
          },
          message: "What department would you like to view?"
        },
        // {
        //   name: "qty",
        //   type: "input",
        //   message: "How many would you like to purachase?"
        // },
        //confirm
        {
          type: "confirm",
          name: "confirm",
          message: "Are you sure you want to purchase?",
          default: true
        }
      ])
      .then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {

          console.log(inquirerResponse.confirm)
          buyItem(inquirerResponse);
        } else {
          console.log("Please come back when you are ready to make a purchase. Have a nice day!");
        };

      });
  });
}
// show the items and pricing
function buyItem(inquirerResponse) {
  connection.query("SELECT * FROM inventory WHERE ?", { department_name: inquirerResponse.department },
    function (err, results) {
      //console.log(results)
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function () {
              let choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                let item_info = results[i].item_name + " " + results[i].department_name + " " + "price =" + " " + results[i].price;
                choiceArray.push(item_info);
              };
              return choiceArray
            },
            message: "Which item would you like to purchase?"
          },
          {
            name: "qty",
            type: "input",
            message: "Please enter a vaild quantity."
          },
          {
            type: "Ccnfirm",
            name: "confirm",
            message: "Please confirm your order.",
            default: true,

          },

        ])
        .then(function (inquirerResponse) {
          if (inquirerResponse.confirm) {
            let customerItem;
            console.log(results.length);
            let customerChoice = str.split(", ")
            console.log(customerChoice);
            for (let i = 0; i < results.length; i++) {
              if (results[i].item_name == customerChoice) {
                customerItem = results[i];
                console.log(customerItem);
              }
              {
                console.log(inquirerResponse);
                console.log(customerItem);
                console.log(customer.item_id)
              }
            }
            connection.query("SELECT * FROM inventory WHERE ?", { item_id: customerItem.item_id },
              function (err, results) {
                if (err) throw err;
                console.log("Success!");
                console.log(results[0]);
                //
                qty = parseInt(inquirerResponse.qty);
                if (results[0].stock_quanity > qty) {
                  let total = (qty * customerItem.price);
                  let mess = `Your purchase of ${inquirerResponse.qty} ${customerItem.item_name} ${customerItem.department_name} comes to ${total}! Congrats!`
                  console.log(mess);
                } else {
                  mess = `Sorry I only have ${results[0].stock_quanity} in stock for ${customerItem.item_name}`
                  console.log(mess);
                }

              });
          }

          else{
            console.log("Please come back when you are ready to make a purchase. Have a nice day!")
          }
          
          connection.end();

        });

    });

};