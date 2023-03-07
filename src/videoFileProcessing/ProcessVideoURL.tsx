import {
    VideoFileProcessType,
    videoFileContext,
} from '../contexts/VideoFileProcessContext'
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { io } from 'socket.io-client'

import ProgressBar from '../progressCharts/progressBar'

const ProcessVideoURL: React.FC = () => {
    const socketIo: any = useRef()
    const [socketConnected, setSocketConnected] = useState(false)
    const socketUrl: any = useRef(null)
    const videoLink: any = useRef(null)

    const [socketConnectionErrorMessage, setSocketConnectionErrorMessage] =
        useState('')

    const handleProcessFrames = () => {
        console.log('framesData', videoLink.current.value)
        socketIo.current.emit('videoUrl', videoLink.current.value)
    }
    const connectToSocket = () => {
        socketIo.current = io(socketUrl.current.value)
        socketIo.current.on('connect', () => {
            setSocketConnected(true)
            setSocketConnectionErrorMessage('')
        })
        socketIo.current.on('close', () => {
            setSocketConnected(false)
        })
        socketIo.current.on('connect_error', (err: any) => {
            // console.log('xsdqcqsxa', err.message);
            setSocketConnectionErrorMessage(err.message)
        })
    }

    useEffect(() => {
        socketUrl.current.value = 'ws://localhost:9013'
    }, [])

    return (
        <div>
            <div className="flex items-start justify-start">
                <h4 className=" w-full  rounded-t-md bg-cyan-100  p-1 px-4 font-bold  text-slate-600 drop-shadow-md">
                    Process Video URL
                </h4>
            </div>
            <div className="flex w-full justify-start  py-2">
                <div className=" flex w-full flex-col  justify-center gap-4 px-4">
                    <div className=" px-4 text-slate-600">
                        <div className="">
                            {socketConnected && (
                                <h1 className={`font-medium `}>
                                    Pipline Status:{' '}
                                    <span className=" font-bold text-green-500">
                                        Connected
                                    </span>
                                </h1>
                            )}

                            {!socketConnected && (
                                <h1 className={`font-medium`}>
                                    WebSocket Status:{' '}
                                    <span className="text-rose-500">
                                        Closed
                                    </span>
                                </h1>
                            )}
                            {!socketConnected && (
                                <>
                                    <input
                                        className="focus:shadow-outline my-2 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                                        ref={socketUrl}
                                        type="text"
                                    />
                                    <button
                                        onClick={connectToSocket}
                                        className=" rounded-md bg-rose-500 px-2 py-1 text-red-50 hover:bg-red-50 hover:text-rose-500"
                                    >
                                        connect socket
                                    </button>
                                </>
                            )}
                        </div>
                        {socketConnectionErrorMessage && (
                            <p>
                                Socket Error:{' '}
                                <span className="px-2 py-1 font-bold text-rose-500">
                                    {socketConnectionErrorMessage}
                                </span>
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2 self-start px-4">
                        <input
                            className=" focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                            ref={videoLink}
                            type="text"
                            placeholder="video link"
                        />
                        <a
                            className="cursor-pointer rounded bg-blue-500 py-2 px-3 text-xs font-semibold text-white hover:bg-blue-700 sm:flex"
                            onClick={() => handleProcessFrames()}
                        >
                            Start
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessVideoURL
