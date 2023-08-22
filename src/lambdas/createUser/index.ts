import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {connectDB, closeConnectionDB, User, IUser} from '/opt/nodejs/business-logic'




export const handler = async (
  event: any,
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
  
    const user: IUser = event.body;
  
    const newUser = new User(user);
  
    const result = await newUser.save();
  
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error creating user: ", error);
    return {
      statusCode: 500,
      body: "Failed to create user",
    };
  } finally {
    await closeConnectionDB();
  }

}