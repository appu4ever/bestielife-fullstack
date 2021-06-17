/*eslint-disable*/
import {
  Flex,
  Icon,
  Text,
  Image,
  Stack,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';

interface ImageUploadProps {
  setFieldValue: (field: string, value: any) => void;
  fetching: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const [image, setImage] = React.useState(null) as any;
  const [isFileLarge, setIsFileLarge] = React.useState(false);
  const { setFieldValue, fetching } = props;

  const onDrop = React.useCallback(([file]) => {
    // console.log('FILE', file);
    if (file.size > 10000000) {
      setIsFileLarge(true);
    } else {
      if (isFileLarge) {
        setIsFileLarge(false);
      }
      setImage(file);
      setFieldValue('picture', file);
    }
  }, []);

  const {
    getRootProps,
    isDragActive,
    isDragAccept,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg , image/jpg, image/png',
  });

  return (
    <Flex
      direction="column"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={'gray.500'}
      borderStyle="dashed"
      py={3}
      align="center"
      justify="center"
    >
      <Stack spacing={4}>
        <Text color={'gray.500'} textAlign="center">
          PNG, JPG and GIF images allowed
        </Text>
        {!image ? (
          <Flex
            direction="column"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            justify="center"
            align="center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <Icon as={MdFileUpload} width={16} height={16} color="gray.500" />
            <Text
              color={'gray.500'}
              align="center"
              fontSize={{ base: 'sm', sm: 'md' }}
            >
              {!isDragActive
                ? `Tap or Drag 'n' Drop Image  to Add Profile Picture`
                : isDragReject
                ? 'Ooops upload images only'
                : 'Drop your image here to upload'}
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" justify="center" align="center">
            <Image
              boxSize="100px"
              objectFit="cover"
              rounded="lg"
              src={URL.createObjectURL(image)}
              alt="image illustration"
            />
            <Text
              color={'gray.500'}
              align="center"
              fontSize={{ base: 'sm', sm: 'md' }}
            >
              {image && image.name}
            </Text>
          </Flex>
        )}
        {isFileLarge && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>File size is too large!</AlertTitle>
            <AlertDescription>
              Please select a file less than 10MB.
            </AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
      </Stack>
    </Flex>
  );
};
