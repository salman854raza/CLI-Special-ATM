#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

function rainbowText(text: string): string {
    const rainbowColors = [chalk.red, chalk.yellow, chalk.green, chalk.blue, chalk.magenta, chalk.cyan];
    let rainbowText = '';
    for (let i = 0; i < text.length; i++) {
        rainbowText += rainbowColors[i % rainbowColors.length](text[i]);
    }
    return rainbowText;
}

interface User {
    cnic: string;
    pin: number;
    balance: number;
}

const users: User[] = [];
console.log(chalk.bold.italic.underline(rainbowText("\n\t\t___________ WELCOME TO HBL PAKISTAN_____________ \n\t\t")));

async function main() {
    let registerAnswer = await inquirer.prompt([
        {
            name: "register",
            type: "confirm",
            message: "Do you want to register your CNIC?"
        }
    ]);

    if (registerAnswer.register) {
        let cnicAnswer = await inquirer.prompt([
            {
                name: "cnic",
                type: "input",
                message: "Enter your CNIC number:"
            },
            {
                name: "pin",
                type: "number",
                message: "Set your 4-digit PIN:"
            }
        ]);

        let newUser: User = {
            cnic: cnicAnswer.cnic,
            pin: cnicAnswer.pin,
            balance: 500000 // Set initial balance to 500,000
        };

        users.push(newUser);

        console.log(chalk.green("\n Registration successful!\n"));
    }

    let cnicAnswer = await inquirer.prompt([
        {
            name: "cnic",
            type: "input",
            message: "Enter your CNIC number:"
        }
    ]);

    let user = users.find(u => u.cnic === cnicAnswer.cnic);

    if (!user) {
        console.log(chalk.red("\n User not found. Please register first.\n"));
        return;
    }

    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter your PIN:"
        }
    ]);

    if (pinAnswer.pin !== user.pin) {
        console.log(chalk.bgRed("\n Incorrect PIN. Please try again.\n"));
        return;
    }

    console.log(chalk.bgGreen("\n PIN is correct. Login successful!\n"));

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["withdraw amount", "check balance"]
        }
    ]);

    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method:",
                choices: ["fast cash", "enter amount"]
            }
        ]);        
    if (operationAns.operation === "withdraw amount") {
      if (withdrawAns.withdrawMethod === "fast cash") {
          let fastCashAns = await inquirer.prompt([
              {
                  name: "fastCash",
                  type: "list",
                  message: "Select amount:",
                  choices: [
                      chalk.blueBright("1000"),
                      chalk.bgGreenBright("2000"),
                      chalk.bgYellowBright("5000"),
                      chalk.bgWhiteBright("10000"),
                      chalk.bgBlueBright("20000"),
                      chalk.bgBlackBright("50000")
                  ]
              }
          ]);
  
          let withdrawAmount = parseInt(fastCashAns.fastCash);
  
          if (withdrawAmount <= user.balance) {
              user.balance =- withdrawAmount;
              console.log(
                  `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t  ${chalk.bold.green(
                      "Transaction Successful"
                  )}\n\n\t\t${chalk.bold("Transaction Amount")} : ${chalk.bold.red.underline(withdrawAmount)}  \n\t\t${chalk.bold(
                      "Available Balance : "
                  )}${chalk.bold.yellow.underline(user.balance)}\n\n\t\t${chalk.italic.underline(
                      rainbowText("Thanks Using Our Service!")
                  )}`
              );
          } else {
              console.log(
                  `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t   ${chalk.bold.red.underline(
                      "TRANSACTION FAILED"
                  )}\n\t\t  ${chalk.bold("INSUFFICIENT BALANCE!")}\n\n\t\t${chalk.italic.underline(
                      rainbowText("Thanks Using Our Service!")
                  )}`
              );
          }
      } else if (withdrawAns.withdrawMethod === "enter amount") {
          let amountAns = await inquirer.prompt([
              {
                  name: "WithdrawalAmount",
                  type: "number",
                  message: "Enter the your amount to withdraw:"
              }
          ]);
  
          let withdrawAmount = amountAns.WithdrawalAmount;
  
          if (withdrawAmount <= user.balance) {
              user.balance -= withdrawAmount;
              console.log(
                  `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t  ${chalk.bold.green(
                      "Transaction Successful"
                  )}\n\n\t\t${chalk.bold("Transaction Amount")} : ${chalk.bold.red.underline(withdrawAmount)}  \n\t\t${chalk.bold(
                      "Available Balance : "
                  )}${chalk.bold.yellow.underline(user.balance)}\n\n\t\t${chalk.italic.underline(
                      rainbowText("Thanks For Using Our Service!")
                  )}`
              );
          } else {
              console.log(
                  `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t   ${chalk.bold.red.underline(
                      "TRANSACTION FAILED"
                  )}\n\t\t  ${chalk.bold("INSUFFICIENT BALANCE!")}\n\n\t\t${chalk.italic.underline(
                      rainbowText("Thanks For Using Our Service!")
                  )}`
              );
          }
      }
  } else if (operationAns.operation === "check balance") {
      console.log(
          `\n\t\t   ${chalk.bold.bgGrey.underline("CHEQUE BALANCE")}\n\n\t\t   ${chalk.bgBlack.bold("BALANCE : ")}${chalk.bold.bgYellowBright(
              user.balance
          )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
      );
  }
  
    } else if (operationAns.operation === "check balance") {
        console.log(
            `\n\t\t   ${chalk.bold.bgGrey.underline("CHEQUE BALANCE")}\n\n\t\t   ${chalk.bgBlack.bold("BALANCE : ")}${chalk.bold.bgYellowBright(
                user.balance
            )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
        );
    }
}
    

main();










// #! /usr/bin/env node

// import inquirer from "inquirer";
// import chalk from "chalk";

// function rainbowText(text: string): string {
//     const rainbowColors = [chalk.red, chalk.yellow, chalk.green, chalk.blue, chalk.magenta, chalk.cyan];
//     let rainbowText = '';
//     for (let i = 0; i < text.length; i++) {
//         rainbowText += rainbowColors[i % rainbowColors.length](text[i]);
//     }
//     return rainbowText;
// }

// interface User {
//   cnic: string;
//   pin: number;
//   balance: number;
// }

// const users: User[] = [];
// console.log(chalk.bold.italic.underline(rainbowText("\n\t\t___________ WELCOME TO HBL PAKISTAN_____________ \n\t\t")));

// // The rest of your code remains the same...


// async function main() {
//   let registerAnswer = await inquirer.prompt([
//     {
//       name: "register",
//       type: "confirm",
//       message: "Do you want to register your CNIC?"
//     }
//   ]);

//   if (registerAnswer.register) {
//     let cnicAnswer = await inquirer.prompt([
//       {
//         name: "cnic",
//         type: "input",
//         message: "Enter your CNIC number:"
//       },
//       {
//         name: "pin",
//         type: "number",
//         message: "Set your 4-digit PIN:"
//       }
//     ]);

//     let newUser: User = {
//       cnic: cnicAnswer.cnic,
//       pin: cnicAnswer.pin,
//       balance : 500000 // Set initial balance to 500,000
//     };

//     users.push(newUser);

//     console.log(chalk.green("\n Registration successful!\n"));
//   }

//   let cnicAnswer = await inquirer.prompt([
//     {
//       name: "cnic",
//       type: "input",
//       message: "Enter your CNIC number:"
//     }
//   ]);

//   let user = users.find(u => u.cnic === cnicAnswer.cnic);

//   if (!user) {
//     console.log(chalk.red("\n User not found. Please register first.\n"));
//     return;
//   }

//   let pinAnswer = await inquirer.prompt([
//     {
//       name: "pin",
//       type: "number",
//       message: "Enter your PIN:"
//     }
//   ]);

//   if (pinAnswer.pin !== user.pin) {
//     console.log(chalk.bgRed("\n Incorrect PIN. Please try again.\n"));
//     return;
//   }

//   console.log(chalk.bgGreen("\n PIN is correct. Login successful!\n"));

//   let operationAns = await inquirer.prompt([
//     {
//       name: "operation",
//       type: "list",
//       message: "Select an operation",
//       choices: ["withdraw amount", "check balance"]
//     }
//   ]);

//   if (operationAns.operation === "withdraw amount") {
//     let withdrawAns = await inquirer.prompt([
//       {
//         name: "withdrawMethod",
//         type: "list",
//         message: "Select a withdrawal method:",
//         choices: ["fast cash", "enter amount"]
//       }
//     ]);
//     if (withdrawAns.withdrawMethod === "fast cash") {
//       let fastCashAns = await inquirer.prompt([
//         {
//           name: "fastCash",
//           type: "list",
//           message: "Select amount:",
//           choices: [
//             chalk.blueBright("1000"),
//             chalk.bgGreenBright("2000"),
//             chalk.bgYellowBright("5000"),
//             chalk.bgWhiteBright("10000"),
//             chalk.bgBlueBright("20000"),
//             chalk.bgBlackBright("50000")
//           ]
//         }
//       ]);

//       if (fastCashAns.fastCash == 1000) {
//         if (1000 <= user.balance) {
//           console.log(
//             `\n\t\t\t${chalk.bold.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t  ${chalk.bold.green(
//               "Transaction Successful"
//             )}\n\n\t\t${chalk.bold(
//               "Transaction Amount"
//             )} : ${chalk.bold.red.underline("1000")}  \n\t\t${chalk.bold(
//               "Available Balance : "
//             )}${chalk.bold.yellow.underline(
//               (user.balance -= 1000)
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks Using Our Service!"))}`
//           );
//         } else {
//           console.log(
//             `\n\t\t\t${chalk.bold.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.red.underline(
//               "TRANSACTION FAILED"
//             )}\n\t\t  ${chalk.bold(
//               "INSUFFICIENT BALANCE!"
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks Using Our Service!"))}`
//           );
//         }
//       } else if (fastCashAns.fastCash == 2000) {
//         if (2000 <= user.balance) {
//           console.log(
//             `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t  ${chalk.bold.bgGreenBright(
//               "Transaction Successful"
//             )}\n\n\t\t${chalk.bold.bgCyanBright(
//               "Transaction Amount"
//             )} : ${chalk.bold.bgYellowBright.underline("2000")}  \n\t\t${chalk.bold(
//               "Available Balance : "
//             )}${chalk.bold.yellow.underline(
//               (user.balance -= 2000)
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         } else {
//           console.log(
//             `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.red.underline(
//               "TRANSACTION FAILED"
//             )}\n\t\t  ${chalk.bold.bgRed(
//               "INSUFFICIENT BALANCE!"
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         }
//       } else if (fastCashAns.fastCash == 5000) {
//         if (5000 <= user.balance) {
//           console.log(
//             `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t  ${chalk.bold.bgGreenBright(
//               "Transaction Successful"
//             )}\n\n\t\t${chalk.bold.bgCyanBright(
//               "Transaction Amount"
//             )} : ${chalk.bold.bgYellowBright.underline("5000")}  \n\t\t${chalk.bold(
//               "Available Balance : "
//             )}${chalk.bold.bgWhite.underline(
//               (user.balance -= 5000)
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         } else {
//           console.log(
//             `\n\t\t\t${chalk.bold.magentaBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.bgRedBright.underline(
//               "TRANSACTION FAILED"
//             )}\n\t\t  ${chalk.bold(
//               "INSUFFICIENT BALANCE!"
//             )}\n\n\t\t${chalk.italic.redBright.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         }
//       } else if (fastCashAns.fastCash == 10000) {
//         if (10000 <= user.balance) {
//           console.log(
//             `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t  ${chalk.bold.bgGreenBright(
//               "Transaction Successful"
//             )}\n\n\t\t${chalk.bold.bgCyanBright(
//               "Transaction Amount"
//             )} : ${chalk.bold.bgYellowBright.underline("10000")}  \n\t\t${chalk.bold(
//               "Available Balance : "
//             )}${chalk.bold.bgWhite.underline(
//               (user.balance -= 10000)
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         } else {
//           console.log(
//             `\n\t\t\t${chalk.bold.magentaBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.bgRedBright.underline(
//               "TRANSACTION FAILED"
//             )}\n\t\t  ${chalk.bold(
//               "INSUFFICIENT BALANCE!"
//             )}\n\n\t\t${chalk.italic.redBright.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         }
//       } else if (fastCashAns.fastCash == "Other") {
//         let withdrawAmount = await inquirer.prompt({
//           name: "withdrawalAmount",
//           type: "number",
//           message: "Enter the amount to withdraw cash: ",
//         });
//         if (
//           withdrawAmount.withdrawalAmount >= 500 &&
//           withdrawAmount.withdrawalAmount <= user.balance
//         ) {
//           console.log(
//             `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t  ${chalk.bold.bgGreenBright(
//               "Transaction Successful"
//             )}\n\n\t\t${chalk.bold.bgCyanBright(
//               "Transaction Amount"
//             )} : ${chalk.bold.bgRed.underline(
//               withdrawAmount.withdrawalAmt
//             )}  \n\t\t${chalk.bold(
//               "Available Balance : "
//             )}${chalk.bold.bgYellowBright.yellow.underline(
//               (user.balance -= withdrawAmount.withdrawalAmt)
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         } else if (isNaN(withdrawAmount.withdrawalAmt)) {
//           console.log(
//             `\n\t\t\t${chalk.bold.magentaBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.bgRedBright.underline(
//               "TRANSACTION FAILED"
//             )}\n\t ${chalk.bgRedBright.bold(
//               "Please enter the amount in number!"
//             )}\n\n\t     ${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         } else if (withdrawAmount.withdrawalAmt < 500) {
//           console.log(
//             `\n\t\t\t${chalk.bold.magentaBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.bgRedBright.underline(
//               "TRANSACTION FAILED"
//             )}\n\t${chalk.bgCyan.bold(
//               `Please enter amount equal  or more than : ${chalk.bold.bgMagentaBright.underline(
//                 "500"
//               )}`
//             )}\n\n\t\t     ${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         } else {
//           console.log(
//             `\n\t\t\t${chalk.bold.magentaBright.underline(
//               "WITHDRAWAL"
//             )}\n\n\t\t   ${chalk.bold.bgRedBright.underline(
//               "TRANSACTION FAILED"
//             )}\n\t\t  ${chalk.bgRed.bold(
//               "INSUFFICIENT BALANCE!"
//             )}\n\n\t\t${chalk.italic.redBright.underline(rainbowText("Thanks Using Our Service!"))}`
//           );
//         }
//       }
      
//       // withdraw
//     } else if (withdrawAns.withdrawMethod === "enter amount") {
//       let amountAns = await inquirer.prompt([
//         {
//           name: "WithdrawalAmount",
//           type: "number",
//           message: "Enter the your amount to withdraw:"
//         }
//       ]);

//       if (
//         amountAns.WithdrawalAmount >= 500 &&
//         amountAns.WithdrawalAmount <= user.balance
//       ) {
//         console.log(
//           `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//             "WITHDRAWAL"
//           )}\n\n\t\t  ${chalk.bold.bgGreenBright(
//             "Transaction Successful"
//           )}\n\n\t\t${chalk.bold.bgCyanBright(
//             "Transaction Amount"
//           )} : ${chalk.bold.red.underline(
//             amountAns.WithdrawalAmount
//           )}  \n\t\t${chalk.bgYellowBright.bold(
//             "Available Balance : "
//           )}${chalk.bold.yellow.underline(
//             (user.balance -= amountAns.WithdrawalAmount)
//           )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//         );
//       } else if (isNaN(amountAns.WithdrawalAmount)) {
//         console.log(
//           `\n\t\t\t${chalk.bold.bgBlackBright.underline(
//             "WITHDRAWAL"
//           )}\n\n\t\t${chalk.bold.red.underline(
//             "TRANSACTION FAILED"
//           )}\n\t ${chalk.bold(
//             "Please enter the correct amount!"
//           )}\n\n\t     ${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//         );
//       } else if (amountAns.WithdrawalAmount < 500) {
//         console.log(
//           `\n\t\t\t    ${chalk.bold.underline(
//             "WITHDRAWAL"
//           )}\n\n\t\t\t${chalk.bold.bgRedBright.underline(
//             "TRANSACTION FAILED"
//           )}\n\t${chalk.bgRed.bold(
//             `Please enter your amount equal to or more than : ${chalk.bold.bgYellow.underline(
//               "500"
//             )}`
//           )}\n\n\t\t     ${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//         );
//       } else {
//         console.log(
//           `\n\t\t\t${chalk.bold.underline(
//             "WITHDRAWAL"
//           )}\n\n\t\t   ${chalk.bold.bgRedBright.underline(
//             "TRANSACTION FAILED"
//           )}\n\t\t  ${chalk.bold(
//             "INSUFFICIENT BALANCE!"
//           )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//         );
          
    
//           }//Cheque Balance
//         }else if (operationAns.operation === "check balance") {
//           console.log(
//             `\n\t\t   ${chalk.bold.bgGrey.underline(
//               "CHEQUE BALANCE"
//             )}\n\n\t\t   ${chalk.bgBlack.bold("BALANCE : ")}${chalk.bold.bgYellowBright(
//               user.balance
//             )}\n\n\t\t${chalk.italic.underline(rainbowText("Thanks For Using Our Service!"))}`
//           );
//         }
//       // } else {
//       //   console.log(
//       //     `\n\t\t\t  ${chalk.bold.underline(
//       //       "ATM"
//       //     )}\n\n\t\t      ${chalk.bold.bgRedBright.underline("INVALID PIN")}\n\n`
//       //   );
//       // }
//     }
//   }

// main();



















// // if (fastCashAns.fastCash > user.balance) {
//       //   console.log(chalk.red("Insufficient balance"));
//       // } else {
//       //   user.balance -= fastCashAns.fastCash;
//       //   console.log(`${fastCashAns.fastCash} withdrawn successfully`);
//       //   console.log(`Your remaining balance is: ${user.balance}`);
//       // }
//       //   if (amountAns.amount > user.balance) {
//     //     console.log(chalk.red("Insufficient balance"));
//     //   } else {
//     //     user.balance -= amountAns.amount;
//     //     console.log(`${amountAns.amount} withdrawn successfully`);
//     //     console.log(`Your remaining balance is: ${user.balance}`);
//     //   }
//     // }









// if (withdrawAmount <= user.balance) {
  //         user.balance -= withdrawAmount;
  //         console.log(
  //             `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t  ${chalk.bold.green(
  //                 "Transaction Successful"
  //             )}\n\n\t\t${chalk.bold("Transaction Amount")} : ${chalk.bold.red.underline(withdrawAmount)}  \n\t\t${chalk.bold(
  //                 "Available Balance : "
  //             )}${chalk.bold.yellow.underline(user.balance)}\n\n\t\t${chalk.italic.underline(
  //                 rainbowText("Thanks Using Our Service!")
  //             )}`
  //         );
  //     } else {
  //         console.log(
  //             `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t   ${chalk.bold.red.underline(
  //                 "TRANSACTION FAILED"
  //             )}\n\t\t  ${chalk.bold("INSUFFICIENT BALANCE!")}\n\n\t\t${chalk.italic.underline(
  //                 rainbowText("Thanks Using Our Service!")
  //             )}`
  //         );
  //     }
  // } else if (withdrawAns.withdrawMethod === "enter amount") {
  //     let amountAns = await inquirer.prompt([
  //         {
  //             name: "WithdrawalAmount",
  //             type: "number",
  //             message: "Enter the your amount to withdraw:"
  //         }
  //     ]);

  //     let withdrawAmount = amountAns.WithdrawalAmount;

  //     if (withdrawAmount <= user.balance) {
  //         user.balance -= withdrawAmount;
  //         console.log(
  //             `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t  ${chalk.bold.green(
  //                 "Transaction Successful"
  //             )}\n\n\t\t${chalk.bold("Transaction Amount")} : ${chalk.bold.red.underline(withdrawAmount)}  \n\t\t${chalk.bold(
  //                 "Available Balance : "
  //             )}${chalk.bold.yellow.underline(user.balance)}\n\n\t\t${chalk.italic.underline(
  //                 rainbowText("Thanks For Using Our Service!")
  //             )}`
  //         );
  //     } else {
  //         console.log(
  //             `\n\t\t\t${chalk.bold.underline("WITHDRAWAL")}\n\n\t\t   ${chalk.bold.red.underline(
  //                 "TRANSACTION FAILED"
  //             )}\n\t\t  ${chalk.bold("INSUFFICIENT BALANCE!")}\n\n\t\t${chalk.italic.underline(
  //                 rainbowText("Thanks For Using Our Service!")
  //             )}`
  //         );
  //     }
  // }