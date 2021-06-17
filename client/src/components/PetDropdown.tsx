/*eslint-disable*/
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
  useTheme,
} from '@chakra-ui/react';
import React from 'react';
import { usePetID } from '../contexts/pet-context';
import { Pet, usePetsQuery } from '../generated/graphql';

interface PetDropdownProps {}

const PetDropdown: React.FC<PetDropdownProps> = () => {
  const theme = useTheme();
  //@ts-ignore
  const [petId, setPetId, data] = usePetID();
  // const { data, loading } = usePetsQuery({ variables: { limit: 10 } });
  // console.log(data);
  return (
    <Menu autoSelect closeOnSelect={true}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={theme.colors.green}
            color={'white'}
            isActive={isOpen}
          >
            Your Pets
          </MenuButton>
          <MenuList>
            {data.pets && data.pets.length !== 0 ? (
              data.pets.map((pet) => (
                <MenuItem
                  minH="48px"
                  key={pet.id}
                  onClick={() => setPetId(pet.id)}
                >
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={`http://localhost:4000/${pet.avatar}`}
                    alt={`${pet.name}`}
                    mr="12px"
                  />
                  <span>{pet.name}</span>
                </MenuItem>
              ))
            ) : (
              <span>You do not have any pets</span>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default PetDropdown;
