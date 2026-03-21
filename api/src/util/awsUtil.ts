import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const createDynamoDBClient = () => {
    switch (process.env.ENVIRONMENT) {
        case 'local':
            return new DynamoDBClient({
                region: process.env.REGION,
                endpoint: "http://localhost:4566",
                credentials: {
                    accessKeyId: "dummy-access-key",
                    secretAccessKey: "dummy-secret-key",
                },
            });
        case 'sam-local':
            return new DynamoDBClient({
                region: process.env.REGION,
                endpoint: "http://host.docker.internal:4566",
                credentials: {
                    accessKeyId: "dummy-access-key",
                    secretAccessKey: "dummy-secret-key",
                },
            });
        case 'aws':
            return new DynamoDBClient({
                region: process.env.REGION
            });
        default:
            throw new Error('Invalid environment value [ ' + process.env.ENVIRONMENT + ' ].');
    }
}

export const docClient = DynamoDBDocumentClient.from(createDynamoDBClient());