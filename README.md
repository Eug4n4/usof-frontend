# Usof frontend

## Description

This repository is frontend part of the project called usof - Q&A service for professional and enthusiast programmers.
If you are interested in backend part of the project, please, check this repository - [usof-backend](https://github.com/Eug4n4/usof-backend)

## Tech stack

- **UI Library**: react
- **State management**: redux
- **HTTP Client**: axios
- **Rich text editor**: quill
- **JWT Decoder**: jwt-decode
- **Cookie parser**: js-cookie

## Folder structure

```
src/api/        - Axios instance and backend api calls.
src/assets/     - Layout css styles.
src/components/ - JSX Components which are used inside pages.
src/contexts/   - Contains authentication context.
src/features/   - Redux state and useful functions for working with constant values or user data like avatars.
src/pages/      - JSX Components which are responsible for rendering the whole page.
```

## Documentation

Refer to `DOCS.md` in order to find information about steps completed during the development process.

## How to run?

> **Important!** In order to run this project make sure you already have Node.js >= 22.0.0 installed on your computer

1. Clone this repository using this command `git clone https://github.com/Eug4n4/usof-frontend.git`.
2. Change your working directory with `cd usof-frontend/`.
3. Create .env file and copy paste constants from .env.example file.
4. Run `npm run dev` to run development server.

## Screenshots

<img width="1899" height="914" alt="profile" src="https://github.com/user-attachments/assets/c9b7cc8c-e39a-42f0-b44d-2fbedb323068" />

<img width="1895" height="914" alt="main" src="https://github.com/user-attachments/assets/6356ac53-d071-4c22-ac9d-fff5cc666787" />
