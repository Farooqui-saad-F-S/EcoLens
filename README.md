# EcoLens

EcoLens is a college CEP project that makes air and water quality easier to understand through real air-quality data, visualizations, and interactive learning.

## Technology

Frontend:

- React and Vite
- Tailwind CSS v4
- React Router
- Recharts
- Lucide React
- Open-Meteo geocoding and air-quality APIs

Backend:

- Node.js and Express
- MongoDB and Mongoose
- Anonymous quiz-result and awareness-feedback storage

EcoLens does not collect a quiz participant's name, email, phone number, address, or account information.

## Frontend setup

From the EcoLens root:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env` and keep the default local API URL, or replace it with your deployed backend URL:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite normally opens the app at `http://localhost:5173`.

## Backend setup

From the EcoLens root, open another terminal:

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, then add your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Start the backend in development mode:

```bash
npm run dev
```

Use `npm start` inside `backend` for a normal server start.

For local full-stack development, keep both terminals running: the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.

## API

- `POST /api/quiz-results` saves a validated anonymous quiz result and feedback answer.
- `GET /api/quiz-results/stats` returns aggregate counts and averages only.

The server calculates quiz percentages instead of trusting a percentage sent by the browser. The quiz still shows its score normally when the backend or MongoDB is unavailable.

## Checks

Frontend production build:

```bash
cd frontend
npm run build
```

Backend route and validation tests:

```bash
cd backend
npm test
```
