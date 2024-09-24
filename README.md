# Web_Assignment2
# Movie Rating Website with User Review System

This is a movie rating web application built using **React**. Users can sign up, log in, browse a list of movies, and submit or read reviews for individual movies. User data and reviews are stored in `localStorage` to simulate basic functionality without the need for a backend.

## Features

- **User Authentication**: 
  - Sign up with email and password.
  - Log in using saved credentials.
  - Store user sessions using `localStorage`.
  
- **Movie List**: 
  - Displays a list of movies.
  - Allows users to select a movie to view its details and reviews.

- **User Review System**:
  - Users can view reviews for each movie.
  - Users can add their own reviews, which will be saved locally.

## Pages

- **Main Page**: Introduction to the app, with navigation to sign up, log in, and the movie list.
- **Signup Page**: Form for user registration, storing credentials in `localStorage`.
- **Login Page**: Validates user credentials for login.
- **Movie List Page**: Displays a list of movies that users can browse and select.
- **User Review Page**: For each movie, users can see reviews and add their own.

## Project Structure

```plaintext
src/
├── components/
│   ├── Header.js         # (Optional) Navigation header component
│   ├── MovieList.js      # Component to display a list of movies
│   ├── ReviewPage.js     # Component for viewing and adding movie reviews
├── pages/
│   ├── MainPage.js       # Main page with app overview and navigation links
│   ├── SignupPage.js     # Signup form for new users
│   ├── LoginPage.js      # Login form for existing users
├── App.js                # Main app component with routing logic
├── index.js              # React entry point



---

### Instructions

1. Copy and paste the above content into a file named `README.md`.
2. Commit the file to the root of your GitHub repository.

This markdown file provides a clean and structured overview of your project and can be easily modified to include more details as your project evolves.
