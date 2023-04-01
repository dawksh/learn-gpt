import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from 'react';


interface Questions {
    question: string,
    answer: string
}

export default function QuizModal({ isOpen, onClose, topic }: { isOpen: boolean, onClose: () => void, topic: string }) {

    const [questions, setQuestions] = useState<Array<Questions> | null>(null)

    const fetchQuiz = async () => {
        const { data } = await axios.post('/api/quiz', { prompt: topic })
        setQuestions(data.questions)
    }
    useEffect(() => {
        if (topic) {
            fetchQuiz()
        }
    }, [])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {questions && questions.map((question: Questions, index: number) => {
                        return (
                            <div key={index}>
                                <b>{question.question}</b>
                                <p>{question.answer}</p>
                            </div>
                        )
                    })}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}