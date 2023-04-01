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

export default function QuizModal({ isOpen, onClose, questions }: { isOpen: boolean, onClose: () => void, topic: string | null, questions: Array<Questions> | null }) {

    const [index, setIndex] = useState<number>(0)
    const [reveal, setReveal] = useState<boolean[]>([false, false, false, false, false])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {index + 1} / 5
                    {questions && (
                        <div key={index}>
                            <b>{questions[index].question}</b>
                            <br />
                            {reveal[index] ? (<p>{questions[index].answer}</p>) : (<Button m={4} rounded="none" variant="outline" border="4px" onClick={() => {
                                const arr = reveal
                                arr.splice(index, 1, !arr[index])
                                setReveal(arr)
                            }}>Reveal answer</Button>)}
                        </div>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' border="4px" rounded="none" variant="solid" isDisabled={index == 0} onClick={() => {
                        setIndex(index - 1)
                    }}>
                        &lt;
                    </Button>
                    <Button colorScheme='blue' border="4px" rounded="none" variant="solid" isDisabled={index == 4} onClick={() => setIndex(index + 1)}>
                        &gt;
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}