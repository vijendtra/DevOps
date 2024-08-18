import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children,
}) => {
    return (
        <Dialog.Root 
            open={isOpen}
            onOpenChange={onChange}
            defaultOpen={isOpen}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur-sm fixed inset-0" />
                <Dialog.Content className="fixed drop-shadow-lg border border-neutral-100 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw]
                    md:max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-lg
                    bg-white p-[25px] focus:outline-none">
                    
                    <Dialog.Title className="text-xl text-center my-4 bg-gray-100 p-2 rounded-lg">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 text-sm 
                        text-neutral-500
                        leading-normal text-center">
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button className="text-neutral-900 hover:text-neutral-500 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center rounded-full
                            text-lg
                            focus:outline-none">
                            x
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;
