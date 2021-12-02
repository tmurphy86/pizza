import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
tableName = 'stores'
if (os.environ['ENV']):
    tableName = tableName + '-' + os.environ['ENV']

def getCurrentStores():
    table = dynamodb.Table(tableName)
    done = False
    start_key = None
    response = table.scan()
    print(response)
    return response['Items']

def putStore(data):
    table = dynamodb.Table(tableName)
    response = table.put_item(Item=json.loads(data))
    return response

def deleteStore(storeData):
    table = dynamodb.Table(tableName)
    data = json.loads(storeData)
    print(data)
    response = table.delete_item(
        Key={
            'storeCode': data['storeCode']
        }
    )
    return response

def handler(event, context):
    print(event)
    method = "GET"
    if 'httpMethod' in event:
        method = event['httpMethod']
    if (method == 'POST'):
        print("putting data")
        print(putStore(event['body']))
    elif (method == 'DELETE'):
        print(deleteStore(event['body']))

    stores = [
        {
            'storeCode': 'S001',
            'name': 'Andys Pizza',
            'city': 'Atlanta',
            'state': 'GA'
        },
        {
            'storeCode': 'S002',
            'name': 'Andys Pizza and Subs',
            'city': 'Orlando',
            'state': 'FL'
        },
        {
            'storeCode': 'S003',
            'name': 'Andys Airport Pizza',
            'city': 'Chicago',
            'state': 'IL'
        }
    ]
    stores = getCurrentStores()
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(stores)
    }