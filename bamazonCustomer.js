let mysql = require("mysql");
let inquirer = require("inquirer");

// create the connection information for the sql database
let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Te$la@2019",
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
    connection.query("SELECT * FROM inventory", function(err, results) {

    if (err) throw err;
    //console.log(results);
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              var item_info = "";
              item_info = results[i].item_name + " " + results[i].department_name + " " + "price =" + " " + results[i].price;
              choiceArray.push(item_info);
            }
            return choiceArray;
          },
          message: "What Item would you like to purchase?"
        },
        {
          name: "qty",
          type: "input",
          message: "How many would you like to purachase?"
        },
        {
          type: "confirm",
          message: "Are you sure you want to purchase?",
          default: true
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.price< parseInt(answer.price)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}