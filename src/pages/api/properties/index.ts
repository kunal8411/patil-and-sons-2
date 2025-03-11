// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../utils/dbConnect";
import Properties from "../../../models/Properties";

export default async function handler(req: NextApiRequest, res: NextApiResponse<PropertyResponse>) {
  const { method } = req;
 
  switch (method) {
    case "GET":
      try {
        await dbConnect();
        const allProperties = await Properties.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, allProperties: allProperties });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(400).json({ success: false, error: errorMessage });
      }
      break;
    case "POST":
      try {
        await dbConnect();
        const newProperty = new Properties(req.body);
        const savedProperty = await newProperty.save();
        res.status(201).json({ success: true, allProperties: savedProperty });
      } catch (error: unknown) {
        console.error("Error handling property request:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ success: false, error: errorMessage });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

interface PropertyResponse {
  success: boolean;
  allProperties?: unknown;
  error?: string;
}
