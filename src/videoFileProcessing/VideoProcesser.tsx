import React, { useContext } from 'react'
import VideoFileProcessContext from '../contexts/VideoFileProcessContext'
import VideoFileProcess from './GenerateFrames'
import ProcessFrames from './ProcessFrames'
import GenerateFrames from './GenerateFrames'
import Frames from './Frames'
import ProcessVideoURL from './ProcessVideoURL'

export const VideoProcesser = () => {
    // const videoFileContext = useContext(VideoFileProcessContext)
    return (
        <>
            <VideoFileProcessContext>
                <div className="w-full">
                    <div className="mb-4 flex w-full justify-between gap-5 px-6">
                        <div className="flex  flex-col items-end   py-2"></div>
                    </div>

                    <div>
                        <h1
                            className={`text-center text-xl font-bold text-slate-600`}
                        >
                            Video file processing
                        </h1>
                    </div>

                    <div className="flex w-full  items-start justify-center gap-8 overflow-x-hidden bg-blueD2 bg-opacity-25 py-6 delay-300 ease-in-out">
                        <div className=" rounded-md bg-cyan-50">
                            <h4 className=" w-full  rounded-t-md bg-cyan-100 p-1 font-bold text-slate-600 drop-shadow-md">
                                Generate frames
                            </h4>
                            <div className="flex gap-4">
                                <div className="">
                                    <GenerateFrames />
                                    <ProcessFrames />
                                </div>
                            </div>
                        </div>
                        <div className=" rounded-md bg-cyan-50">
                            <ProcessVideoURL />
                        </div>
                    </div>
                    <Frames />
                </div>
            </VideoFileProcessContext>
        </>
    )
}

export default VideoProcesser
