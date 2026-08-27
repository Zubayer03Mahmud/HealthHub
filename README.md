# HealthHub — Hospital Search Module (Standalone Extraction)

This is a self-contained extraction of the **Hospital Search** feature (SRS Feature 3) from the original **HealthHub** Software Engineering project. It follows the same Node.js + Express + MVC architecture as the parent project and runs independently of every other HealthHub module.

## Run it

```bash
npm install
npm start        # http://localhost:3000
```

## Test it

```bash
npm test
```

## What this module does

- Full-text search of hospitals by name, city, or district
- Hospital detail lookup by ID

## Architecture

```
Hospital-Search/
├── src/
│   ├── server.js                     Express app bootstrap (session, static assets, /api mount)
│   ├── routes/api-routes.js          GET /api/hospitals, /api/hospitals/:id
│   ├── controllers/hospital-controller.js   Request handling for hospital search
│   ├── models/hospital-model.js      Search/filter/lookup logic over the hospitals dataset
│   └── data/mock-database.js         In-memory hospitals dataset (5 seeded hospitals)
├── public/
│   ├── index.html                    SPA shell: Home and Hospital Search views
│   ├── css/style.css                 Shared HealthHub stylesheet
│   └── views/
│       ├── api-client.js             Fetch wrapper + view router
│       └── hospitals.js              Renders hospital cards
├── database/schema.sql               `hospitals` table DDL + seed data (optional — app uses the in-memory store above)
└── tests/hospital-search.test.js     Vitest unit tests for HospitalModel
```

## Note on scope

This module was extracted from a larger project. It does not include Auth, Doctor Search, Appointment Booking, Blood Bank, Vaccines, Ambulance Search, Recommendations, Payments, or Health Records — see the extraction notes provided alongside this package for the full dependency analysis.
