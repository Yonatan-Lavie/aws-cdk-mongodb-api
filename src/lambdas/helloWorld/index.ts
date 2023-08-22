import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';




export async function main(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  console.log(event);

  return {
    // 👇 using calc layer
    body: JSON.stringify({message: 'Hello World Lambda'}),
    statusCode: 200,
  };
}