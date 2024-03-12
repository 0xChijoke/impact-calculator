import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "~~/services/db/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    const vectors = await getVectors();
    res.status(200).json(vectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getVectors = async () => {
  const client = await clientPromise;
  const db = client.db("impact_calculator");
  const vectors = await db.collection("impactVectors").find({}).toArray();
  return vectors;
};
