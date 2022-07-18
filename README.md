# ionic-bonds

## Description
Full-stack chat room application with real-time updates and data persistance.  
### Tech stack:  
Frontend: ReactJS  
Backened: NodeJS, ExpressJS, socket.io  
Database: MongoDB -> database models: https://github.com/jeff-w-hemphill/ionic-bonds/tree/main/api/model

## Setup
1. Ensure you have docker and docker-compose installed on your machine.  
  
    https://docs.docker.com/engine/install/
  
    https://docs.docker.com/compose/install/

## How To Run
1. Clone repo.

```
git clone https://github.com/jeff-w-hemphill/ionic-bonds.git
```
2. Enter repo. 

```
cd ionic-bonds
```

2. Run docker.

```
docker-compose up --build
``` 

3. For subsequent startups, use ```docker-compose up```.

## API Documentation

### Overview
#### Routes:
```POST /register``` -> registers users. 

```POST /login``` -> login users.  

```GET /chatrooms``` -> gets all chatrooms.

```POST /chatrooms``` -> creates a new chatroom.  

```GET /chatrooms/:name``` -> gets a specific chatroom with it's last 50 messages.  
<br>

#### Web Socket Events 
```'connection'``` -> user is connected to server.

```'disconnect'``` -> user is disconnected from server.

```'join_room'``` -> user joins a specific chatroom.

```'leave_room'``` -> user leaves a specific chatroom.

```'send_message'``` -> user sends a message and message gets added to db.  

```'recieve_message'``` -> user receives message from socket.  

### Details 

```GET /```
#### returns blank html. 

```POST /register```
#### Example request body:  
```
{ "username": "jeff42", "name": "Jeff" }
```
#### Example response:   
```
{ "success": "New user jeff42 created! }
```
\
\

```POST /login```
#### Example request body:  
```
{ "username": "jeff42" }
```
#### Example response:   
```
{ "message": "jeff42 is logged in." }
```
\
\

```GET /chatrooms```
#### Example response:
```
[
  {
    "name": "roomA",
    "lastMessageTime": "2022-07-18T16:57:48.000Z"
  },
  {
    "name": "roomB",
    "lastMessageTime": "2022-07-18T16:57:54.000Z"
  },
]
```
\
\
```POST /chatrooms```
#### Example request body:  
```
{  "name": "roomA",
   "messages": [
      { "user": "userA",
        "timestamp": "2022-01-01",
        "content": "room created by user1"
      }
   ]   
}
```
#### Example response:   
```
{
  "name": "roomA",
  "messages": [
    {
      "content": "room created by userA",
      "timestamp": "2022-01-01T00:00:00.000Z",
      "_id": "62d5be98564cc910519e8ddb"
    }
  ],
  "_id": "62d5be98564cc910519e8dda",
  "__v": 0
}
```
\
\
```GET /chatrooms/:name```
#### Example response:  
```
{
  "_id": "62d5bd96564cc910519e8dd1",
  "name": "roomA",
  "messages": [
    {
      "content": "room created by userA",
      "timestamp": "2022-01-01T00:00:00.000Z",
      "_id": "62d5bd96564cc910519e8dd2"
    },
    {
      "username": "jeff9",
      "content": "Hello, how are you?",
      "timestamp": "2022-07-18T20:17:17.000Z",
      "_id": "62d5bfcd564cc910519e8de2"
    }
  ],
  "__v": 0
}
```
