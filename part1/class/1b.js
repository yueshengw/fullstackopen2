// variables. const for permant address, let for whatever
const x = 1;
let y = 5;

console.log(x, y);
y += 10;
console.log(x, y);
y = 'sometext';
console.log(x, y)
// x = 4; Will cause an error 

//Array
const t = [1, -1, 3];
t.push(5);
console.log(t.length);
console.log(t[1]);

// forEach iterates through array, does not return anything
t.forEach(value => {
    console.log(value);
})

const t2 = t.concat(5);
console.log(t);
console.log(t2);

// map iterates through array and return new array with operations done
const m1 = t.map(value => value * 2);
console.log(m1);

const m2 = t.map(value => '<li>' + value + '</li>');
console.log(m2);

// Destructuring
const t3 = [1, 2, 3, 4, 5];
const [first, second, ...rest] = t3;
console.log(first, second);
console.log(rest);

// Objects
const object1 = {
    name: 'Donald Duck',
    age: 25,
    education: 'High School',
}
const object2 = {
    name: 'Full Stack Web Application Development',
    level: 'Intermediate Studies',
    size: 5
}
const object3 = {
    name: {
        first: 'Dan',
        last: 'Abroamov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford Univeristy',
}
// Values of properties could be accessed/changed using dot or bracket notation
console.log(object1.name);
const fieldName = 'age';
console.log(object1[fieldName]);

// Objects in JavaScript can have their own methods too.
object1.address = 'Helsinki';
object1['secret number'] = 12341;

// Functions
const sum = (p1, p2) => {
    console.log(p1);
    console.log(p2);
    return p1 + p2;
}
const result = sum(1, 5);
console.log(result);

// If there is only one parameter, the parenthreses could be excluded.
const square = p => {
    console.log(p);
    return p * p;
}
const result2 = square(5);
console.log(result2);

// If there is only one expreession then the braces will not be needed
const square2 = p => p * p
const t4 = [1, 2, 3];
const tSquared = t4.map(p => p * p);
console.log(tSquared);

// There are two ways to reference the function:
// 1. function declaration
function product(a, b) {
    return a * b;
}
const result3 = product(2, 6);
console.log(result3);
// 2. function expression
const average = function(a, b) {
    return (a + b ) / 2;
}
const result4 = average(2, 5);
console.log(result4);

// Object methods and "this"
const jack = {
    name: 'Jack Harlow',
    age: 24,
    education: 'High School',
    greet: function() {
        console.log('Hello, my name is ' + this.name);
    },
}
jack.greet();

// Assigning methods to objects after its creation
jack.growOlder = function() {
    this.age += 1;
};
console.log(jack.age);
jack.growOlder();
console.log(jack.age);

const arto = {
    doAddition: function(a, b) {
        console.log(a + b);
    }
}

arto.doAddition(1, 4); // 5 is printed
// Referencing a function only need the name, can't take the parameters in fact.
const referenceToAddition = arto.doAddition
referenceToAddition(10, 20); // 30 is printed

// The 'this' problem
jack.greet(); // prints 'Hello, my name is Jack Harlow'
// Loses knownledge of what the original this was when calling through a reference because this becomes a global object.
// The value of this is defined based on how the method is called.
const referenceToGreet = jack.greet;
referenceToGreet(); // prints 'Hello, my name is undefined'
// Another example of this is when setTimeout is used because the JavaScript enggine is calling the method and this refers to the global object.
setTimeout(jack.greet, 1000);
// One way to preserve the value of 'this' is using a method called bind.
// jack.greet.bind(jack) creates a new function where 'this' is bound to the point of jack, independent of where and hwo the method is being called.
setTimeout(jack.greet.bind(jack), 1000);
// Arrow function could resolve some problem of 'this' but using it as methods for objects is not advised because then 'this' will not work at all.

// Classes (JavaScipt simulation)
// Still based on JavaScript's prototypal inheritance, is type Object.
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log('Hello, my name is ' + this.name);
    }
}

const kyle = new Person('Kyle', 29);
kyle.greet();
const ashley = new Person('Ashley', 32);
ashley.greet();
