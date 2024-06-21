//importing apollo client
import{ApolloClient,
      InMemoryCache,
      ApolloProvider,
      createHttpLink}from '@apollo/client';
//importing app.css for
import './App.css';
//importing outlet from react-router, it is a component to server as a placeholder for child routes inside a parent route
import { Outlet } from 'react-router-dom';
//importing Navigation bar from components folder, client side
import Navbar from './components/Navbar';
//API endpoint
const httpLink = createHttpLink({
  uri:'/graphql'
})
//
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: { // headers are used for
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
})
//client connection
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
//setting apollo provider for
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar/>
      <Outlet/>
    </ApolloProvider>
  );
}

export default App;
