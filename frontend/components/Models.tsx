import { AppSync } from "@aws-sdk/client-appsync";

export default async function Models() {
  const data = await getSchema()
  console.log(data)

  return <div>Models</div>;
}

async function getSchema() {
  const client = new AppSync();

  client.createGraphqlApi

  const params = {
    apiId: process.env.APPSYNC_API_ID,
    format: "SDL",
  };

  const res = await client.listDataSources({
    apiId: process.env.APPSYNC_API_ID,
    maxResults: 5,
  });

  return res;
}