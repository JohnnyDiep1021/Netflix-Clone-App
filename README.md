<div align="center">
  <h1> <img src="https://github.com/JohnnyDiep1021/Netflix-Clone-App/blob/main/Frontend/img/netflix-logo48.png?raw=true" alt="Netflix logo"/> Netflix Clone App</h1>
  <strong>A nearly perfect clone version of the most popular movie platform in web browser</strong><br>
</div>
<br>

## Why build this project?
Inspired by the official movie web app - Netflix, [Netflix Clone App](https://netflix-lover-jd.web.app/) was built with a stunning UI and all the fundamental functionalities of a movie app. It was incorporated all the underlying traits of a responsive full-stack MERN application and only used as a personal project. This app is completely responsive and compatible with all digital devices from mobiles to computers. Compared to Netflix, *Netflix Clone App* is **FREE**, but can still guarantee the users will have the joyful experiences (UX) to explore all movie features of the true Netflix app.

## Features
This app is constructed with all basic Netflix's features:
1. Register for a new Netflix account or sign in for an existing one by using email/ username and password (with detailed input prompts).
2. Search engine.
3. Self-customize user account information:
   + Upload profile image
   + Update personal data (name, bio, username)
4. Switch between a different movie genre.
5. Add movies to "My List".
6. Register for a premium membership step-by-step through the simulated payment process.
7. Play movies.
8. Auto account login/ logout (expired in 1 day).

## How to use?
To new users, there are 2/two ways to get started before using the **Netflix Clone App**:
  1. Use **default account** with username **"userTest"** - password **"Test@123"**
  2. Register **new accounnt** with user-defined **email/username** and **password**

After signing up successfully, explore all the app features and enjoy watching movies.
  
## Technologies :computer:
1) ### Frontend:
- **Netflix Clone App** is a single-page application (SPA), constructed from ReactJS. Using:
  + **Custom hooks** manages form data input, sending requests, authentication, and movie interactivities.
  + **react-router-dom** is used to simulate multi-page applications.
  + **react-transition-group** for modal, popup animations.
  + **reduxjs/toolkit**, **react-redux** creates stores to manage data across the application.
  + **react-stripe-checkout** for payment process.
  + **sass** is used for styles and decorations.
  + **mui/material** for icons and tooltips.
  + **firebase** for file upload.
- **The user interface** is inspired and replicated from the official Netflix site:
  + Each movie showcase can be hovered and then poped up. The pop-up window will display movie trailer and a vast interactive button (play, add to "My List", like, dislike, and expand for more detailed movie description).
  + The movies list's design is built with many scrollable carrousels. 
  + The movie items in the watch list are designed based on the video items framework saved in the playlist on Youtube.

2) ### Backend:
- Featured by RESTful APIs and implemented by MongoDB, ExpressJs, and NodeJs. Using:
  + **mongodb**, **mongoose** for user data storage.
  + **cors** for setting up cross-site resource sharing permissions.
  + **express** for building web framework, **express-validator** for handling and validating input data sent from client-side.
  + **body-parser** for parsing request data.
  + **helmet** for setting up header security.
  + **jsonwebtoken**, **bcrypt** for creating authToken and hashing user's password.
  + **validator** for validating input data into mongoose schema.
  + **stripe** for handling payment payment.

## What needs to be improved?
- Although **Netflix Clone App** is usable, accessible and useful, there are still some features that can be improved and enhanced:
  +  Speed up application loading process.
  +  The movie carrousels can be optimized to be scrolled smoother and infinitely instead of leaving a blank space after scrolling to the end.
  +  A more secure way to store user data (token, userId,...) used for auto-login/ logout instead of storing it in easily-mutable local storage.
  +  More configurations and settings for the quality of movies.
  +  Additional feature for cross-site sharing account.
  +  Authentic payment.
## Closing notes :writing_hand:
For more realistic experience and vivid imagination, please spend time exploring and playing around with the [Netflix Clone App](https://netflix-lover-jd.web.app/). Enjoy :blush:! 

*I welcome all user's feedbacks and reviews. Your contributions can help me to grow better. Thank you :handshake:!*
