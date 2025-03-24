
# App Router Configuration

## File
`App.jsx`

## Description
This file defines the main routing configuration for the React application using **React Router**. It maps URL paths to their corresponding components for different user views like the dashboard, profile, and portfolio sections.

## Technologies Used
- **React Router v6**: For client-side routing and navigation.
- **React Functional Components**

## Routes Overview
| Path                        | Component          | Description                           |
|----------------------------|--------------------|---------------------------------------|
| `/`                        | `Dashboard`        | The main landing page (user dashboard) |
| `/pages/profileedit`       | `ProfileEdit`      | Profile editing page                   |
| `/pages/profileview`       | `ProfileView`      | Profile viewing page                   |
| `/pages/portfoliodisplay`  | `PortfolioDisplay` | Page showing the full portfolio        |
| `/pages/portfolioeditor`   | `PortfolioEditor`  | Page to edit and upload portfolio      |

## Code Behavior

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import ProfileView from './pages/ProfileView';
import Portfolio from './components/PortfolioDisplay';
import PortfolioEditor from './pages/PortfolioEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pages/profileedit" element={<ProfileEdit />} />
        <Route path="/pages/profileview" element={<ProfileView />} />
        <Route path="/pages/portfoliodisplay" element={<Portfolio />} />
        <Route path="/pages/portfolioeditor" element={<PortfolioEditor />} />
      </Routes>
    </Router>
  )
}

export default App;
```

## Notes
- Routing logic is placed at the root of the app to control page views.
- Every route links to a clearly defined user-facing component.
