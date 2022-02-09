import { useRef } from 'react';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

interface AlertProps {
    message: string,
    open: boolean,
    onModalClose: () => void
}

function Alert({ message, open, onModalClose }: AlertProps) {

    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <div>
            <AlertDialog
                isOpen={ open }
                leastDestructiveRef={cancelRef}
                onClose={ onModalClose }
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogBody>
                        { message }
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={ onModalClose }>
                        Close
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    )
}

export default Alert
