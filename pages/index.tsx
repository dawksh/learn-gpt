import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import axios from 'axios'

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

  return (
    <Box p={4}>
      <Flex justifyContent="center" alignItems="center" direction='column'>
        <Heading as="h1" size="xl" mb={4}>
          Learn GPT
        </Heading>
        <FormLabel htmlFor="name">What do you want to study today?</FormLabel>
        <Input
          id="name"
          placeholder="Enter a topic"
          value={inputValue}
          onChange={handleInputChange}
          mb={4}
        />
        <Button type="submit" onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
        {
          response && (
            <>
              {response.text && <Text p={4} >{response.text}</Text>}
              <br />
              {response.image && response.image.map((image, index) => <img height="300px" width="300px" key={index} src={image} />)}
            </>
          )
        }
      </Flex>
    </Box>
  )
}
