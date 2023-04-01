import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
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
        <FormControl>
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
        </FormControl>
        {
          response && (
            <>
              {response.text && <p>{response.text}</p>}
              <br />
              {response.image && response.image.map((image, index) => <img key={index} src={image} />)}
            </>
          )
        }
      </Flex>
    </Box>
  )
}
