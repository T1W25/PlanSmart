# Dashboard Page

## File
`Dashboard.jsx`

## Description
This component serves as the user dashboard, displaying profile information and a preview of the user's portfolio. It fetches user data from the backend and routes users to appropriate pages on interaction.

## Technologies Used
- React (Hooks: `useState`, `useEffect`)
- Axios for HTTP requests
- React Router (`useNavigate`) for page navigation
- Tailwind CSS for layout and styling

## Functional Overview

### State
- `userData`: Holds the retrieved user information from the backend.

### Hooks
- `useEffect`: Fetches user profile data from the backend when the component mounts.
- `useNavigate`: Enables programmatic navigation between routes.

## API Interaction
```js
axios.get("http://localhost:5050/api/transportation-providers/${userId}")
```
- Fetches transportation provider data by hardcoded test user ID.

## Rendered Components
- `<Navbar />`: The main navigation bar.
- `<ProfileCards />`: Renders profile info with rating and interactivity.
- `<PortfolioShowcase />`: Displays the two latest media items from the portfolio.

## Navigation Logic
- `onClick` in `<ProfileCards>` routes to `/pages/profileview`
- `onEditClick` in `<ProfileCards>` routes to `/pages/profileedit`
- `onEditClick` in `<PortfolioShowcase>` routes to `/pages/portfolioeditor`
- `onViewAllClick` in `<PortfolioShowcase>` routes to `/pages/portfoliodisplay`

## Example Usage
```jsx
<ProfileCards
  name={userData.Name}
  profession={userData.ProviderType}
  rating={userData.rating}
  onClick={() => navigate("/pages/profileview")}
  onEditClick={() => navigate("/pages/profileedit")}
/>
```

## Styling Notes
- `pt-24 px-6 w-full`: Ensures proper spacing from the fixed navbar.
- `space-y-6`: Vertically separates child components.
- Tailwind utilities are used extensively for responsiveness and layout.

## Notes
- `userId` is currently hardcoded for testing purposes.
- Error handling is basic; improvement could include user notifications.


# PortfolioEditor.jsx

## Description
The `PortfolioEditor` component is used to view, update, and manage a user's portfolio. This includes editing the portfolio type and description, uploading media files (images or videos), and adding awards dynamically. It interacts with a backend API to perform CRUD operations.

## Props
- `modelId` (string): The unique ID of the user/entity whose portfolio is being edited. Defaults to a hardcoded test ID.
- `initialPortfolio` (object): Optional preloaded data for the portfolio, used to populate the form initially.
- `entityType` (string): Specifies the type of entity (e.g., "vendor"). Default is "vendor".

## Features
- Users can update the **Type** and **Description** fields of their portfolio.
- Users can upload media (images or videos) and preview them before submission.
- Each media file is uploaded to the server via a POST request to `/api/portfolio/upload/:id`.
- Users can add multiple **awards** by pressing Enter.
- Awards are displayed as a list below the input field.
- Final submission uses a PUT request to update portfolio text fields at `/api/portfolio/:id`.

## Key Functions

### `handleChange`
Updates the state for Type and Description input fields.

### `handleAwardAdd`
Captures award input on Enter keypress, updates the awards list, and resets the input field.

### `handleFileChange`
Handles the selection of a file and generates a local preview URL for display.

### `handleUpload`
Uploads selected media file to the server using FormData and appends the URL to the media list.

### `handleSave`
Sends a PUT request to update Type and Description for the portfolio.

## UX Features
- **Preview Section**: Displays either an image or video preview based on file type.
- **Dynamic Award Input**: Adds award items to a list via the Enter key.
- **Stylized Buttons**: Upload and Submit buttons with clear visual feedback.

## Sample API Calls

### Upload Media
```
POST /api/portfolio/upload/:id
Content-Type: multipart/form-data
```

### Update Text Fields
```
PUT /api/portfolio/:id
Body: {
  "Type": "Photography",
  "Description": "Capturing timeless moments"
}
```

## Example Usage
```jsx
<PortfolioEditor 
  modelId="67d9acf452f588f77d3d63f9" 
  entityType="vendor"
/>
```

## Styling
- Built with Tailwind CSS for quick responsive layout.
- Utility classes control spacing, typography, and animation.


# ProfileEdit Component

## File
`ProfileEdit.jsx`

## Description
This React component provides an interface for a transportation provider to view and update their profile information. It fetches data from the backend using the user’s ID, displays it in a form, and allows editing fields such as name, email, phone number, and password.

## Features
- **Data Fetching**: Automatically retrieves user data from the backend using `axios` and populates form fields.
- **Live Editing**: Allows the user to update full name, email, phone number, and password.
- **Form Submission**: Sends a PUT request to the backend with updated fields.
- **Password Handling**: Password is only updated if the field is filled in.
- **Visual Feedback**: Alerts the user on successful or failed update operations.
- **Responsive UI**: Styled using Tailwind CSS with modern UI components like hover animations and button interactions.

## Props and State
This component does not receive any props.

**State:**
- `formData`: Holds user profile data (name, email, phone, password, isVerified, image).
- `userId`: Hardcoded for testing purposes.

## Key UI Elements
- **Profile Image**: Displays user image with a placeholder from Cloudinary.
- **Change Picture Button**: Placeholder for image upload logic.
- **Form Fields**: Input elements for editable user fields.
- **Verify Button**: Placeholder to trigger profile verification.
- **Apply Changes**: Triggers backend update via PUT request.

## Axios Usage
```js
useEffect(() => {
  axios.get(`http://localhost:5050/api/transportation-providers/${userId}`)
    .then((res) => {
      const { Name, Email, Phone, isVerified, Portfolio } = res.data;
      setFormData({
        Name,
        Email,
        Phone,
        Password: "",
        isVerified,
        ProfileImage: Portfolio?.ImageUrl || "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      });
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);
```

## Form Submission Logic
```js
const handleSubmit = async () => {
  const payload = { Name, Email, Phone };
  if (Password.trim()) payload.Password = Password;
  await axios.put(`http://localhost:5050/api/transportation-providers/${userId}`, payload);
};
```

## Usage Context
This page is used in the route `/pages/profileedit` and connected to the main dashboard for editing user profiles.

## Notes
- A button is included to verify the profile but is not yet hooked to backend logic.
- Assumes the backend route `/api/transportation-providers/:id` is already configured.

# ProfileView Component

## File
`ProfileView.jsx`

## Description
This React component is responsible for displaying a read-only view of a user's profile, including profile image, full name, email, phone number, and verification status.

## Features
- Fetches user data from a backend API using Axios.
- Displays user profile image and core profile details in a non-editable format.
- Highlights whether the profile is verified.
- Tailwind CSS is used for responsive and modern UI design.

## State Variables
- `userData`: Stores the fetched user profile data, including name, email, phone, verification status, and profile image URL.

## API Integration
- **GET** request to `http://localhost:5050/api/transportation-providers/:userId` on component mount to fetch profile data.

## UI Behavior
- Shows a circular profile image at the top.
- Renders labeled sections for full name, email, and phone number using gray background blocks.
- Displays verification status using a colored badge.

## Code Snippet
```jsx
useEffect(() => {
  axios
    .get(\`http://localhost:5050/api/transportation-providers/\${userId}\`)
    .then((res) => {
      const { Name, Email, Phone, isVerified, Portfolio } = res.data;
      setUserData({
        Name,
        Email,
        Phone,
        isVerified,
        ProfileImage: Portfolio?.ImageUrl || "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      });
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);
```