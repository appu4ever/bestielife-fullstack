import { Box } from '@chakra-ui/react';
import React from 'react';
import { CalendarContainer } from 'react-datepicker';

interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = ({ children }) => {
  return (
    <Box p={8} bg="white" height={'300px'}>
      <CalendarContainer>{children}</CalendarContainer>
    </Box>
  );
};
