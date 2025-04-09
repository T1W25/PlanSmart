# 🧩 Frontend Components Documentation

This file documents the reusable components in the Plansmart frontend. Each component serves a focused purpose and is styled using Tailwind CSS. This structure promotes reusability, responsive design, and consistent UI/UX across the application.

---

# 📌 Navbar Component

### 🗂 File Path  
`src/components/Navbar.jsx`

---

### 🧭 Purpose

The `Navbar` component serves as the top navigation bar for the entire application. It remains fixed at the top of the page and provides users with easy access to the main sections of the platform, including navigation to the **Dashboard**, a scroll link to **Bookings**, and a **Contact Us** section. It also features a prominent **Sign Out** button.

---

### 🛠️ Functional Overview

- **Logo Section (Left):** Displays the brand name "Plansmart", which links to the homepage.
- **Navigation Links (Center):** Three horizontal links:
  - **Dashboard** — Navigates to the root route using React Router.
  - **Bookings** — Scrolls to the `#bookings` section of the page.
  - **Contact Us** — Scrolls to the `#contact` section of the page.
- **Action Button (Right):** A black "Sign Out" button with subtle animations and hover effects.

---

## 🔍 Code Walkthrough: Navbar Component

This section explains the implementation details of the `Navbar` component line-by-line and highlights the purpose behind each structure, tag, and styling class used.

---

### 🧩 Import Statement

```jsx  
import { Link } from "react-router-dom"
```
- Imports the `Link` component from `react-router-dom`, allowing us to create navigation links that **don't reload the page**.  
- `Link` is used instead of `<a>` for internal routes to maintain SPA behavior.

---

### 🏗️ Component Definition

```jsx  
const Navbar = () => {
```
Defines a functional React component named `Navbar`.

---

### 🧱 Main Navigation Container

```jsx  
<nav className="fixed top-0 w-full bg-white border-b border-gray-300 p-4 flex justify-between items-center shadow-sm z-[50]">
```
- **`fixed top-0`**: Fixes the navbar at the top of the screen.
- **`w-full`**: Makes the navbar full-width.
- **`bg-white`**: Sets a white background.
- **`border-b border-gray-300`**: Adds a thin bottom border for separation.
- **`p-4`**: Applies padding on all sides.
- **`flex justify-between items-center`**: Flexbox layout that evenly distributes content and vertically centers them.
- **`shadow-sm`**: Adds a slight shadow for visual elevation.
- **`z-[50]`**: Ensures it's layered above other elements.

---

### 🏷️ Logo Section
```
jsx  
<Link to='/'>  
  <h1 className="text-3xl font-bold">Plansmart</h1>  
</Link>
```
- `Link to='/'` navigates to the homepage without refreshing the page.
- `h1` is styled as:
  - **`text-3xl`**: Large text size.
  - **`font-bold`**: Makes it bold for brand emphasis.

---

### 🔗 Navigation Links

```jsx  
<div className="flex space-x-10 font-bold ml-auto">
```
- **`flex`**: Places links in a row.
- **`space-x-10`**: Adds horizontal spacing between links.
- **`font-bold`**: Bold text for emphasis.
- **`ml-auto`**: Pushes this group to the right, aligning it after the logo.

Each link:

```jsx  
<Link to="/" className="text-black-600 text-sm hover:text-black transition-transform duration-300 transform hover:scale-105">
```
- **`text-black-600 text-sm`**: Medium-dark text color and small size.
- **`hover:text-black`**: On hover, text becomes darker.
- **`transition-transform duration-300`**: Smooth animation when transforming.
- **`transform hover:scale-105`**: Slight zoom-in effect on hover for interactivity.

> The two `<a>` tags that follow use `href="#..."` to link to internal page sections (`#bookings`, `#contact`) — ideal for one-page scrollable views.

---

### 🚪 Sign Out Button

```jsx  
<button className="bg-black text-white text-sm px-4 py-2 rounded-md font-bold ml-10 transition-all duration-300 transform hover:scale-105 hover:bg-gray-800 cursor-pointer">
```
- **`bg-black text-white`**: Black button with white text.
- **`text-sm px-4 py-2`**: Small text with padding.
- **`rounded-md`**: Medium border radius for rounded corners.
- **`font-bold`**: Makes the label stand out.
- **`ml-10`**: Adds space between the links and button.
- **`transition-all duration-300 transform hover:scale-105`**: Smooth scaling animation on hover.
- **`hover:bg-gray-800`**: Background changes to a lighter black on hover.
- **`cursor-pointer`**: Cursor changes to pointer for interactivity.

---

### 🔚 Component Export

```jsx  
export default Navbar
```
Exports the component so it can be imported and used in the app (e.g., inside `App.jsx` or `Layout.jsx`).

---

### 🎨 Styling Insights

| Section           | Tailwind Classes                                                                                     | Purpose                                                                 |
|-------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Main Nav Container| `fixed top-0 w-full bg-white border-b p-4 flex justify-between items-center shadow-sm z-[50]`       | Makes it sticky at the top with padding, border, and z-index layering  |
| Logo              | `text-3xl font-bold`                                                                                 | Bold and large brand text                                               |
| Nav Links         | `text-sm hover:text-black transition-transform transform hover:scale-105`                           | Subtle color and scale animation on hover                              |
| Button            | `bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-gray-800 transition-all transform`     | Call-to-action button with hover transition and rounded design         |

---

### 🔁 Routing Behavior

- The component uses `Link` from **React Router** for internal navigation (Dashboard).
- It uses `<a href="#...">` for scrolling to anchored sections (Bookings and Contact Us).
- This allows hybrid navigation: full routing + in-page scrolling.

---

# 📌 Portfolio Display Component

The `PortfolioDisplay` component is responsible for fetching and displaying the portfolio of a specific entity (currently a hardcoded test TransportationProvider). It serves as a frontend viewer for the user’s portfolio details, including type, description, and uploaded media.

---

## 📁 File Location

```
/frontend/src/components/PortfolioDisplay.jsx
```

---

## 🧠 Functionality Overview

- Fetches portfolio data via `axios` from the backend API (`/api/portfolio/:id`)
- Displays key portfolio properties:
  - `Type`
  - `Description`
  - `PastWorkMedia` (array of image or video URLs)
  - `Awards`
- Uses a child component (`PortfolioItem`) to handle the rendering of portfolio details

---

## ⚙️ Logic Breakdown

### 1. **useEffect Hook**

Used to trigger an API call immediately after the component mounts.

```js
useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(\`${import.meta.env.VITE_API_URL}/api/portfolio/\${hardcodedId}\`);
      setPortfolio(response.data);
    } catch (error) {
      setError("Portfolio not found or server error.");
    }
  };
  fetchPortfolio();
}, []);
```

### 2. **State Management**

```js
const [portfolio, setPortfolio] = useState(null);
const [error, setError] = useState(null);
```

### 3. **Rendering Conditions**

- Shows loading message if portfolio is still being fetched.
- Displays an error if fetch fails.
- Renders portfolio through `PortfolioItem` when data is available.

---

## 🧪 Sample Output (UI)

- Header: "Portfolio"
- Type: e.g., "Photography"
- Description: e.g., "A collection of professional photography"
- Media Grid: Displays image or video previews using Cloudinary URLs

---

## 🔧 Notes

- The portfolio ID is currently hardcoded for testing purposes. This should be replaced with a dynamic value (e.g., from context or routing param).
- Error handling is minimal and can be expanded for better UX.
- Uses Tailwind CSS classes for styling and layout.

---

## 📎 Dependencies

- `axios`: For HTTP requests
- `react`: For lifecycle and state
- `PortfolioItem`: Custom child component to handle the actual rendering of portfolio contents

---

# 📌 PortfolioItem Component

## Overview

The `PortfolioItem` component is responsible for displaying a vendor or provider's portfolio, including type, description, and media items (images or videos). It also allows deletion of individual media entries.

## Location

`frontend/src/components/PortfolioItem.jsx`

## Props

| Prop Name     | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `Type`        | `string` | The category/type of portfolio being showcased.  |
| `Description` | `string` | A short description about the portfolio.         |
| `PastWorkMedia` | `array` | List of media URLs (image/video) uploaded.      |

## Functionality

### 1. State Management

- `mediaList`: Holds the current list of media URLs. Initialized with `PastWorkMedia` prop.

### 2. Media Rendering

- Renders videos if the URL ends in `.mp4`, `.mov`, or `.avi`.
- Otherwise, treats the URL as an image and renders it using an `img` tag.

### 3. Delete Functionality

- When the ❌ delete button is clicked:
  - A confirmation prompt is shown.
  - If confirmed, a `DELETE` request is sent to:
    ```
    ${import.meta.env.VITE_API_URL}/api/portfolio/media/67d9acf452f588f77d3d63f9
    ```
  - The request body contains the media URL:
    ```json
    {
      "mediaUrl": "<URL_TO_DELETE>"
    }
    ```
  - Upon success, the media item is removed from the local UI.

### 4. Styling

- Uses Tailwind CSS classes for layout and styling.
- Delete button is styled with red background and positioned in the top-right of each media item.

## Notes

- A hardcoded entity ID (`67d9acf452f588f77d3d63f9`) is used for deletion.
- Error handling and alerts are included for user feedback.

## Sample Media Deletion Request

```
DELETE /api/portfolio/media/67d9acf452f588f77d3d63f9
Body:
{
  "mediaUrl": "https://res.cloudinary.com/..."
}
```

## Dependencies

- `axios` for making HTTP requests.
- `useState` from React for local media management.


# 📌 PortfolioShowcase Component

## File
`PortfolioShowcase.jsx`

## Purpose
This component displays a summary view of a user's portfolio. It shows two recent pieces of media (images or videos), provides an option to edit the portfolio, and allows the user to navigate to view the full portfolio.

## Props

- **onEditClick** `(function)` – Function triggered when the "Edit Portfolio" button is clicked.
- **onViewAllClick** `(function)` – Function triggered when the "See all >>" button is clicked.
- **showCase1** `(string)` – Media URL (image or video) for the first showcase.
- **showCase2** `(string)` – Media URL (image or video) for the second showcase.

## Features

- **Media Detection**: Dynamically determines whether the provided media is a video or an image.
- **Responsive Grid**: Uses Tailwind CSS to create a 2-column responsive grid layout for media display.
- **User Actions**:
  - "Edit Portfolio" button triggers the `onEditClick` callback.
  - "See all >>" button triggers the `onViewAllClick` callback.

## Functions

### `renderMedia(mediaUrl)`
Checks if a media URL is a video or image using regex and returns the appropriate JSX element.

```js
const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);
```

- If video: returns a `<video>` tag with controls.
- If image: returns an `<img>` tag.

## Styling
- Uses Tailwind CSS classes for spacing, borders, responsiveness, and interactivity.
- Buttons are styled with hover effects and transitions.

## Notes
- The component expects URLs for media and assumes valid extensions to determine type.
- Useful for showcasing media highlights on dashboards or landing pages.


# 📌 ProfileCard Component

## Overview  
The `ProfileCard` component is a reusable React UI element designed to present summarized user information in an interactive and visually appealing format. It showcases the user's name, profession, and average rating, along with an "Edit Profile" button. It’s fully styled with Tailwind CSS and built to be easily integrated into dashboards or profile overview pages.

---

## Props

| Prop Name     | Type     | Description                                                                 |
|---------------|----------|-----------------------------------------------------------------------------|
| `name`        | `string` | The full name of the user being displayed.                                  |
| `profession`  | `string` | The professional title or category of the user (e.g., “Guest Speaker”).     |
| `rating`      | `number` | A numeric value from 0 to 5 representing the user’s average rating.         |
| `onClick`     | `func`   | Callback triggered when the entire card (excluding the button) is clicked.  |
| `onEditClick` | `func`   | Callback triggered only when the "Edit Profile" button is clicked.          |

---

## Features

- **Fully responsive** layout with a clean, modern look.
- **Dynamic star rendering** based on numeric rating.
- **Interactive UI** with hover effects and button animations.
- **Click separation logic**: Ensures that clicking the edit button does not trigger the card click handler.
- **Custom styling** powered by Tailwind CSS utility classes.

---

## Code Behavior

The layout is divided into two main sections:
- Left: Avatar placeholder and user information.
- Right: An animated "Edit Profile" button.

```jsx
<div onClick={onClick} className="...">
  <div className="flex items-center space-x-4">
    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
    <div>
      <h2>{name}</h2>
      <p>{profession}</p>
      <div>{renderStars(rating)}</div>
    </div>
  </div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      onEditClick();
    }}
    className="..."
  >
    Edit Profile
  </button>
</div>
```

> 💡 `e.stopPropagation()` is used inside the button click handler to prevent it from bubbling up and triggering the parent card’s `onClick`.

---

## Styling Highlights

- `max-w-5xl`: Limits width while allowing responsive scaling.
- `hover:bg-gray-50`: Light background change on hover for better UX.
- `transition-all duration-200`: Smooth animations for interactions.
- `hover:scale-105`: Slight zoom on the edit button when hovered.

---
