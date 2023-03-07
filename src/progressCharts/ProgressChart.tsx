import { useImperativeHandle, forwardRef, useState } from 'react'

function ProgressChart(
    { color, backgroundColor }: { color: string; backgroundColor: string },
    ref: any
) {
    const circumference = 50 * 2 * Math.PI

    const [percent, setPercent] = useState(0)

    useImperativeHandle(
        ref,
        () => ({
            handleProgressUpdate(prog = 0) {
                let progress = Math.round(prog ? prog : 0)
                setPercent(progress)
            },
        }),
        []
    )

    return (
        <>
            <div
                className={`${
                    backgroundColor ? backgroundColor : 'bg-white'
                } flex items-center justify-center overflow-hidden rounded-full `}
            >
                <svg
                    className="h-32 w-32 translate-x-1 translate-y-1 transform drop-shadow-md"
                    aria-hidden="true"
                >
                    <circle
                        className="text-gray-300"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="50"
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className={`text-${color}-600`}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={
                            circumference - (percent / 100) * circumference
                        }
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="50"
                        cx="60"
                        cy="60"
                    />
                </svg>
                <span className="absolute text-2xl font-bold text-blue-700 drop-shadow-md">{`${percent}%`}</span>
            </div>
        </>
    )
}

export default forwardRef(ProgressChart)
