import { CustomerMetadata } from '../model/CustomerMetadata';
import { docClient } from '../util/awsUtil';
import { daysinFuture } from '../util/dataTime';
import { PutCommand, UpdateCommand, DeleteCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

class CustomerService {

    public async addCustomer(id: String, metadata: CustomerMetadata) {
        try {
            const customerId = uuidv4();
            const command = new PutCommand({
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Item: {
                    CustomerId: customerId,
                    MIDIAccessetadata: metadata,
                    Version: 1,
                    Ttl: daysinFuture(Number(process.env.TTL_DAYS))
                }
            });
            const data = await docClient.send(command);
            console.log("Success - Customer record is successfully added", data);
        } catch (err) {
            console.error("Error", err);
        }
    }

    public async updateCustomer(id: String, metadata: CustomerMetadata) {
        try {
            const command = new UpdateCommand({
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Key: {
                    CustomerId: id,
                },
                UpdateExpression: "set version = :newversion, metadata = :metadata",
                ConditionExpression: "version = :currentVersion",
                ExpressionAttributeValues: {
                    ":metadata": metadata,
                    ":newversion": metadata.version + 1,
                    ":currentVersion": metadata.version
                },
                ReturnValues: "UPDATED_NEW"
            });
            const data = await docClient.send(command);
            console.log("Success - Customer record is successfully updated", data);
        } catch (err) {
            console.error("Error", err);
        }
    }

    public async deleteCustomer(id: String, version: number) {
        try {
            const command = new DeleteCommand({
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Key: {
                    CustomerId: id
                },
                ConditionExpression: "version = :currentVersion",
                ExpressionAttributeValues: {
                    ":currentVersion": version
                },
                ReturnValues: "ALL_OLD"
            });
            const data = await docClient.send(command);
            console.log("Success - Customer record is successfully deleted", data);
        } catch (err) {
            console.error("Error", err);
        }
    }

    public async getCustomer(id: String) {
        try {
            const command = new GetCommand({
                TableName: process.env.CUSTOMER_TABLE_NAME,
                Key: {
                    CustomerId: id
                }
            });
            const data = await docClient.send(command);
            console.log("Success - Customer record is successfully retrived", data);
        } catch (err) {
            console.error("Error", err);
        }
    }

}

export const customerService = new CustomerService();