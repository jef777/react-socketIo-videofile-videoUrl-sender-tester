import React, {
    useState,
    createContext,
    SetStateAction,
    ReactNode,
} from 'react'

interface Iframe {
    width: number
    height: number
    dataUrl: string
}

export interface VideoFileProcessType {
    videoFile: File
    setVideoFile: React.Dispatch<SetStateAction<File | any>>
    framesData: Iframe[]
    setFramesData: React.Dispatch<SetStateAction<Iframe[]>>
    duration: number | null
    setDuration: React.Dispatch<SetStateAction<number | null>>
    frames: number
    setFrames: React.Dispatch<SetStateAction<number>>
    frameGenerationStatus: string
    setFrameGenerationStatus: React.Dispatch<SetStateAction<string>>
}

export const videoFileContext = createContext<VideoFileProcessType | any>({})

const VideoFileProcessProvider = ({ children }: ReactNode | any) => {
    const [videoFile, setVideoFile] = useState<any>('')
    const [framesData, setFramesData] = useState<Iframe[]>([])
    const [duration, setDuration] = useState<number | null>(null)
    const [frames, setFrames] = useState<number>(0)
    const [frameGenerationStatus, setFrameGenerationStatus] =
        useState<any>('inactive')

    return (
        <videoFileContext.Provider
            value={{
                framesData,
                setFramesData,
                videoFile,
                setVideoFile,
                duration,
                setDuration,
                frames,
                setFrames,
                frameGenerationStatus,
                setFrameGenerationStatus,
            }}
        >
            {children}
        </videoFileContext.Provider>
    )
}

export default VideoFileProcessProvider
