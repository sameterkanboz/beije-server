# beije-server System

<p align="center">
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS" height="50">
    &nbsp;&nbsp;&nbsp;
  <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" height="50">
    &nbsp;&nbsp;&nbsp;
  <img src="https://help.apiary.io/images/swagger-logo.png" alt="Swagger" height="50">
</p>

This project is a simple email verification system built with Nest.js.

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)

## Introduction

beije-server is a Nest.js based email verification system. It is designed to verify email addresses through a simple and efficient process.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sameterkanboz/beije-server.git
   cd beije-server
   ```

2. Install the dependencies

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a .env file in the root directory of the project and add the following:

   **Required values ​​were shared by e-mail.**

   ```env
   MAIL_ADDRESS="mail"
   MAIL_PASSWORD="password"
   ```

4. After all these installations, the database should be run with docker.

   ```bash
   docker-compose up -d
   ```

5. Once the database is running, the mail system can now be run.
   ```bash
   npm run start:dev
   ```

## Running the Application

You can easily test the application using Swagger. Once the application is running, you can access the Swagger UI at http://localhost:3000/api. This interface provides a convenient way to interact with the API, explore available endpoints, and execute requests directly from your browser.

## Endpoints

- **GET /**
  - **Description:** Base endpoint to check if the server is running.
- **POST /user/register**
  - **Description:** Create a new user.
- **GET /user**
  - **Description:** Get all users.
- **GET /user/email**
  - **Description:** Get user by email.
- **GET /user/verify-email/{username}/{verificationToken}**
  - **Description:** Verify user email.
- **GET /user/check-verification/{username}**
  - **Description:** Check user verification status.
