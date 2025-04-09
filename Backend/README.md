# To Run

## Install dependencies.
``` bash 
npm install
```

### Start development server 
```bash
npm run dev
```
### Start Production server
```bash
npm run start
```


# Api Endpoints
They usually start with htpp://(host):port/api/(version)

## Authentication Endpoints. 

### /Login
Type : Post.  
Description : Handles the user login.  
Input: username, password  
Returns: session cookie and basic user information.

### /Register 
Type : Post.  
Description : Handles the user Registration.  
Input: forename, surname ,email,username,password.  
Returns:success or failiure code with details. 

### /Logout

## Group endpoints
#### All endpoints need the user's session cookie.
### /groups 
Type:Get  
Description: Gets all the user's groups. 
Input: Only the session id.
Return:  The user's groups in json format 

### /groups
Type:Post  
Description:Creates a new group.  
Input:A group name.  
Return:The new groupchat information (json)  

### /groups/:groupid/messages?datefrom =  
Type:Get  
Description:Gets all messages from a group from a date.   
Input:group_id and the date to get the messages from.    
Return:The first 50 messages before the date. on first call it will automatically be the current time. Array[json]  

### /groups/:groupid/join
Type:Post  
Description:Adds the user to a goup  
Input:The groupid of the group to join.   
Return:The joined chat object (json)  

### /groups/:groupid/leave
Type:Delete  
Description:Leaves a group.  
Input:The groupid of the group to be left   
Return: Confirmation that it has been left  (statuse code 200 ) or and error (status code 500)  


# Models

## User 
  user_id  uuid [primary key]  
  forename varchar  
  surname varchar   
  email varchar [unique]   
  username varchar [unique]  
  hash_password varchar  
  date_created datetime  
  last_online timestamp  


## Group
  group_id uuid [primary key]  
  group_creator uuid [ref:> User.user_id]  
  group_name varchar   
  date_created datetime  


## group_participants
  user_id uuid [ref:>User.user_id]  
  group_id uuid [ref:> Group.group_id]  
  PRIMARY KEY (user_id,group_id)  


## Metric
  user_id uuid [ref:>User.user_id]  
  metric_type varchar  
  metric_value integer  
  date_created datetime  


## Goal
  goal_id uuid [primary key]  
  user_id uuid [ref:> User.user_id]  
  status enum   
  goal_title varchar  


## Group_Messages
  message_id uuid [primary key]  
  user_id uuid [ref:> User.user_id]  
  group_id uuid [ref:> Group.group_id]  
  content varchar   
  time_sent timestamp  
  goal_id uuid [ref: > Goal.goal_id]  
