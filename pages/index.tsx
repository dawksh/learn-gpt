import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, Image, useDisclosure } from "@chakra-ui/react";
import axios from 'axios'
import QuizModal from "../components/Quiz.modal";

interface Response {
  image: [string],
  text: string
}

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true)
    const { data } = await axios.post('/api/learn', { prompt: inputValue })
    console.log(data)
    setResponse(data)
    setLoading(false)
  }
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box p={8}>
      <Flex justifyContent="center" alignItems="center" direction='column'>
        <Heading as="h1" size="xl" mb={4}>
          Learn GPT
        </Heading>
        <QuizModal isOpen={isOpen} onClose={onClose} topic={inputValue} />
        <FormLabel htmlFor="name">What do you want to study today?</FormLabel>
        <Input
          id="name"
          placeholder="Enter a topic"
          value={inputValue}
          onChange={handleInputChange}
          mb={4}
        />
        <Button rounded="none" variant="outline" border="4px" type="submit" onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
        {
          response && (
            <>
              {response.text && <Text p={4} >{response.text}</Text>}
              <br />
              {response.image && response.image.map((image, index) => <Image height="300px" width="300px" key={index} src={image} />)}
              <Button m={4} rounded="none" variant="outline" border="4px" onClick={onOpen}>
                Take a quiz!
              </Button>
            </>
          )
        }
      </Flex>

    </Box>
  )
}
