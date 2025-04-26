import React from 'react';
import { useProjectContext } from '../../contexts/ProjectContext.jsx';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "../../api/project";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function ProjectForm() {
  const { register, handleSubmit, reset } = useForm();
  const{createProject}=useProjectContext();

  const createProjectMutation = useMutation({
    mutationFn: (data) => createProject(data),
    onSuccess: () => {
      alert("Project created successfully!");
      reset();
    },
    onError: (error) => {
      console.error("Failed to create project:", error.response?.data || error.message);
    }
  });

  const onSubmit = async (data) => {
    // skills will come as comma-separated string, so split it into array
    const preparedData = {
      ...data,
      budget: parseInt(data.budget), // ensure budget is a number
      skills: data.skills.split(",").map((skill) => skill.trim()), // split skills into array
    };
    
    console.log("Submitting project:", preparedData);
    await createProjectMutation.mutateAsync(preparedData);
  };

  return (
    <Box bg="gray.50" minH="100vh" p={10}>
      {/* Back to Dashboard */}
      <Box mb={6}>
        <ChakraLink
          as={Link}
          to="/client/dashboard"
          color="blue.500"
          fontWeight="bold"
          _hover={{ textDecoration: 'underline' }}
        >
          ← Back to Dashboard
        </ChakraLink>
      </Box>

      {/* Form */}
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        maxW="600px"
        mx="auto"
      >
        <Heading size="lg" color="blue.600" mb={6} textAlign="center">
          Create New Project
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Project Title</FormLabel>
              <Input {...register("title")} placeholder="Enter project title" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Project Description</FormLabel>
              <Textarea {...register("description")} placeholder="Enter project description" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Budget</FormLabel>
              <Input {...register("budget")} placeholder="Enter budget" type="number" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Deadline</FormLabel>
              <Input {...register("deadline")} type="date" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Skills Required</FormLabel>
              <Input {...register("skills")} placeholder="e.g., React, Node.js" />
            </FormControl>

            <Button
              type="submit"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              width="full"
            >
              Create Project
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
