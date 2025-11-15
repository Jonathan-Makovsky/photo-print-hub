import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Input,
  Flex,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import { useState } from "react";

export default function App() {
  const bg = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (e) {
      console.error("Generation failed", e);
    }

    setLoading(false);
  }

  return (
    <Box
      dir="rtl"
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack spacing={10} w="100%" maxW="500px" textAlign="center">
        <Heading size="2xl" fontWeight="bold">
          צור תמונה מודפסת בשניות
        </Heading>

        <Text fontSize="lg" color="gray.500" maxW="90%">
          כתבו מה שתרצו — ונייצר עבורכם תמונה איכותית, מוכנה להדפסה בגודל
          קבוע שסוכם עם חנויות ההדפסה.
        </Text>

        {/* Chat-style section */}
        <Box
          w="100%"
          p={5}
          bg={cardBg}
          rounded="xl"
          shadow="md"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <VStack align="stretch" spacing={3}>
            <Text fontWeight="semibold">מה תרצו ליצור?</Text>

            <Input
              placeholder="לדוגמה: כלב על חוף הים..."
              size="lg"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              bg={useColorModeValue("gray.50", "gray.700")}
            />

            <Flex justify="flex-end">
              <Button
                colorScheme="teal"
                size="lg"
                onClick={generate}
                isLoading={loading}
              >
                צור תמונה
              </Button>
            </Flex>
          </VStack>
        </Box>

        <Text fontSize="sm" color="gray.500">
          גודל ההדפסה ברירת מחדל: 20×30 ס״מ
        </Text>

        {/* Generated image */}
        {loading && <Spinner size="xl" mt={4} />}

        {imageUrl && !loading && (
          <Box mt={6} w="100%">
            <Text mb={3} fontWeight="medium">
              התמונה שנוצרה:
            </Text>
            <img
              src={imageUrl}
              alt="generated"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
}
