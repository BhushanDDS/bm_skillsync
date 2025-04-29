import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Avatar,
  VStack,
  HStack,
  Text,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export default function UpdateProfile() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch current user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userApi.getProfile,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: async () => {
      if (!user) return {};
      return {
        name: user.name,
        bio: user.bio || "",
      };
    },
  });

  // Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data) => userApi.updateProfile(data),
    onSuccess: () => {
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  // Upload Profile Image Mutation
  const uploadMutation = useMutation({
    mutationKey: ["uploadProfile"],
    mutationFn: (formData) => userApi.uploadProfile(formData),
    onSuccess: () => {
      toast({
        title: "Profile photo updated",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  // Password Update Mutation
  const passwordMutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: ({ oldPassword, newPassword }) =>
      userApi.updatePassword(oldPassword, newPassword),
    onSuccess: () => {
      toast({
        title: "Password changed",
        status: "success",
        duration: 3000,
      });
    },
  });

  const handleProfileSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    passwordMutation.mutate({ oldPassword, newPassword });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    uploadMutation.mutate(formData);
  };

  if (isLoading) return <Spinner size="xl" />;

  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="xl">
      <Heading mb={6} textAlign="center">
        Update Profile
      </Heading>

      <VStack spacing={6} align="stretch">
        {/* Avatar + Upload */}
        <HStack justify="center">
          <Avatar size="xl" src={user?.profileImage} name={user?.name} />
        </HStack>

        <FormControl>
          <FormLabel>Update Profile Photo</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            isDisabled={uploadMutation.isPending}
          />
        </FormControl>

        <Divider />

        {/* Update Name + Bio */}
        <form onSubmit={handleSubmit(handleProfileSubmit)}>
          <FormControl isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Bio</FormLabel>
            <Input {...register("bio")} />
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting || updateProfileMutation.isPending}
          >
            Save Changes
          </Button>
        </form>

        <Divider />

        {/* Change Password */}
        <form onSubmit={handlePasswordChange}>
          <FormControl isRequired mb={3}>
            <FormLabel>Old Password</FormLabel>
            <Input type="password" name="oldPassword" />
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>New Password</FormLabel>
            <Input type="password" name="newPassword" />
          </FormControl>

          <Button
            colorScheme="green"
            type="submit"
            isLoading={passwordMutation.isPending}
          >
            Change Password
          </Button>
        </form>
      </VStack>
    </Box>
  );
}
