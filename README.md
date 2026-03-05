# AI Movie Insight Builder 🎬

AI Movie Insight Builder is a web application that allows users to enter an **IMDb movie ID** and retrieve movie details along with **AI-generated audience sentiment insights**.

The application fetches movie data from **TMDB (The Movie Database)** and uses **Generative AI (Google Gemini)** to analyze audience reviews and generate a concise sentiment summary.

This project was built as part of a **Full-Stack Developer Internship assignment**.

---

# 🚀 Hosted URL

**Base URL:**

   https://mb-movieai.netlify.app

# Features

* Search movies using **IMDb ID**
* Display detailed movie information:

  * Movie title
  * Poster
  * Release year
  * Rating
  * Cast list
  * Plot summary
* Fetch audience reviews
* Generate **AI-powered sentiment summary**
* Classify overall audience sentiment:

  * Positive
  * Mixed
  * Negative
* Responsive modern UI
* Smooth scroll navigation
* Loading skeleton for better UX

---

# Demo Flow

1. User enters an **IMDb ID** (example: `tt0133093`)
2. Application fetches movie data from **TMDB**
3. Reviews and movie context are sent to **Gemini AI**
4. AI generates:

   * Audience sentiment summary
   * Sentiment classification
5. Results are displayed in a movie insight card

---

# Tech Stack Rationale

### Next.js

Next.js was used as the primary framework because it supports both **frontend rendering and backend API routes**, enabling a full-stack application within a single project.

### React

React enables reusable UI components and efficient state management for dynamic movie results and sentiment insights.

### Tailwind CSS

Tailwind CSS provides a fast and scalable way to build responsive and modern UI designs with minimal custom styling.

### TMDB API

TMDB provides comprehensive movie data including posters, ratings, genres, cast information, and reviews.

### Google Gemini

Gemini is used to generate **AI-powered summaries of audience sentiment** by analyzing movie reviews and metadata.

---

# Architecture Overview

```
User Input (IMDb ID)
        │
        ▼
Next.js API Route
        │
        ▼
TMDB API
(Movie details + reviews)
        │
        ▼
AI Processing (Gemini)
        │
        ▼
AI Summary + Sentiment Classification
        │
        ▼
Frontend Display
```

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/MBrahul/Brew-Assignment.git
cd Brew-Assignment
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Add Environment Variables

Create a `.env.local` file in the project root:

```
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key
TMDB_AUTHORIZATION=your_tmdb_authorization
```

### Get API Keys

TMDB API
https://www.themoviedb.org/settings/api

Google Gemini API
https://aistudio.google.com/app/apikey

---

## 4. Run the Development Server

```bash
npm run dev
```

Open the application:

```
http://localhost:3000
```

---

# Testing

Basic unit tests are included to ensure core functionality works as expected.

Run tests using:

```bash
npm run test
```

### Test Coverage

The project includes tests for:

* **Component rendering**

  * Ensures `MovieCard` renders movie information correctly.


* **IMDb ID validation**

  * Ensures only valid IMDb IDs are accepted.


Project test structure:


---

# Assumptions

* TMDB is used as the primary source for movie data.
* Some movies may not have available audience reviews in TMDB.
  In such cases, the **movie overview is used as fallback context for AI analysis**.
* Only a limited number of reviews are sent to the AI model to reduce latency and token usage.
* Sentiment classification is simplified into three categories:

  * Positive
  * Mixed
  * Negative
* The application assumes valid IMDb ID format (`tt1234567`).

---

# Future Improvements

Possible enhancements for future iterations:

* Add caching for movie results
* Add detailed sentiment breakdown (pros / cons)
* Add review pagination
* Improve accessibility and keyboard navigation
* Add end-to-end tests
* Optimize API response handling

