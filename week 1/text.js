// function greet(user){
//     console.log("hi "+ user.name + " your age is " + user.age) 
// }
// let user = {
//     name:"Naveen",
//     age : 19,
//     gender : "male"

// }
// greet(user);


function solve(arr) {
    let arr1 = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].age >= 18 && arr[i].gender === "male") {
            arr1.push(arr[i]);
        }
    }
    return arr1;
}

let user = [{
    name: "Naveen",
    age: 20,
    gender: "male"
}, {
    name: "something",
    age: 9,
    gender: "dont prefer"
}, {
    name: "unknown",
    age: 32,
    gender: "male"
}];

console.log(solve(user));
