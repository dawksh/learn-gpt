import { Box, Button, Text } from "@chakra-ui/react";


export default function QuizBody({ question, answer, reveal, revealIndex }: { question: string, answer: string, reveal: boolean, revealIndex: () => void }) {
    return (
        <Box>
            <Text>{question}</Text>
            {reveal ? (<Text>{answer}</Text>) : (<Button rounded="0" margin="4px">Reveal Answer</Button>)}
        </Box>
    )
}