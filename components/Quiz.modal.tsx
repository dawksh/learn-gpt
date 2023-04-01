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
import { chatResponse } from '../utils/openai';


interface Questions {
    question: string,
    answer: string
}

export default function QuizModal({ isOpen, onClose, topic }: { isOpen: boolean, onClose: () => void, topic: string | null }) {

    const [questions, setQuestions] = useState<Array<Questions> | null>(null)
    const [index, setIndex] = useState<number>(0)
    const [reveal, setReveal] = useState<boolean[]>([false, false, false, false, false])

    const fetchQuiz = async () => {
        const textData: any = await chatResponse(`generate 5 basic question answers on ${prompt} in JSON format with an array of question and answer objects.`)
        setQuestions(JSON.parse(textData).questions)
    }

    useEffect(() => {
        if (topic) {
            fetchQuiz()
        }
    }, [topic])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {index} / 5
                    {questions && (
                        <div key={index}>
                            <b>{questions[index].question}</b>
                            {reveal[index] ? (<p>{questions[index].answer}</p>) : (<Button m={4} rounded="none" variant="outline" border="4px" onClick={() => {
                                const arr = reveal;
                                arr[index] = !arr[index];
                                setReveal(arr)
                            }}>Reveal answer</Button>)}
                        </div>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' border="4px" rounded="none" variant="solid" disabled={true} onClick={() => {
                        setIndex(index - 1)
                    }}>
                        &lt;
                    </Button>
                    <Button colorScheme='blue' border="4px" rounded="none" variant="solid" disabled={index == 4} onClick={() => setIndex(index + 1)}>
                        &gt;
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}