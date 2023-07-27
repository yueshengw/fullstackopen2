const _ = require("lodash");

let blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

let result = _.countBy(blogs, (blog) => {
    console.log(blog.author);
    return blog.author;
});

// { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
console.log(result);

result = _.transform(result, function(result, value, key) {
    (result[value] || (result[value] = [])).push(key);
}, {});

/*
{
  '1': [ 'Michael Chan' ],
  '2': [ 'Edsger W. Dijkstra' ],
  '3': [ 'Robert C. Martin' ]
}
*/
console.log(result);

let maxKey = _.max(Object.keys(result));

// maxKey: 3
console.log("maxKey:",maxKey);
// Robert C. Martin
console.log(result[maxKey][0]);

// alt
const authorToCount = {};

for (let blog of blogs) {
    console.log(blog);
    authorToCount[blog.author] = authorToCount[blog.author] ? authorToCount[blog.author] + 1 : 1;
}

const countToAuthor = {};
let maxCount; // check authorToCount has length > 0
for (let [author, count] of Object.entries(authorToCount)) {
    maxCount = maxCount ? Math.max(parseInt(count), maxCount) : count;
    countToAuthor[count] ? countToAuthor[count].push(author) : countToAuthor[count] = [author];
}

console.log(countToAuthor);
console.log(countToAuthor[maxCount][0]);

const response = {
    author: countToAuthor[maxCount][0],
    count: maxCount
};

console.log(response);