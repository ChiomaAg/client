const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => { //get all posts
    const collection = db.collection("posts"); //grabbing the collection of posts from the blogd database
    const sortField = { date: -1, title: -1 }; //sorting by date, then title
    const results = await collection.find().sort(sortField).toArray(); //converting the collection to an array
    return res.status(200).send(results);//send results to browser, status code 200.
});

router.get("/:id", async (req, res) => { //get a post given an id
    const collection = db.collection("posts");
    const query = { _id: new ObjectId(req.params.id) }; //get document using ID
    const results = await collection.findOne(query);
    if (!result) {
        return res.status(404).send("Post not found");
    }
    return res.status(200).send(results);
});

router.post("/", async (req, res) => {  //create a new post
    const collection = db.collection("posts");

    try {
        let newDocument = {
            "title": req.body.title,
            "content": req.body.content,
            "category": req.body.category,
            "tags": req.body.tags,
        }

        const results = await collection.insertOne(newDocument);
        return res.status(201).send(results);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error adding record")
    }

})

router.delete("/:id", async (req, res) => { //delete a post given an id
    try {
        const collection = db.collection("posts");
        const query = { _id: new ObjectId(req.params.id) }; //get document using ID
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 1) {
            console.log("Successfully deleted blog!")
        } else {
            return res.status(404).send("Post not found");
        }
        return res.status(204).send(result);
    } catch (err) {
        console.error(err);
        res.status(404).send("Error deleting record");
    }
})

router.put("/:id", async (req, res) => { //edit a post
    try {
        collection = db.collection("posts")  //dawg this could have been a global variable\
        updatedDoc = {
            $set: {
                "title": req.body.title,
                "content": req.body.content,
                "category": req.body.category,
                "tags": req.body.tags,
            }
        }

        query = { _id: new ObjectId(req.params.id) }; //get document using ID
        options = {};
        const result = await collection.updateOne(query, updatedDoc, options);
        if (result.matchedCount === 0) {
            return res.status(404).send("Post not found");
        }
        return res.status(200).send("Record updated")

    } catch (err) {
        console.error(err);
        res.status(404).send("Error updating record");
    }
})

module.exports = router;

