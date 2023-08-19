import { AppSync } from "@aws-sdk/client-appsync";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const modelName = toCamelCase(body.name);

  const createRes = createDataSource(modelName);

  if (!createRes)
    return NextResponse.json(
      { error: "Failed to created model " + body.name },
      { status: 500 }
    );

  return NextResponse.json({ createRes });
}

async function createDataSource(name: string) {
  const appSyncClient = new AppSync();
  const dynamodbClient = new DynamoDB();

  const dbCreateRes = await dynamodbClient.createTable({
    TableName: name,
    AttributeDefinitions: [{ AttributeName: "ID", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "ID", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
    DeletionProtectionEnabled: false,
    TableClass: "STANDARD",
  });

  if (dbCreateRes.TableDescription?.TableStatus !== "CREATING") {
    return null;
  }

  const res = await appSyncClient.createDataSource({
    apiId: process.env.APPSYNC_API_ID || "",
    name: name,
    type: "AMAZON_DYNAMODB",
    dynamodbConfig: {
      tableName: name,
      awsRegion: "us-east-1",
    },
    serviceRoleArn:
      "arn:aws:iam::155584757436:role/CMS-CMSAppSyncAPIRole-MHXLQCBY70V4",
  });

  return true;
}

function toCamelCase(w: string) {
  const words = w.split(" ");

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    words[i] = word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  return words.join("");
}
