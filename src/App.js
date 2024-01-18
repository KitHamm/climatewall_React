// Apollo imports
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// REact imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
// component imports
import "./App.css";
import Home from "./pages/Home";
// obfuscated url from env
export const url = process.env.REACT_APP_URL;
const api = new ApolloClient({
    uri: url + "/graphql",
    cache: new InMemoryCache(),
});
// Routes no longer necessary. User and Moderator areas moved to separate projects.
function App() {
    return (
        <BrowserRouter>
            <ApolloProvider client={api}>
                <Routes>
                    <Route path="/climatewall" element={<Home />} />
                </Routes>
            </ApolloProvider>
        </BrowserRouter>
    );
}

export default App;
