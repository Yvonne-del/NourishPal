const express = require('express')
const oracledb = require('oracledb');
const app = express();
const PORT = 3000;
const dbConfig = {
    user: 'your_username',
    password: 'your_password',
    connectString: 'localhost:1521/xe',
  };
  oracledb.getConnection(dbConfig, (err, connection) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Connected to Oracle Database');
  
    // Perform database operations here
  
    // Close the connection when done
    connection.close((err) => {
      if (err) {
        console.error(err);
      }
      console.log('Connection closed');
    });
  });
  connection.execute(
    `CREATE TABLE users (
        id NUMBER GENERATED ALWAYS AS IDENTITY,
        email VARCHAR2(255) NOT NULL,
        password VARCHAR2(255) NOT NULL,
        confirm_password VARCHAR2(255) NOT NULL,
        name VARCHAR2(255) NOT NULL,
        username VARCHAR2(255) NOT NULL,
        gender VARCHAR2(10) NOT NULL,
        diet_preference VARCHAR2(50) NOT NULL,
        CONSTRAINT users_pk PRIMARY KEY (id),
        CONSTRAINT users_unique_username UNIQUE (username),
        CONSTRAINT users_password_check CHECK (password = confirm_password)
      )`,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Table created');
      }
    }
  );
  connection.execute(
    `INSERT INTO users (email, password, confirm_password, name, username, gender, diet_preference) 
     VALUES ('john@example.com', 'password123', 'password123', 'John Doe', 'johndoe', 'Male', 'Vegetarian')`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${result.rowsAffected} row(s) inserted`);
      }
    }
  );
  connection.execute(
    `SELECT * FROM users`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result.rows);
      }
    }
  );
  connection.execute(
    `UPDATE users SET name = 'Jane Smith' WHERE id = 1`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${result.rowsAffected} row(s) updated`);
      }
    }
  );
  connection.execute(
    `DELETE FROM users WHERE id = 1`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${result.rowsAffected} row(s) deleted`);
      }
    }
  );
   