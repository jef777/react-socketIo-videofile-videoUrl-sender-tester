import React, { useState, useRef, useEffect } from 'react'

const ProgressBar = ({ progress }: { progress: number }) => {
    const [percentage, setPercentage] = useState(progress)
    const progressRef: any = useRef(null)

    useEffect(() => {
        const currentProgress = progressRef.current
        currentProgress.style.width = `${progress}%`
        setPercentage(progress)
    }, [progress])

    return (
        <div className="relative h-4 max-w-xl overflow-hidden rounded-md">
            <div className="absolute h-full w-full bg-gray-200"></div>
            <div
                className="absolute h-full bg-green-500"
                ref={progressRef}
                style={{ width: `${percentage}%` }}
            >
                <div className="absolute inset-0 flex items-center justify-center text-sm text-white">
                    {`${percentage}%`}
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
