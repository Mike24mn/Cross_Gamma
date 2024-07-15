<b>CrossGamma</b>

Overview:

CrossGamma is a full-stack web application designed for options trading analysis. Built with React, Redux, Express, and PostgreSQL, it allows users to manage and analyze trading data efficiently. This application aims to provide traders with insights and tools to make informed decisions.

Features:

User authentication and session management
Secure data storage with PostgreSQL
Responsive user interface built with React
State management with Redux
Real-time data updates
Analysis tools for options trading

1. **Dashboard**: Get a quick overview of your overall account status...
   
<img width="1463" alt="6DA7B8E9-CE72-4C46-A253-BE798F208E4F" src="https://github.com/user-attachments/assets/56499c84-3c58-4f9b-bd1e-0b6d68ab9159">

2. **Login Screen w/ OAuth button**: Create and register new users and authenticate via Schwab...
   
<img width="1454" alt="3BA2DD6E-2E9D-4212-8659-D58CADAB0B2F" src="https://github.com/user-attachments/assets/46b45f44-20a5-4b26-ba2a-49ef271915a8">

3. **Position Management**: View and manage all your trading positions in one place...

<img width="1451" alt="E4F95164-6BC6-45BF-9148-813A7F9009B5" src="https://github.com/user-attachments/assets/5f74a743-4305-4c50-b6ac-41ab7da3c7e5">

4. **Take notes on open positions and future positions you intend on entering (set reminders/alerts to enter)**: Create comprehensive notes on each positon you have open and notes about positions you wish to enter as well...

<img width="1454" alt="2EB6D4A2-6D98-4689-A882-79C9B56D8589" src="https://github.com/user-attachments/assets/f8bf27b3-14fb-4d12-b824-ebcc5b93fbb7">

Installation
Prerequisites:

Make sure you have the following software installed on your computer:

Node.js
PostgreSQL
Setup

Clone the repository:

'git clone https://github.com/yourusername/crossgamma.git'

cd into crossgamma

Install dependencies:

'npm install'

Create a PostgreSQL database (information for tables is provided in the database.sql file within the project directory)

Create a .env file at the project root with the following content:

'SERVER_SESSION_SECRET=<yourRandomSecret>'

Start the PostgreSQL server.

Start the application:

'npm run server'
'npm run client'
Open your browser and navigate to http://localhost:<address>

Usage:

Register a new user account.

Log in with your credentials.

Use the dashboard to view and analyze your trading data.

Utilize the various tools and features to enhance your trading strategies.
