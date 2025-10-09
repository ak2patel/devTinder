
# DevTinder

A lightweight "Tinder for Developers" prototype built with Node.js, Express and MongoDB.

## Overview

DevTinder is a small prototype backend that lets developers create profiles, discover other developers, send/accept connection requests, and chat in realtime. It demonstrates authentication (JWT in cookies), REST APIs, MongoDB models, input validation, email sending via AWS SES, and WebSocket chat.

## Quick links

- `src/app.js` — application entry
- `src/config/database.js` — MongoDB connector
- `src/middleware/auth.js` — authentication middleware
- `src/models` — data models (`user.js`, `chat.js`, `connectionRequest.js`)
- `src/routes` — REST routes (`auth.js`, `user.js`, `profile.js`, `request.js`, `chat.js`)
- `src/utils` — helpers (`socket.js`, `sendEmail.js`, `sesClient.js`, `validation.js`)

## Requirements

- Node.js 16+ (or compatible)
- npm
- MongoDB (connection string in `.env`)

## Install

Install dependencies:

```powershell
npm install
```

## Run

- Development (auto-reload if you have nodemon configured):

```powershell
npm run dev
```

- Production:

```powershell
npm run start
```

The application reads `PORT` from the environment. If not set, it will use the default configured in the code (commonly 3000).

## Environment variables

Create a `.env` file in the project root and set the following values:

- `DB` — MongoDB connection string (required)
- `PORT` — (optional) port for the server
- `SECRET` — JWT secret
- `AWS_ACCESS_KEY`, `AWS_SECRET_KEY` — (optional) credentials for AWS SES

## API (high-level)

See the route files under `src/routes` for implementation. High-level endpoints:

- POST /signup — register a new user
- POST /login — login and set JWT cookie
- POST /logout — clear JWT cookie
- GET /profile/view — view current user's profile (protected)
- PATCH /profile/edit — edit user profile
- PATCH /profile/password — change password
- POST /request/send/:status/:toUserId — send a connection request
- POST /request/review/:status/:requestId — accept/decline a request
- GET /user/requests/received — received requests
- GET /user/connections — list connections
- GET /feed — discoverable users
- GET /chat/:targetUserId — get or create a chat with a user

## WebSocket events

Real-time messaging and presence are implemented in `src/utils/socket.js`. Typical events include `joinChat`, `sendMessage`, and `messageReceived`.

## Project structure

```
src/
	app.js
	config/
		database.js
	middleware/
		auth.js
	models/
		user.js
		chat.js
		connectionRequest.js
	routes/
		auth.js
		user.js
		profile.js
		request.js
		chat.js
	utils/
		socket.js
		sendEmail.js
		sesClient.js
		validation.js
```

## Notes

- Authentication uses JWT stored in cookies (see `src/middleware/auth.js`).
- Email sending uses AWS SES (`src/utils/sesClient.js`, `src/utils/sendEmail.js`).
- Validation helpers are in `src/utils/validation.js`.

If you'd like, I can also:
- Add an example `.env` file
- Add cURL examples for the major endpoints
- Create a Postman collection

---

Last updated: 2025-10-10
