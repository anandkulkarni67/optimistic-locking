import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const createDynamoDBClient = () => {
    console.log(process.env.IS_LOCAL);
    if ( process.env.IS_LOCAL == 'true' ) {
        return new DynamoDBClient({
            region: "local",
            endpoint: "http://localhost:4566",
            credentials: {
                accessKeyId: "dummy-access-key",
                secretAccessKey: "dummy-secret-key",
            },
        });
    } else {
        return new DynamoDBClient({
            region: "local"
        });
    }
}

export const docClient = DynamoDBDocumentClient.from(createDynamoDBClient());