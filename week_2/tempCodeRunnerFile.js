//   Synchronously (One by one)

// const fsa = require('fs');

// function read(err,data){
//     console.log(data);
// }

// const contents = fsa.readFileSync('a.txt','utf-8',read);
// console.log(contents);

// const content2 = fsa.readFileSync('b.txt','utf-8',read);
// console.log(content2);

// ///////////////////////

// ///// Asynchronous /////

// const fs = require("fs");

// function print (err, contents) {
//     console.log(contents);
//   }

// fs.readFile("a.txt", "utf-8",print);

// fs.readFile("b.txt", "utf-8",print);

// console.log("hey");