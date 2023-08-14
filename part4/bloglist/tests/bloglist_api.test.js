const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test("returns correct amount of blogs in JSON format", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all blogs objects define the id property", async () => {
    const blogsInDb = await helper.blogsInDb();
    for (let blog of blogsInDb) {
        await expect(blog.id).toBeDefined();
    }
});

test("HTTP POST req to /api/blogs creates new blog", async () => {
    const newBlog = {
        title: "test",
        author: "user",
        url: "https://example.com/",
        likes: 11,
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    const result = blogsInDb.some((blog) => {
        return blog.title === newBlog.title &&
            blog.author === newBlog.author &&
            blog.url === newBlog.url &&
            blog.likes === newBlog.likes;
    });

    await expect(result).toBe(true);
});

test("missing likes property defaults to 0", async () => {
    const newBlog = {
        title: "test",
        author: "user",
        url: "https://example.com/",
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    const result = blogsInDb.some((blog) => {
        return blog.title === newBlog.title &&
            blog.author === newBlog.author &&
            blog.url === newBlog.url &&
            blog.likes === 0;
    });

    await expect(result).toBe(true);
});

describe("missing title and/or url properties are unacceptable", () => {
    test("missing title", async () => {
        const newBlog = {
            author: "user",
            url: "https://example.com/",
            likes: 11,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400);
    });

    test("missing author", async () => {
        const newBlog = {
            title: "test",
            url: "https://example.com/",
            likes: 11,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400);
    });

    test("missing title and author", async () => {
        const newBlog = {
            url: "https://example.com/",
            likes: 11,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});