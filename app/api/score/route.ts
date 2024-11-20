import { NextResponse } from "next/server";
import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

async function getDb() {
  if (!db) {
    const client = new MongoClient(process.env.MONGO_URI || "");
    await client.connect();
    db = client.db("cricket_scoring");
  }
  return db;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { runs, extras, wickets, striker, nonStriker, bowler, batsmanStats, bowlerStats, dismissedBatsmen } = payload;

    const db = await getDb();
    const collection = db.collection("matches");
    const result = await collection.insertOne({
      runs,
      extras,
      wickets,
      striker,
      nonStriker,
      bowler,
      batsmanStats,
      bowlerStats,
      dismissedBatsmen,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "Failed to save match data." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("matches");

    const matchData = await collection
      .find({})
      .sort({ timestamp: -1 }) 
      .limit(1)
      .toArray();

    if (!matchData.length) {
      return NextResponse.json({ error: "No match data found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: matchData[0] });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "Failed to fetch match data." }, { status: 500 });
  }
}
