# Next.js Todo App

This is a simple Next.js todo app.

## Getting Started

To get started with this app, you'll need to set up a MongoDB database and configure it in your project.

### Prerequisites

- Node.js and npm installed on your machine.

### Setting up MongoDB

1. Create a MongoDB account if you don't have one.

2. Create a new cluster and database on MongoDB Atlas or set up MongoDB locally.

3. Copy the connection string for your MongoDB database. It should look like this: mongodb+srv://your-username:your-password@cluster.mongodb.net/your-database

### Configuration

1. Create a `.env.local` file in the root directory of your project.

2. Add your MongoDB connection string as follows: MONGO_URL=YOUR_MONGODB_STRING

3. Save the `.env.local` file.

### Running the App

1. Install dependencies:

```bash
npm install
```
