import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectContext } from '../../contexts/ProjectContext'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Box, Button,useToast, FormControl, FormLabel, Input, Textarea, Select, FormErrorMessage, VStack, Heading } from '@chakra-ui/react';
import GoToDashboardButton from '../GoToDashboard'
function UpdateProject() {
  const { projectId } = useParams(); // Get projectId from the URL
  const { fetchProject, updateProject } = useProjectContext();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
  const toast = useToast();

  // Fetch existing project details
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  });
  
  const updateProjectMutation = useMutation({
    mutationFn: (data) => updateProject({ id: projectId, ...data }),
    onSuccess: () => {

      toast({
        title: 'Success',
        description: 'Project Updated Succesfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Updation Failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      console.error("Failed to Update project:", error.response?.data || error.message);
    }
  })

  // Pre-fill form when project is fetched
  useEffect(() => {
    if (project?.data) {

        setValue('title', project?.data?.title || "")
        setValue('description', project?.data?.description || "")
        setValue('budget', project?.data?.budget || "")
        setValue('deadline', project?.data?.deadline?.split('T')[0] || "")
        setValue('skills', project?.data?.skills ? project?.data?.skills.map(skill => skill.name).join(", ") : "")
        setValue('status', project?.data?.status || "")
      }
      console.log(project?.data)
  }, [project, setValue])

  const onSubmit = async (data) => {
    const preparedData = {
      ...data,
      budget: parseInt(data.budget),
      skills: [...data.skills.split(",").map((skill) => skill.trim())] ,
    }
    console.log("Submitting updated project:", preparedData);
    await updateProjectMutation.mutateAsync({ id: projectId, data: preparedData });  
}
 
  if (isLoading) return <p>Loading project...</p>

  return (
    <Box bg="gray.50" p={8} rounded="md" boxShadow="md" maxW="600px" mx="auto">
       <GoToDashboardButton/>
      <Heading size="lg" color="blue.600" mb={6} textAlign="center">
        Update Project
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>

          <FormControl isInvalid={errors.title}>
            <FormLabel>Title</FormLabel>
            <Input 
              bg="white"
              {...register("title", {
                required: "Title is required", 
                minLength: { value: 3, message: "Title must be at least 3 characters" }
              })}
            />
            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea 
              bg="white"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" }
              })}
            />
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.budget}>
            <FormLabel>Budget</FormLabel>
            <Input 
              type="number" 
              bg="white"
              {...register("budget", {
                required: "Budget is required",
                min: { value: 1, message: "Budget must be greater than 0" }
              })}
            />
            <FormErrorMessage>{errors.budget && errors.budget.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.deadline}>
            <FormLabel>Deadline</FormLabel>
            <Input 
              type="date" 
              bg="white"
              {...register("deadline", {
                required: "Deadline is required"
              })}
            />
            <FormErrorMessage>{errors.deadline && errors.deadline.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.skills}>
            <FormLabel>Skills (comma separated)</FormLabel>
            <Input 
              bg="white"
              {...register("skills", {
                required: "Skills are required"
              })}
            />
            <FormErrorMessage>{errors.skills && errors.skills.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.status}>
            <FormLabel>Status</FormLabel>
            <Select 
              placeholder="Select Status"
              bg="white"
              {...register("status", {
                required: "Status is required"
              })}
            >
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </Select>
            <FormErrorMessage>{errors.status && errors.status.message}</FormErrorMessage>
          </FormControl>

          <Button 
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={updateProjectMutation.isLoading}
            width="full"
          >
            {updateProjectMutation.isLoading ? "Updating..." : "Update Project"}
          </Button>

        </VStack>
      </form>
    </Box>
  );
}

export default UpdateProject
