import React, { useContext } from 'react'
import { FolderIcon } from '@heroicons/react/20/solid'
import {
    VideoFileProcessType,
    videoFileContext,
} from '../contexts/VideoFileProcessContext'

const Frames = () => {
    const { framesData } = useContext<VideoFileProcessType>(videoFileContext)
    return (
        <div className="flex w-full justify-center gap-3 overflow-x-hidden bg-blueD2 bg-opacity-25 px-12 py-6 delay-300 ease-in-out">
            <div className=" w-full rounded-md bg-cyan-50 ">
                <h4 className=" w-full  rounded-t-md bg-cyan-100 p-1 font-bold text-slate-600 drop-shadow-md">
                    Generated Frames from video file
                </h4>
                <div className=" flex h-[40vh] w-full items-center justify-center">
                    <div className="items my-4 flex h-full w-full flex-wrap justify-center gap-3 overflow-x-hidden overflow-y-scroll">
                        {framesData.length > 0 &&
                            framesData.map((frame, i) => (
                                <img
                                    key={i}
                                    src={frame.dataUrl}
                                    width={200}
                                    height={160}
                                    alt={`Frame ${i}`}
                                />
                            ))}
                    </div>

                    {!framesData.length && (
                        <div className=" flex h-full flex-col self-center justify-self-center text-center text-slate-600 opacity-50">
                            <FolderIcon className=" h-44 w-44 " />
                            <p>No frames</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Frames
