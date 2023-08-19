import { AppSync } from "@aws-sdk/client-appsync";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import ModelCard from "./ModelCard";
import Link from "next/link";

export default async function Models() {
  const models = await getModels();
  console.log(models);

  const modelEntries = Object.entries(models);
  // x.map(([n, s]) => console.log(n))

  return (
    <div className="flex flex-col justify-center items-center gap-y-9">
      <Link href="/model/create">
        <button className="border-2 rounded-md p-3 w-fit">
          Create new model
        </button>
      </Link>
      <div className="flex flex-row">
        <div>
          {modelEntries.map(([model, att], key) => (
            <ModelCard key={key} name={model} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function getModels() {
  const appSyncClient = new AppSync();

  const params = {
    apiId: process.env.APPSYNC_API_ID,
    format: "SDL",
  };

  const res = await appSyncClient.listDataSources({
    apiId: process.env.APPSYNC_API_ID,
    maxResults: 5,
  });

  const dynamodbClient = new DynamoDB();

  const datasources = res.dataSources || [];
  const tables: { [key: string]: any } = {};
  for (let i = 0; i < datasources?.length; i++) {
    const datasource = datasources[i] as Datasource;

    if (datasource.dynamodbConfig?.tableName) {
      const tableName = datasource.dynamodbConfig.tableName;

      const modelTable = await dynamodbClient.describeTable({
        TableName: tableName,
      });

      tables[tableName] = modelTable.Table?.KeySchema;
    }
  }

  return tables;
}

interface Datasource {
  dynamodbConfig?: {
    tableName?: string;
  };
}
