# AutoTrace: Example Microservices Backend for Vehicle Marketplace Platform

This is an **example project showcasing a microservices-based backend architecture** for a **vehicle marketplace platform**, focused on managing vehicle listings, validating submitted data, managing documents & discrepancies, supporting escrow transactions, and preparing the dataset for future AI/analytics.

Currently, `scrape-service` for scraping listing data from external sources and `user-service` for managing users have implemented to showcase in project proposal. Other services are planned for future implementation.

---

## 📂 Project Structure

This repository is organized as a **monorepo**, following microservices best practices. Each service is an independent Node.js project, deployable as a containerized microservice.

```
autotrace/
├── microservices/
│   ├── scraper-service/           # Scraper microservice (implemented)
│   ├── discrepancy-service/       # Document validation & discrepancy detection
│   ├── payment-service/           # Webhook handling for escrow payments
│   ├── notification-service/      # Scheduled nudges and notifications
│   ├── document-service/          # Document upload & storage
│   ├── user-service/              # User and session management
│   ├── shared/                    # Shared libraries, utils, and models


```

---

## 🛠️ Microservices

| Service Name             | Description                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **scraper-service**      | REST API for `/api/scrape-listing`, scrapes external vehicle listing data using Node.js + Cheerio. **(Implemented)**     |
| **discrepancy-service**   | Rules-based validation of uploaded documents, discrepancy detection (e.g., VIN, mileage, price), and confidence scoring. |
| **payment-service**      | Handles Stripe or MangoPay webhook events for escrow payment flows.                                                      |
| **notification-service** | Sends scheduled nudges and inactivity-based prompts to users.                                                            |
| **document-service**     | Manages document upload, storage (Firebase Storage or S3), and retrieval securely.                                       |
| **user-service**         | Manages users, sessions, authentication, and audit-safe event tracking.                                                  |

---

## 📦 Shared Directory

The `/shared` directory contains **reusable libraries and utilities** shared across services.
For example:

* Firestore schema definitions & security rules helpers
* Logger configuration
* Environment & configuration management
* Common constants, types, and error handling utilities

These are designed to ensure **consistency**, reduce duplication, and speed up development across services.

---

## 🚧 Current Status

`scraper-service` and `user-service` implemented and operational.
⏳ Other services are currently placeholders — ready to be implemented using the same pattern.

---

## 📝 Getting Started

### Prerequisites

* Node.js ≥ 18
* npm ≥ 7
* Firebase project with firestore db

### Run the User Service locally

```bash
cd microservices/user-service
npm install
npm run dev
```

### Run the Scraper Service locally

```bash
cd microservices/scraper-service
npm install
npm run dev
```

The scraper API will be available at:

```
http://localhost:3000/api/scrape-listing
```

---


