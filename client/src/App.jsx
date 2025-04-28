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
import  ProjectForm from './components/client/ProjectForm.jsx';
import UpdateProject from './components/project/UpdateProject.jsx';
import { ProjectProvider } from './contexts/ProjectContext.jsx';
import ProjectDetails from './components/project/ProjectDetails.jsx';
import ViewProjects from './components/project/ViewProjects.jsx';
import BidCard from './components/bidding/BidCard.jsx';
import ProjectDetailsClient from './components/client/ProjectDetailsClient.jsx';

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
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path='/projectdetails/:projectId' element={<ProjectDetails/>}/>
            <Route path="/view-projects" element={<ViewProjects/>} />  

            {/* Protected client routes */}
            <Route element={<ProtectedRoute requiredRole="client" />}>
              <Route path="/client/dashboard" element={<ClientDashboard/>} />
              {/* Other client routes */}
              <Route path="/post-project" element={<ProjectForm/>} />
              <Route path="/updateproject/:projectId" element={<UpdateProject/>} />
              <Route path="/get-single-bid/bidId" element={<BidCard/>}/>
              <Route path="/client/projectdetails/:projectId" element={<ProjectDetailsClient/>} />
              <Route  path='/get-single-bid/:bidId' element={<BidCard/>}/>
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
        </ProjectProvider>
      </UserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;