import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
} from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { chatResponse } from '../utils/openai';


interface Questions {
    question: string,
    answer: string
}

export default function QuizModal({ isOpen, onClose, questions }: { isOpen: boolean, onClose: () => void, topic: string | null, questions: Array<Questions> | null }) {

    const [index, setIndex] = useState<number>(0)
    const [reveal, setReveal] = useState<boolean>(false)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold">Q.{index + 1} / Q.5</Text>
                    {questions && (
                        <div key={index}>
                            <b>{questions[index].question}</b>
                            <br />
                            {reveal ? (<p><br />{questions[index].answer}</p>) : (<Button mt={4} rounded="none" variant="outline" border="4px" onClick={() => {
                                setReveal(true)
                            }}>Reveal answer</Button>)}
                        </div>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' border="4px" rounded="none" variant="solid" isDisabled={index == 0} onClick={() => {
                        setIndex(index - 1)
                        setReveal(false)
                    }}>
                        &lt;
                    </Button>
                    <Button colorScheme='blue' border="4px" rounded="none" variant="solid" isDisabled={index == 4} onClick={() => {
                        setIndex(index + 1)
                        setReveal(false)
                    }}>
                        &gt;
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}