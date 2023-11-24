// Import the necessary dependencies and components
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Inspiration from './pages/Inspiration';
import Navbar from './components/Navbar';
import Venue from './pages/Venue';
import Countdown from './pages/Countdown'; 
import Budget from './pages/Budget';

// Create a new in-memory cache for Apollo Client
const cache = new InMemoryCache();

// Configure the Apollo Client
const client = new ApolloClient({
  request: operation => {
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('jwtToken');
    // Set the "authorization" header for GraphQL requests
    operation.setContext({
      headers: { authorization: token ? `Bearer ${token}` : '' }
    });
  },
  uri: '/graphql', // URI for the GraphQL server
  cache // Use the created in-memory cache
});

// Clear the Apollo Client store
client.clearStore();

function App() {
  return (

    // Wrap the entire application with ApolloProvider to enable Apollo Client
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* Render the Navbar component for navigation */}
          <Navbar />
          {/* Define routes for the application using React Router */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/budget' component={Budget} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/venues' component={Venue}/>
            <Route exact path='/vendors' component={Vendors} />
            <Route exact path='/inspiration' component={Inspiration} />
            <Route exact path='/countdown' component={Countdown} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
