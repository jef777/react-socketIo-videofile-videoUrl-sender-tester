import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import ProgressChart from '../progressCharts/ProgressChart'

import {
    videoFileContext,
    VideoFileProcessType,
} from '../contexts/VideoFileProcessContext'

const VideoFileProcess: React.FC = () => {
    const {
        videoFile,
        setVideoFile,
        framesData,
        setFramesData,
        duration,
        setDuration,
        frames,
        setFrames,
        setFrameGenerationStatus,
    } = useContext<VideoFileProcessType>(videoFileContext)

    const videoRef = useRef<HTMLVideoElement>(null)
    const prog_chart: any = useRef(null)
    const inputVideoFile: any = useRef(null)

    useEffect(() => {
        if (framesData) {
            let prog = (framesData.length / frames) * 100
            prog_chart.current.handleProgressUpdate(prog)
        }
    }, [framesData])

    const handleFileSelect = async () => {
        const file = videoFile
        if (!file) return

        const video: any = videoRef.current

        // Set up a video element to play the selected file
        video.src = URL.createObjectURL(file)

        // Wait for the video metadata to load
        await videoLoaded(video)
    }

    const videoLoaded = async (video: HTMLVideoElement | any) => {
        await video.play()
        const canvas: any = new OffscreenCanvas(
            video.videoWidth,
            video.videoHeight
        )
        const context: any = canvas.getContext('2d')

        // Get the fps, duration, and number of frames
        const fps = video.captureFrameRate || 30
        const duration = video.duration
        const frames = Math.floor(duration * fps)

        setDuration(duration)
        setFrames(frames)

        const framesDataInProgress: any = []

        setFrameGenerationStatus('active')
        for (let i = 0; i < frames; i++) {
            video.currentTime = i / fps
            await new Promise((resolve) => requestAnimationFrame(resolve))

            // Clear the canvas before drawing the next frame
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(video, 0, 0, canvas.width, canvas.height)

            const blob: any = await new Promise((resolve) => {
                canvas
                    .convertToBlob({ type: 'image/jpeg' })
                    .then((blob: any) => {
                        resolve(blob)
                    })
            })

            const dataUrl = URL.createObjectURL(blob)

            framesDataInProgress.push({
                dataUrl,
                width: canvas.width,
                height: canvas.height,
            })
            // update state with the newly generated frame thumbnail
            setFramesData([...framesDataInProgress])
        }

        setFrameGenerationStatus('inactive')
        setFramesData(framesDataInProgress)
    }

    return (
        <div className="flex w-full justify-between py-2">
            <div className="mr-4 self-center ">
                <ProgressChart
                    ref={prog_chart}
                    backgroundColor="bg-cyan-50"
                    color="blue"
                />
            </div>
            <div className=" flex flex-col justify-around gap-4">
                <div className=" px-4 text-blueD3">
                    {<p>Duration: {duration ? duration : '--'}</p>}
                    {<p>Frames: {frames ? frames : '--'}</p>}
                </div>
                <div className=" px-4 text-blueD3">
                    <h2 className="text-md font-bold">Select Video file</h2>

                    <input
                        ref={inputVideoFile}
                        className="block w-3/4 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                        id="video_file"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0])}
                    />
                </div>
                <div className="flex gap-2 px-4">
                    <a
                        className=" cursor-pointer rounded bg-blue-500 py-2 px-3 text-xs font-semibold text-white hover:bg-blue-700 sm:flex"
                        onClick={() => handleFileSelect()}
                    >
                        Start process
                    </a>
                </div>
            </div>
            <video ref={videoRef} style={{ display: 'none' }} />
        </div>
    )
}

export default VideoFileProcess
