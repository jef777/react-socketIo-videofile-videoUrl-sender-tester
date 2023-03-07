import { useEffect, useRef, useState } from 'react'
import './App.css'

import { io, Manager } from 'socket.io-client'

function App() {
    const [socketConnected, setSocketConnected] = useState(false)
    const [socketConnectionErrorMessage, setSocketConnectionErrorMessage] =
        useState('')

    const socketIo: any = useRef()
    const socketUrl: any = useRef(null)

    const connectToSocket = () => {
        socketIo.current = io(socketUrl.current.value)
        socketIo.current.on('connect', () => {
            setSocketConnected(true)
            setSocketConnectionErrorMessage('')
        })
        socketIo.current.on('close', () => {
            console.log('xsdqcqsxa')

            setSocketConnected(false)
        })
        socketIo.current.on('connect_error', (err: any) => {
            // console.log('xsdqcqsxa', err.message);
            setSocketConnectionErrorMessage(err.message)
        })
    }

    const handleSendFrames = () => {
        socketIo.current.emit('message', new Date().getTime())
    }
    const handleDisconnectSocket = () => {
        socketIo.current.disconnect()
    }

    return (
        <div className="App">
            <p>
                Connection status{' '}
                {socketConnected ? 'connected' : 'disconnected'}
            </p>
            {socketConnectionErrorMessage && (
                <p>Error status {socketConnectionErrorMessage}</p>
            )}

            <button type="button" onClick={handleSendFrames}>
                send Frames
            </button>
            <input ref={socketUrl} value="ws://localhost:9013" type="text" />
            <button type="button" onClick={connectToSocket}>
                Connect socket
            </button>
            <button type="button" onClick={handleDisconnectSocket}>
                Disconnect socket
            </button>
        </div>
    )
}

export default App
