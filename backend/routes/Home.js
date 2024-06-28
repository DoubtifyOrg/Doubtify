import express from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import bodyParser from 'body-parser'
import dotenv from "dotenv";
import users from "../models/userModel.js";
import doubts from '../models/doubtsModel.js';
import jsonwebtoken from "jsonwebtoken";

const router = express()

dotenv.config()
const JWT_SECRET = "FHHHHHVhsvhdhaee4456sjyjmjyohs6j86j2jshiJSHjsnjmd"

router.get("/", requireAuth, async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const { id } = jsonwebtoken.verify(token, JWT_SECRET);
      const user_doubts = await doubts.find({ username: id });
      res.json(user_doubts);
    } else {
      throw new Error("Authorization header missing");
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});
router.post("/filter", requireAuth, async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const { id } = jsonwebtoken.verify(token, JWT_SECRET);

      const topic = req.body.topic
      if (topic === '') {
        const user_doubts = await doubts.find({ username: id });
        res.json(user_doubts);
      }
      else {
        const user_doubts = await doubts.find({ username: id, topic: topic });
        res.json(user_doubts);
      }

    } else {
      throw new Error("Authorization header missing");
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});
router.post("/filter_side", requireAuth, async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const { id } = jsonwebtoken.verify(token, JWT_SECRET);

      const subject = req.body.subject
      if (subject === 'All') {
        const user_doubts = await doubts.find({ username: id });
        res.json(user_doubts);
      }
      else {
        const user_doubts = await doubts.find({ username: id, subject: subject });
        res.json(user_doubts);
      }

    } else {
      throw new Error("Authorization header missing");
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});
router.post("/add_pic", requireAuth, async (req, res) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    const { id } = jsonwebtoken.verify(token, JWT_SECRET);

    const doubt = {

      username: id,
      q_url: req.body.q_url,
      title: req.body.title,
      subject: req.body.subject,
      topic: req.body.topic,
      sol_url:req.body.sol_url,
      date: currentDate
    };

    const response = await doubts.insertMany(doubt);
    console.log(response);
  }
});


export { router }