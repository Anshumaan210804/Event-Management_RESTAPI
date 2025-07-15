# Event Management REST API

A backend RESTful API for managing events and user registrations using **Node.js**, **Express**, and **MongoDB**.

##Folder Structure

├── controllers/
├── models/
├── routes/
├── .env
├── app.js
└── README.md


--------------------------------------------------------------------------------------------
## Features

- Create and manage events
- User registration and cancellation
- Enforce business rules:
  - No duplicate registrations
  - No past event registration
  - Capacity limits (max 1000)
- View event stats
- Sort upcoming events by date + location

---
--------------------------------------------------------------------------------------------
## Setup Instructions

Clone the repo**  
```bash
git clone https://github.com/your-username/event-management-api.git
cd event-management-api
Install dependencies

bash
Copy code
npm install
Create a .env file

ini
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
Start the server

bash
--------------------------------------------------------------------------------------------
npx nodemon app.js
API Endpoints
##Create Event
POST /api/events
json
{
  "title": "Hackathon",
  "dateTime": "2025-08-01T15:00:00Z",
  "location": "Bangalore",
  "capacity": 100
}
--------------------------------------------------------------------------------------------
##Get Event Details
GET /api/events/:id

Returns event + registered users.
--------------------------------------------------------------------------------------------
##Register for Event
POST /api/events/:id/register

json

{
  "userId": "64a2cf6fe13d44b4fae8b937"
}
--------------------------------------------------------------------------------------------
## Cancel Registration
DELETE /api/events/:id/cancel

json

{
  "userId": "64a2cf6fe13d44b4fae8b937"
}

--------------------------------------------------------------------------------------------
##Tech Stack
Node.js

Express.js

MongoDB + Mongoose

dotenv + nodemon

--------------------------------------------------------------------------------------------
📌Author
Anshumaan Tiwari
GitHub - https://github.com/Anshumaan210804
LinkedIn - https://www.linkedin.com/in/anshumaan-tiwari-16b9a4284/

--------------------------------------------------------------------------------------------

## 5. GitHub Submission

1. Initialize Git (if not already):

```bash
git init
git remote add origin https://github.com/your-username/event-management-api.git
git add .
git commit -m "Initial commit with event API"
git push -u origin main
