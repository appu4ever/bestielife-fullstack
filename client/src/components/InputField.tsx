/*eslint-disable*/
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';

type InputFieldProps = FieldHookConfig<any> & {
  label?: string;
  placeholder?: string;
  type: string;
  value?: any;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  const { type, placeholder } = props;
  return (
    <FormControl isInvalid={!!error}>
      {props.label && <FormLabel htmlFor={field.name}>{props.label}</FormLabel>}
      <Input
        {...field}
        value={props.value ? props.value : field.value}
        type={type}
        id={field.name}
        placeholder={placeholder}
        bg={'gray.100'}
        border={0}
        color={'gray.500'}
        _placeholder={{
          color: 'gray.500',
        }}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
export default InputField;
