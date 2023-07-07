'use client';

import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionlabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;

}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit, 
    title,
    body,
    footer,
    actionlabel,
    disabled,
    secondaryAction,
    secondaryLabel
}) => {
    const [showModal, setShowModal,] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        // check if modal is disabled
        if (disabled) {
            return;
        }
    
        setShowModal(false);
        setTimeout(() => {
            onClose();
        },300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onsubmit]);

    const handleSecondaryAction = useCallback(() => {
        // if disabled or seondaryAction non existant
        if (disabled || !secondaryAction){
            return;
        }

        //otherwise execute secondaryAction
        secondaryAction();        
    }, [disabled, secondaryAction]); // dependency array

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
                    justify-center
                    items-center
                    flex
                    overflow-x-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    bg-neutral-800/70
                "
            >
                <div
                    className="
                        relative
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                    "
                >
                {/* CONTENT */}
                <div>
                    
                </div>
                </div>
            </div>        
        </>
    );
}

export default Modal;
