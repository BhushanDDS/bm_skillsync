import React, { useState, useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  IconButton,
  Flex
} from "@chakra-ui/react";
import { EditIcon, LockIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export default function UpdateProfile() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  // Modal controls
  const profileModal = useDisclosure();
  const passwordModal = useDisclosure();
  const avatarModal = useDisclosure();

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { isSubmitting: isProfileSubmitting }
  } = useForm();

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { isSubmitting: isPasswordSubmitting }
  } = useForm();

  // Fetch current user data
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.getProfile();
      setUserData(response.data);
      resetProfile({
        name: response.data.name || '',
        bio: response.data.bio || ''
      });
      return response.data;
    } catch (error) {
      toast({
        title: "Error fetching profile",
        description: error.message,
        status: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => userApi.updateProfile(data),
    onSuccess: () => {
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
      });
      profileModal.onClose();
      fetchUserProfile();
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  });

  // Upload Profile Image Mutation
  const uploadMutation = useMutation({
    mutationFn: (formData) => userApi.uploadProfile(formData),
    onSuccess: (data) => {
      toast({
        title: "Profile photo updated",
        status: "success",
        duration: 3000,
      });
      avatarModal.onClose();
      fetchUserProfile();
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  });

  // Password Update Mutation
  const passwordMutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      userApi.updatePassword(oldPassword, newPassword),
    onSuccess: () => {
      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
      });
      passwordModal.onClose();
      resetPassword();
    },
    onError: (error) => {
      toast({
        title: "Password change failed",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  });

  const onProfileSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit = (data) => {
    passwordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    uploadMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="xl">
      <Heading mb={6} textAlign="center">
        My Profile
      </Heading>

      <VStack spacing={6} align="stretch">
        {/* Profile Section */}
        <Box p={4} borderWidth="1px" borderRadius="md">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">Profile Information</Heading>
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit profile"
              onClick={profileModal.onOpen}
              size="sm"
              colorScheme="blue"
            />
          </Flex>
          
          <HStack mb={3} spacing={4}>
            <Avatar 
              size="xl" 
              src={userData?.profileImage} 
              name={userData?.name}
              onClick={avatarModal.onOpen}
              cursor="pointer"
            />
            <Box>
              <Text fontWeight="bold" fontSize="xl">{userData?.name}</Text>
              <Text color="gray.600">{userData?.bio || "No bio added yet."}</Text>
            </Box>
          </HStack>
        </Box>

        {/* Security Section */}
        <Box p={4} borderWidth="1px" borderRadius="md">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">Security</Heading>
            <IconButton
              icon={<LockIcon />}
              aria-label="Change password"
              onClick={passwordModal.onOpen}
              size="sm"
              colorScheme="green"
            />
          </Flex>
          <Text>Change your password or update security settings.</Text>
        </Box>
      </VStack>

      {/* Profile Edit Modal */}
      <Modal isOpen={profileModal.isOpen} onClose={profileModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <ModalBody>
              <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input 
                  {...registerProfile("name")} 
                  defaultValue={userData?.name}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Bio</FormLabel>
                <Input 
                  {...registerProfile("bio")} 
                  defaultValue={userData?.bio}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={profileModal.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isProfileSubmitting || updateProfileMutation.isPending}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Avatar Edit Modal */}
      <Modal isOpen={avatarModal.isOpen} onClose={avatarModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center mb={4}>
              <Avatar 
                size="2xl" 
                src={userData?.profileImage} 
                name={userData?.name}
              />
            </Center>
            <FormControl>
              <FormLabel>Select new profile photo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                py={1}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={avatarModal.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              isLoading={uploadMutation.isPending}
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              Upload New Photo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Password Change Modal */}
      <Modal isOpen={passwordModal.isOpen} onClose={passwordModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
            <ModalBody>
              <FormControl isRequired mb={3}>
                <FormLabel>Current Password</FormLabel>
                <Input type="password" {...registerPassword("oldPassword")} />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>New Password</FormLabel>
                <Input type="password" {...registerPassword("newPassword")} />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input type="password" {...registerPassword("confirmPassword")} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={passwordModal.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={isPasswordSubmitting || passwordMutation.isPending}
              >
                Change Password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}