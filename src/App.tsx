import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export default function App() {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
    >
      <VStack spacing={6} textAlign="center">
        <Heading size="2xl">Photo Print Hub</Heading>

        <Text maxW="500px">
          Generate beautiful photos instantly and print them at local partner shops.
        </Text>

        <Button size="lg" colorScheme="teal">
          Start Now
        </Button>
      </VStack>
    </Box>
  );
}
