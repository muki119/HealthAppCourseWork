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

## /Login
Type : Post.  
Description : Handles the user login.  
Input: username, password  
Returns: session cookie and basic user information.

## /Register 
Type : Post.  
Description : Handles the user Registration.  
Input: forename, surname ,email,username,password.  
Returns:success or failiure code with details.  

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
