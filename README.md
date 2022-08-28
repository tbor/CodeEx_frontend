# CodeEx Event Management App

## About the project

This frontend app is a submission for a coding challenge. The challenge is to create a cross-platform (Windows, Linux, Mac) Event Management web application, with a frontend employing either Angular or ReactJS, and TypeScript. The backend is .NET Core with C#, and it is located in the repo at https://github.com/tbor/CodeEx_backend.git.

The requirements beyond that are minimal, with the following user stories:

- As a Coordinator, I can create an event with authorized attendees.
- As a Coordinator, I want to see who attended the event.
- As an Attendee, I want to request access to an event and see a Coordinator’s response.

The app should be maintainable, scalable, extensible and adhere to industry standards. The UI and styling are unimportant.

I chose to work with ReactJS along with Typescript and .NET Core 6. Additionally, I chose to use Auth0 as the service for authentication and authorization. Using an external service for authentication is much more secure option than handling that within the app itself.

Per the requirements, users are currently in two groups, event coordinators, and event attendees (aka registrants). Coordinators can create events and authorize attendees. Users who wish to attend an event are able to register with a comment, and view their status and any reply from a coordinator. Coordinators are able to view any event they create, and its registrants/attendees; respond to an attendee registration comment with a reply; and modify or view the registrant status (which includes attendance for past events).

## Assumptions

Just as the UI and styling are unimportant at this stage, in the absence of further requirements definitions I do not think it is worthwhile to anticipate certain usability choices, such as filtering the events page by past/future events, or filtering the attendees of a past event to only show attendance. All events, past and future, are listed on the home page, and it is up to event coordinators as to when (or if) they record attendance status for past events. The requirement that the coordinator should be able to see who attended the event does not tell us who will register that attendance, or when. Subsequently, the registration list needs to be left open for editing, and all attendees will continue to be listed for each event with their most recent status settings displayed and editable.

## Using the App

- The main entry page of the app shows a list of all events, past and present. There is also search functionality, and a login to Auth0, which is only necessary if a visitor wants to register for an event or, in the case of event coordinators, create one and/or authorize attendees.

- When you click on an event, you are taken to the event detail page.
  - If you are the event coordinator, you will see a list of the users who have registered for the event, and also their status. You will be able to change status to approve or reject their requests, and you can respond to the request with a single reply. For events that have already occurred, you will be able to see who attended or was absent (and you will still be able to record or change that status as well). As yet, there are no restrictions on when you may change status for an attendee, or what values may be selected.
  - If you are not the event coordinator, then you will see a registration button and comment field for any event that you have not registered to, and you will see your status and replies from the coordinator for those you have.

### Auth0

- When logging on for the first time and creating an account, the Auth0 sign-up page has a field for coordinator. This field is for demonstration purposes only and would probably not be included in any final App, where a site administrator (presumably) would identify/authorize the coordinators. Enter "True" or "Yes" to make the account a coordinator. Coordinators are also allowed to be event attendees for events others have created, so a single coordinator account will allow you to observe most current functionality.

### Demo

[Azure Web Site Demo](https://codeex.azurewebsites.net)

## Technology

### Authentication/Authorization Service

- Auth0 OpenID Connect (OIDC) service

### Development environments

- Visual Studio 2022
- Visual Studio Code (version 1.70)
- SQL Server Management Studio 19

### Frontend

#### React

- react-dom (v18.2.0)
- react-hook-form (v7.33.1)
- react-redux (v8.0.2)
- react-router-dom (v6.3.0)
- react-scripts (v5.0.1)
- redux (v4.2.0)

#### TypeScript (v4.7.4)

#### Frontend Testing

- ESLint (v2.2.6)
- Jest: already included in CRA projects
- React Testing Library: included in CRA

### Backend

- ASP.NET Core Web App (Core 6, C#)
- Dapper (v2.0.123); _Nuget Package Manager_
- Microsoft.Data.SqlClient (v4.1.0); _Nuget Package Manager_
- DbUp Core (v4.6.3); _Nuget Package Manager_

#### Backend Testing

- xUnit Test Project (.NET Core)
- Moq (v4.18.2); _Nuget Package Manager_

### Web Hosting for demonstration

- Azure App Services
- Azure SQL Databases

## Installation

### Clone the repo

git clone https://github.com/tbor/CodeEx_frontend.git

### Frontend

#### Install NPM packages

npm install npm@latest -g

#### This project was bootstrapped with [Create React App (CRA)](https://github.com/facebook/create-react-app).

npx create-react-app frontend --template typescript  
_the npx tool is part of npm that temporarily installs the create-react-app npm package and uses it to create the project_

#### Installing React Router

npm install react-router-dom

##### React router has a peer dependency on the history package, so install this as well:

npm install history

#### Installing Redux, along with the TypeScript types (_The core Redux library contains TypeScript types within it._)

npm install redux

#### Install React-specific elements for Redux:

npm install react-redux

#### Install the TypeScript types for React Redux:

npm install @types/react-redux --save-dev

### Code Analysis Tool

- In VS Code Extensions area, type ESLint in search box, and install the extension.
- In ESLint settings, ensure **ESLint: Probe** setting includes **typescript** and **typescriptreact** on its list.

### Backend

In NuGet Package Manager, install the following:

- **Dapper** (package by Sam Saffron, Marc Gravell, and Nick Craver)
- **Microsoft.Data.SqlClient**
- DbUp
  - **dbup-core**
  - **dbup-sqlserver**

### Security

#### Frontend

npm install @auth0/auth0-spa-js

#### Backend

In NuGet, install **Microsoft.AspNetCore.Authentication.JwtBearer**

### Web hosting for demo

#### Frontend installations

npm install cross-env --save-dev\
In extensions area, install **Azure App Service**

##### Build

npm run build:production

##### Publish

Under **Azure Web Service**, right click on the frontend app service and "**Deploy to Web App**".

### Testing

- In NuGet Package Manager, install Moq

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
