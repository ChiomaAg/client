import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    const search = req.query.search;
    const collection = db.collection("posts");
    const sortField = { title: -1 };

    if (!search) {
        const results = await collection.find().sort(sortField).toArray();
        return res.status(200).send(results);
    };

    const filter = {
        $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } }
        ]
    }

    const results = await collection.find(filter).sort(sortField).toArray();
    return res.status(200).send(results);

});

router.get("/:id", async (req, res) => {
    const collection = db.collection("posts");
    const query = { _id: new ObjectId(req.params.id) };
    const results = await collection.findOne(query);

    if (!results) {
        return res.status(404).send("Post not found");
    }
    return res.status(200).send(results);
});

router.post("/", async (req, res) => {
    const collection = db.collection("posts");

    try {
        const newDocument = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
        };

        const results = await collection.insertOne(newDocument);
        return res.status(201).send(results);

    } catch (err) {
        console.error(err);
        return res.status(400).send("Error adding record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const collection = db.collection("posts");
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(404).send("Post not found");
        }

        return res.status(204).send("Record deleted");

    } catch (err) {
        console.error(err);
        return res.status(404).send("Error deleting record");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const collection = db.collection("posts");
        const updatedDoc = {
            $set: {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                tags: req.body.tags,
            }
        };

        const query = { _id: new ObjectId(req.params.id) };
        const options = {};
        const result = await collection.updateOne(query, updatedDoc, options);

        if (result.matchedCount === 0) {
            return res.status(404).send("Post not found");
        }

        return res.status(200).send("Record updated");

    } catch (err) {
        console.error(err);
        return res.status(404).send("Error updating record");
    }
});



export default router;
