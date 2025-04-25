// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './contexts/UserContext.jsx';
import  {ProtectedRoute}  from './routes/ProtectedRoute.jsx';
import  Home from './pages/Home.jsx';
import  ClientDashboard  from './pages/ClientDashboard.jsx';
import  FreelancerDashboard from './pages/FreelancerDashboard.jsx';
import  {Login}  from './pages/Login.jsx';
import  {Register}  from './pages/register';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            
            {/* Protected client routes */}
            <Route element={<ProtectedRoute requiredRole="client" />}>
              <Route path="/client/dashboard" element={<ClientDashboard/>} />
              {/* Other client routes */}
            </Route>
            
            {/* Protected freelancer routes */}
            <Route element={<ProtectedRoute requiredRole="freelancer" />}>
              <Route path="/freelancer/dashboard" element={<FreelancerDashboard/>} />
              {/* Other freelancer routes */}
            </Route>
            
            {/* Not Found */}
            {/* <Route path="/404" element={<NotFound/>} /> */}
            {/* <Route path="*" element={<Navigate to="/404" />} /> */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;