import { useRef, Fragment} from "react";

//Tailwind
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({open, setOpen, title, body, fields = null, buttons = null, hiddenCancel = false}) => {
    const cancelButtonRef = useRef(null)

    return(
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div> */}
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            <b>{ title }</b>
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                { body }
                                            </p>
                                            {
                                                fields !== null &&
                                                fields.map((field, index) => (
                                                    <input 
                                                        key={index}
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        type={field.type}
                                                        autoFocus={field.autoFocus}
                                                        name={field.name}
                                                        onChange={field.onChange}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {[
                                        buttons !== null &&
                                        buttons.map((button, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`${button.bgColor} inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                                                onClick={button.actionButton}
                                            >
                                                { button.titleButton }
                                            </button>
                                        ))
                                    ,
                                        !hiddenCancel &&
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancelar
                                        </button>
                                    ]}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal