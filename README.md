# React Native Image Search App

This React Native application allows users to search for images using the Shutterstock API. The images are displayed in a grid view with infinite scrolling and pagination. Users can search for specific images using the search functionality. The app is built using React Native 0.72 and Expo.

## Features

- **Search Images**: Users can search for images using a keyword.
- **Infinite Scrolling**: The app fetches and displays more images as the user scrolls down.
- **Pagination**: Handles pagination efficiently to load images page by page.
- **Pull-to-Refresh**: Users can refresh the image list by pulling down.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/code-ayush/shutterstock.git
   cd shutterstock
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up API token**:
   - Replace `API_KEY` with your Shutterstock API token in the `constants/index.js` file.

   ```
   const API_KEY=YOUR_API_TOKEN
   ```

4. **Run the app**:
   ```bash
   npx run start
   ```

## Usage

1. **Search for images**: Enter a keyword in the search bar and press the search button or the return key.
2. **Infinite scrolling**: Scroll down to load more images.
3. **Pull-to-refresh**: Pull down the image grid to refresh the images.

## Project Structure

```
.
├── .env
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
├── README.md
├── api
│   └── index.js
├── app
│   └── index.jsx
├── components
│   ├── ImageGrid.jsx
│   └── ImageItem.jsx
├── constants
│   ├── index.js
├── hooks
│   └── useDebounce.js
```
