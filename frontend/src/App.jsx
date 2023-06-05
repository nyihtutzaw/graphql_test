import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import Team from "./pages/Team";
import "./app.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="title-container">
          Club Database
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Team />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
