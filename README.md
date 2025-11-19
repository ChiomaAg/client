Blog Posts API

A lightweight REST API for creating, reading, updating, deleting, and searching blog posts.
Built with Node.js, Express, and MongoDB.

Endpoints
GET /posts

Returns all posts.

Search posts:

/posts?search=keyword

GET /posts/:id

Returns a single post by its ObjectId.

POST /posts

Create a new post.

JSON body:

{
  "title": "Title here",
  "content": "Content here",
  "category": "Category",
  "tags": "tag1 tag2"
}

PUT /posts/:id

Update an existing post.
Uses the same JSON fields as POST.

DELETE /posts/:id

Delete a post by ID.

Search Notes

The search query filters posts by case-insensitive partial matches in:

title

content

category

tags

Example:

/posts?search=travel

Setup

Install dependencies:

npm install


Start the server:

npm start


Environment variable required:

MONGO_URI=your_connection_string

Assignment from: https://roadmap.sh/projects/blogging-platform-api