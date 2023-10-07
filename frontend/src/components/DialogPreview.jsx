import { useRef, Fragment, useEffect, useState} from "react";
import ReactPlayer from 'react-player';
//Api backend
import api from '../services/api'

//Tailwind
import { Dialog, Transition } from '@headlessui/react'
//styled
import { Preview } from '../pages/MyCloud/style/mycloud'

import mimeTypes from '../config/mimeTypes'

const DialogPreview = ({open, setOpen, buttons = null, hiddenCancel = false, dataPreview}) => {
    const cancelButtonRef = useRef(null)    

    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
    window.addEventListener('beforeunload', closeModal);

    return () => {
      window.removeEventListener('beforeunload', closeModal);
    };
  }, [setOpen]);

    const closeModal = async () => {
        const clientId = localStorage.getItem('clientId')
        if(mimeTypes.video.indexOf(dataPreview.extension.toLowerCase()) > -1){
            await api.get(`/closepreview?clientId=${clientId}`).then(res => {
                setOpen(false)
            })
        }else{
            setOpen(false)
        }
    }

    function filePreview(extension){
        if(mimeTypes.image.indexOf(extension) > -1 ){
            return <img 
                        src={dataPreview.preview} 
                        alt="Erro na imagem" 
                        className="content-image" 
                        style={{
                            width: "100%", 
                            borderRadius: "8px",
                            background: "f1f1f1"}}
                    />
        }
        
        if(mimeTypes.audio.indexOf(extension) > -1){
            return <div className="content-audio">
                        <audio controls src={dataPreview.preview} />
                    </div>
        }
        
        if(mimeTypes.video.indexOf(extension) > -1){
            return <div className="content-video">
                        {/* <video controls>
                            <source src={dataPreview.preview} />
                        </video> */}
                        {/* <div ref={playerRef}>
                            <video controls>
                                <source src={dataPreview.preview} />
                            </video>
                        </div> */}
                        <ReactPlayer
                            url={dataPreview.preview}
                            controls
                            width="100%"
                            height="auto"
                            playing={isPlaying}
                        />
                    </div>
        }

        if(mimeTypes.document.indexOf(extension) > -1){
            return <embed className="content-document" src={dataPreview.preview} type={`application/${extension}`}/>
        }

        if(extension === 'gif' || mimeTypes.image.indexOf(extension) < 0){
            return <div><p> Formato ainda não suportado para vizualisação. </p></div>
        }
    }

    return (
        <>
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
                                            <div className="flex justify-between items-center">
                                                <Dialog.Title as="h3" className="text-base leading-6 text-gray-900">
                                                    <p>Nome do arquivo</p>
                                                    <b>{dataPreview.name.split('-').shift()}</b>
                                                </Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={closeModal}
                                                    ref={cancelButtonRef}
                                                >
                                                    Fechar
                                                </button>
                                            </div>
                                            <div className="mt-2">
                                                <Preview>
                                                    <div>
                                                        { filePreview(dataPreview.extension.toLowerCase()) }
                                                    </div>
                                                </Preview>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {
                                            buttons !== null &&
                                            buttons.map((button) => (
                                                <button
                                                    type="button"
                                                    className={`${button.bgColor} inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                                                    onClick={button.actionButton}
                                                >
                                                    { button.titleButton }
                                                </button>
                                            ))
                                        }
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default DialogPreview