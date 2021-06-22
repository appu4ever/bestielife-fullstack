/*eslint-disable*/
import { Spinner } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { Pet, PetsQuery, usePetsQuery } from '../generated/graphql';

const PetIDContext = React.createContext(null);

function usePetID(): React.Context<null> {
  const petContext = React.useContext(PetIDContext);
  if (!petContext) {
    throw new Error('usePetID must be used within PetIDProvider');
  }
  return petContext;
}

function PetIDProvider(props: any) {
  const [petId, setPetId] = React.useState<number>(0);
  const { data, loading, error } = usePetsQuery({ variables: { limit: 10 } });
  // const mountedRef = React.useRef<Boolean>(true);

  // React.useEffect(() => {
  //   if (mountedRef.current && !loading) {
  //     setPetId(data.pets ? data.pets[data.pets.length - 1].id : undefined);
  //   }
  //   return () => {
  //     mountedRef.current = false;
  //   };
  // }, [loading]);

  const value = React.useMemo<
    [number | undefined, Dispatch<SetStateAction<number>>, PetsQuery]
  >(() => [petId, setPetId, data], [data, petId]);

  return <PetIDContext.Provider value={value} {...props} />;
}

export { usePetID, PetIDProvider };
