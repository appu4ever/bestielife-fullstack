import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useTheme,
  Stack,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
/*eslint-disable*/
import React from 'react';

import {
  CreatePetMutation,
  PetsDocument,
  PetsQuery,
  useCreatePetMutation,
  usePetsQuery,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { ImageUpload } from './ImageUpload';
import InputField from './InputField';

const DrawerComponent: React.FC<{}> = ({}) => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef<FocusableElement | null>(null);
  const history = useHistory();
  const [addPet, { loading }] = useCreatePetMutation();

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        bgColor={theme.colors.blue}
        colorScheme={theme.colors.blue}
        variant="solid"
        fontSize={'sm'}
        onClick={onOpen}
      >
        Add a pet
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
        closeOnOverlayClick
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a new pet</DrawerHeader>

          <DrawerBody>
            <Stack
              bg={'gray.50'}
              rounded={'xl'}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: 'lg' }}
            >
              <Stack spacing={4}>
                <Heading
                  color={'gray.800'}
                  lineHeight={1.1}
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                  textAlign="center"
                >
                  Welcome back.
                </Heading>
                <Text
                  color={'gray.500'}
                  fontSize={{ base: 'sm', sm: 'md' }}
                  textAlign="center"
                >
                  We’re looking for amazing engineers just like you! Become a
                  part of our rockstar engineering team and skyrocket your
                  career!
                </Text>
                <Formik
                  initialValues={{ name: '', breed: '', picture: '' }}
                  onSubmit={async (values, { setErrors }) => {
                    const response = await addPet({
                      variables: {
                        data: { name: values.name, breed: values.breed },
                        picture: values.picture,
                      },
                      update: (
                        cache,
                        {
                          data: {
                            createPet: { pet },
                          },
                        }
                      ) => {
                        cache.modify({
                          fields: {
                            pets(existingPets = []) {
                              cache.writeQuery({
                                query: PetsDocument,
                                data: [...existingPets, pet],
                              });
                            },
                          },
                        });
                      },
                    });
                    if (response.data?.createPet.errors) {
                      setErrors(toErrorMap(response.data?.createPet.errors));
                    } else if (response.data?.createPet.pet) {
                      onClose();
                    }
                  }}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <InputField
                        name="name"
                        placeholder="Name of your pet"
                        type="text"
                      />
                      <Box my={3}>
                        <InputField
                          name="breed"
                          placeholder="Breed"
                          type="text"
                        />
                      </Box>
                      <Stack spacing={10}>
                        <ImageUpload
                          setFieldValue={setFieldValue}
                          fetching={loading}
                        />
                        <Button
                          bg={'blue'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          isLoading={isSubmitting}
                          type="submit"
                        >
                          Add your pet
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
