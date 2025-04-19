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
Return: Confirmation that it has been left  (status code 200 ) or and error (status code 500)  

## Goal Endpoints (user must be logged in)

### /goals?datebefore=
Type:Get
Description:Gets the users goals before a certain date.on first call it will be the 50 newest goals, on subsequent i will be after a certain date.  
Input:Takes only the user session id cookie.   
Return:The 50 newest Goal objects on first call , subsequent calls will be before the datebefore query.  
### /goals
Type:Post  
Description:Creates a new goal.  
Input:goalData  
Return:The new goal (status 201).  
### /goals/:goalId
Type:Delete  
Description:Deletes a users goal associated with the goalId   
Input:The goalId to be deleted.    
Return:A status (201) if successfully deleted or a error code if not.   
### /goals/:goalId
Type:Update  
Description:Updates the users goal associated with the goalId  
Input:Any data to be changed   
Return:Success (status 200) or error if else.   

# Models

## User 
id:UUID (PRIMARY KEY)  
forename:string  
surname:string  
email:string (unique)  
username:string (unique)  
password : string (hashed)  
salt:string   
date_created: date   
last_online:date  

## Group 
id:UUID (PRIMARY KEY)   
name:string  
creator_id:uuid (FOREIGN KEY REFERENCES User.id)  
date_created:date   

## Group_Participants

## Group_Messages
id:UUID (PRIMARY KEY)
group_id : UUID (FOREIGN KEY REFERENCES Group.id)  
user_id:uuid (FOREIGN KEY REFERENCES User.id)  
content:string
goal_id:uuid (FOREIGN KEY REFERENCES Goal.id)  
date_sent:date

# Metric 
id:UUID (PRIMARY KEY)  
user_id:uuid (FOREIGN KEY REFERENCES User.id)  
metric_type:string
metric_value:float
time_of_day:enum values:['BREAKFAST','SECOND_BREAKFAST','BRUNCH','LUNCH','TEA','DINNER','SNACK']  
date_created:date   


# Goal
id:UUID (PRIMARY KEY)   
user_id:uuid (FOREIGN KEY REFERENCES User.id)  
start_date:date  
end_date:date  
goal_name:string  
goal_value:float  
achieved:boolean  
date_created:date  

