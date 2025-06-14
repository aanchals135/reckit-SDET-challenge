# Reckit SDET Challenge — API Automation Framework

Welcome to the **Reckit SDET Challenge** repository.  
This is a **modular, production-ready API test automation framework** built with **Node.js**, **Jest**, and **Supertest**.  
It tests the **Product Inventory API** for correctness, reliability, edge cases, pagination, and rate limiting.

---

## **Objective**

- Automate thorough REST API test coverage.
- Validate CRUD operations, pagination, and server-side rate limits.
- Ensure negative cases are handled properly.
- Document bugs clearly.
- Integrate seamlessly with CI/CD pipelines.

---

## ⚙️ **Tools & Libraries**

| Tool | Purpose |
|------|---------|
| **Node.js** | JavaScript runtime |
| **Jest** | Test runner & assertion library |
| **Supertest** | HTTP request library for end-to-end API testing |
| **dotenv** | Loads environment variables from `.env` |
| **GitHub Actions** | Example CI/CD workflow |

---

## 📂 **Project Structure**

```plaintext
reckit_sdet_challenge/
├── __tests__/
│   ├── health.spec.js        # API health checks
│   ├── products.spec.js      # CRUD, get by ID, pagination
│   ├── negative.spec.js      # Negative & edge cases
│   ├── load.spec.js          # Rate limiting stress test
├── api/
│   ├── apiClient.js          # Supertest agent
│   ├── productApi.js         # Product API helper functions
├── config/
│   └── env.js                # Loads .env config
├── .env                      # default environment variables
├── .env.dev                  # dev environment variables
├── .env.prod                 # prod environment variables
├── .env.test                 # test environment variables
├── package.json              # Project config & scripts
├── BUGS.md                   # Documented API issues
├── README.md                 # Project documentation
├── .github/workflows/ci.yml  # Example GitHub Actions workflow
```

---

## **Detailed Test Cases**

Below is a complete list of test cases **file-by-file**, as implemented:

---

### 📂 `__tests__/health.spec.js`

| # | Test | Description |
|---|------|--------------|
| 1 | `should return API health status` | Verifies `/health` endpoint returns `200 OK`. Confirms API is up and running. |

---

### 📂 `__tests__/products.spec.js`

| # | Test | Description |
|---|------|--------------|
| 1 | `should create a new product` | `POST /api/products` with valid data, expects `200` or `201`. |
| 2 | `should list products` | `GET /api/products` returns `200` and product list. |
| 3 | `should get product by ID` | `GET /api/products/:id` returns correct product by saved ID. |
| 4 | `should update product` | `PUT /api/products/:id` updates product name, expects `200`. |
| 5 | `should get product by ID (after update)` | Confirms update by calling `GET` again, expects `200`. |
| 6 | `should delete product` | `DELETE /api/products/:id` deletes product, expects `204`. |
| 7 | `should get product by ID (after delete)` | `GET` on deleted ID should return `404`. |
| 8 | `should return paginated products list` | `GET /api/products?page=1&limit=5` and page 2; asserts pagination and page difference. |

---

### 📂 `__tests__/negative.spec.js`

| # | Test | Description |
|---|------|--------------|
| 1 | `should fail without auth` | `GET /api/products` with no `Authorization` returns `401`. |
| 2 | `should return 404 for invalid product` | `GET /api/products/invalid-id` returns message: `"Invalid ID format"`. |
| 3 | `should handle invalid name` | `POST /api/products` with empty `name` returns `4xx`. |
| 4 | `should handle invalid price` | `POST /api/products` with negative `price` returns `4xx`. |
| 5 | `should handle invalid stock` | `POST /api/products` with negative `stock` returns `4xx`. |

---

### 📂 `__tests__/load.spec.js`

| # | Test | Description |
|---|------|--------------|
| 1 | `should enforce rate limiting when N requests are made rapidly` | Fires `RATE_LIMIT_REQUESTS` rapid `GET` requests to `/api/products`. Expects at least one `RATE_LIMIT_EXPECTED_CODE` (e.g., `429`). Logs status codes for debugging. |

---

## ⚙️ **Environment Setup**

1️⃣ **Install dependencies:**
```bash
npm install
