import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const AudioPlayer = ({ src }: { src: string }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (!waveformRef.current) return;
        console.log(duration);

        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#e5e7eb", // Light gray
            progressColor: "#4f46e5", // Indigo-500
            barWidth: 4,
            height: "auto",
            normalize: true,
            cursorWidth: 1,
            cursorColor: "#4f46e5",
        });

        wavesurfer.current.load(src);

        wavesurfer.current.on("ready", () => {
            setDuration(formatTime(wavesurfer.current?.getDuration() || 0));
        });

        wavesurfer.current.on("audioprocess", () => {
            setCurrentTime(formatTime(wavesurfer.current?.getCurrentTime() || 0));
        });
        return () => wavesurfer.current?.destroy();
    }, [src]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };


    useEffect(() => {
        if (wavesurfer.current) {
            wavesurfer.current.setVolume(isMuted ? 0 : 1);
        }
    }, [isMuted])

    useEffect(() => {
        if (wavesurfer.current) {
            if (!isPlaying) wavesurfer.current.pause();
            if (isPlaying) wavesurfer.current.play();
        }
    }, [isPlaying])

    return (
        <div className="w-full py-4 px-10 h-28 bg-gray-100    flex items-center gap-4">
            {/* Play / Pause Button */}
            <button onClick={() => { setIsPlaying((prev) => !prev); }} className="p-2 bg-blue-600 active:animate-ping cursor-pointer  text-white rounded-full shadow-lg">
                {isPlaying ? <Pause size={30} /> : <Play size={30} />}
            </button>

            {/* Current Time */}
            <span className="text-sm text-gray-700">{currentTime}</span>

            {/* Waveform */}
            <div ref={waveformRef} className="w-full h-full "></div>

            {/* Mute / Unmute Button */}
            <button onClick={() => { setIsMuted(!isMuted) }} className="text-gray-700">
                {isMuted ? <VolumeX size={30} /> : <Volume2 size={30} />}
            </button>

        </div >
    );
};

export default AudioPlayer;
