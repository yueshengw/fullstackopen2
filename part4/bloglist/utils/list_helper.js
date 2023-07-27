const dummy = (_blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    };

    return blogs.reduce(reducer, 0);
};

// {
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     likes: 12
// }

const favoriteBlog = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) return null;
    let retVal = blogs[0];
    for (let blog of blogs) {
        console.log(blog);
        if (blog.likes > retVal.likes) {
            retVal = blog;
        }
    }
    return retVal;
};

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return {};
    }
    const authorToCount = {};

    for (let blog of blogs) {
        authorToCount[blog.author] = authorToCount[blog.author] ? authorToCount[blog.author] + 1 : 1;
    }

    const countToAuthor = {};
    let maxCount;
    for (let [author, count] of Object.entries(authorToCount)) {
        maxCount = maxCount ? Math.max(parseInt(count), maxCount) : count;
        countToAuthor[count] ? countToAuthor[count].push(author) : countToAuthor[count] = [author];
    }

    return {
        author: countToAuthor[maxCount][0],
        count: maxCount
    };
};

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return {};
    }
    const authorToLikes = {};

    for (let blog of blogs) {
        authorToLikes[blog.author] = authorToLikes[blog.author] ? authorToLikes[blog.author] + blog.likes : blog.likes;
    }

    const likesToAuthor = {};
    let maxLikes;
    for (let [author, count] of Object.entries(authorToLikes)) {
        maxLikes = maxLikes ? Math.max(parseInt(count), maxLikes) : count;
        likesToAuthor[count] ? likesToAuthor[count].push(author) : likesToAuthor[count] = [author];
    }

    return {
        author: likesToAuthor[maxLikes][0],
        likes: maxLikes
    };
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};