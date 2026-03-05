import { useEffect } from 'react';

export function useFullscreen(isQuizActive, onExit, onTerminate) {
    useEffect(() => {
        let exitCount = 0;

        const handleFullscreenChange = () => {
            if (!isQuizActive) return;

            const isFullscreen = !!(
                document.fullscreenElement ||
                document.webkitIsFullScreen ||
                document.mozFullScreen ||
                document.msFullscreenElement
            );

            if (!isFullscreen) {
                exitCount++;
                if (exitCount === 1) {
                    onExit(); // First strike
                } else if (exitCount >= 2) {
                    onTerminate(); // Second strike
                }
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        // Try to prevent F11
        const handleKeyDown = (e) => {
            if (isQuizActive && e.key === 'F11') {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isQuizActive, onExit, onTerminate]);

    const requestFullscreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            return element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            return element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            return element.msRequestFullscreen();
        }
        return Promise.reject(new Error("Fullscreen API is not supported."));
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
    };

    return { requestFullscreen, exitFullscreen };
}
