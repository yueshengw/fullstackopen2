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