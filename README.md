# Awsome store 

## Overview
This is a monorepo containing both the frontend and backend components of the project. The frontend is built using React, and the backend is developed with Node.js and Express. The project a CI/CD pipeline for deployment.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **CI/CD:** GitHub Actions with deployment to an EC2 instance

## Folder Structure
```
monorepo/
│── frontend/
│── backend/
│── .github/
│── .env.example
│── package.json
|── package-lock.json
│── README.md
```

## Setup

### Prerequisites
Ensure you have the following installed:
- Node.js & npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Kevin-RB/OSS.git
   cd your-repo
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables for the backend:
   ```sh
   cp backend/.env.example backend/.env
   ```
   Modify `.env` as needed.

4. Start the development environment:
   ```sh
   npm run dev
   ```
   from root folder
   
## CI/CD Pipeline

### GitHub Actions Workflow
The project uses GitHub Actions to automate builds, tests, and deployments. The workflow is defined in `.github/workflows/ci.yml`.

#### Steps:
1. **Trigger:** On push to `main`, pull requests to `main`, or manual execution.
2. **Install Dependencies:** Installs required packages for both frontend and backend.
3. **Run Tests:** Executes unit tests for the backend.
4. **Deploy Backend:**
   - Loads production environment variables.
   - Reloads or starts the backend using PM2.
5. **Build Frontend:**
   - Installs dependencies.
   - Runs the build process.
6. **Deploy Application:**
   - Loads production environment variables.
   - Reloads or starts the frontend and backend using PM2.
   - Saves the PM2 process.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch and open a pull request.

## License
[MIT](LICENSE)
