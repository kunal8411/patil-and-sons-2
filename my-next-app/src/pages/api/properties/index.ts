// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { MongoClient } = require("mongodb");
import { Request } from "express";
import dbConnect from "../../../utils/dbConnect";
import Properties from "../../../models/Properties";

export default async function handler(req: Request, res: any) {
  const { method } = req;
  let result = await dbConnect();
  switch (method) {
    case "GET":
      try {
        const allProperties = await Properties.find();
        res.status(200).json({ allProperties });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const newProperty = new Properties(req.body);
        const savedProperty = await newProperty.save();
        res.status(201).json({ success: true, data: savedProperty });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: "Failed to add property",
          error: error?.message,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
