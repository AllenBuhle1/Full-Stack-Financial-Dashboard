# Full-Stack Financial Dashboard

## Project Overview

**Full-Stack Financial Dashboard** is a full-stack web application that allows users to upload Excel files containing monthly financial data, store the data in a MySQL database, and visualize it on a dashboard using tables and charts.  

The system efficiently parses Excel files, stores financial records, and presents data in an interactive, user-friendly way.

---

## Features

- Upload `.xlsx` Excel files containing monthly financial data.
- Backend processing with data validation and storage in MySQL.
- Display financial records in a table format.
- Visualize data using bar charts with Chart.js.
- RESTful API endpoints for data upload and retrieval.

---

## Application Workflow

1. **Upload**  
   Users select and upload an Excel file containing financial data for a specific user and year.

2. **Process & Store**  
   Backend parses the file and stores each record in the MySQL database.

3. **Retrieve & Visualize**  
   Frontend fetches stored data via the API and displays it in a table and a bar chart.

---

## Database (MySQL)

### Suggested Schema

**users**
| Column | Type | Description |
|--------|------|-------------|
| user_id | INT | Primary Key |
| name    | VARCHAR | User's name |

**financial_records**
| Column | Type | Description |
|--------|------|-------------|
| record_id | INT | Primary Key |
| user_id   | INT | Foreign Key referencing `users` |
| year      | INT | Year of the record |
| month     | VARCHAR | Month of the record |
| amount    | DECIMAL | Financial amount |

> Sample Data:  
> `user_id: 1, name: 'Jane Doe'`

> The database is populated through Excel file uploads.

---

## Backend

Built with **Node.js (Express)**.  

### Endpoints

#### 1. File Upload
```
POST /api/finances/upload/:userId/:year
```
- Accepts `.xlsx` file via `multipart/form-data`.
- Parses Excel file with columns: `Month`, `Amount`.
- Stores each row in `financial_records` linked to `userId` and `year`.
- Returns a success message.

#### 2. Data Retrieval
```
GET /api/finances/:userId/:year
```
- Returns all financial records for the specified user and year in JSON format.

---

## Frontend

Built using **React-JS and CSS**.

### Features
- **File Upload Form:** Select and upload Excel files to the backend.
- **Data Display:** Automatically fetch and display data after upload.
  - User's name and year
  - Table of records
  - Bar chart visualization (Chart.js)

---

## Validation & Error Handling

- File type validation (`.xlsx` only)
- Structure validation (must contain `Month` and `Amount` columns)
- Meaningful error messages displayed to the user

---

## Performance & Scaling

- Handle large Excel files efficiently

---

## Handling Data Updates

- Skips duplicates

---

## Technologies Used

- **Backend:** Node.js, Express, MySQL  
- **Frontend:** React-JS, CSS, Chart.js  
- **Database:** MySQL  
- **Other:** Excel parsing libraries (`xlsx`), RESTful API  

---

## Cloning And Running App

1. Clone the repository:
```bash
git clone https://github.com/AllenBuhle1/FullStack-Financial-Dashboard.git
```

2. Use db.sql to create your database in MySQL

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Edit Data base information for MySQL connection in server.js

5. Start the backend server:
```bash
node server.js
```

6.  Install frontend dependencies:
```bash
cd frontend
npm install
```

7. Start the frontend server:
```bash
npm start
```

---

## Usage

1. Upload an Excel file with columns `Month` and `Amount`.
2. Data will automatically be stored and displayed on the dashboard.
3. Use the table and bar chart to analyze financial data.

---

## Demonstration

Demo video on how to clone and run this app
[Youtube: Demo Video](https://youtube.com)
