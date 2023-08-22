import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {connectDB, closeConnectionDB, User } from '/opt/nodejs/business-logic'




export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    try {
      await connectDB();
    } catch (error) {
      console.error("Caught error while connecting to mongodb:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }

    const userId = event.queryStringParameters?.id;

    const user = await User.findById(userId);
  
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error("Error finding user: ", error);
    return {
      statusCode: 500,
      body: "Failed to find user",
    };
  } finally {
    await closeConnectionDB();
  }

}