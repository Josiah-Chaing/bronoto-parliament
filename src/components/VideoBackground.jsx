import { useEffect, useRef, useCallback } from 'react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4';
const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function VideoBackground() {
  const videoRef = useRef(null);
  const animRef = useRef(null);
  const fadingOutRef = useRef(false);

  const cancelAnim = useCallback(() => {
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null; }
  }, []);

  const fadeTo = useCallback((target, duration = 250) => {
    cancelAnim();
    const video = videoRef.current;
    if (!video) return;
    const start = performance.now();
    const from = parseFloat(video.style.opacity || '1');
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      video.style.opacity = String(from + (target - from) * p);
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, [cancelAnim]);

  useEffect(() => {
    if (prefersReduced) return;
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '1';

    const onTime = () => {
      if (!video.duration || video.duration - video.currentTime > 0.55 || fadingOutRef.current) return;
      fadingOutRef.current = true;
      fadeTo(0);
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeTo(1);
        fadingOutRef.current = false;
      }, 100);
    };

    // Fallback: if video fails to load, just show the dark background
    const onError = () => { if (video) video.style.display = 'none'; };

    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnded);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('error', onError);
      cancelAnim();
    };
  }, [fadeTo, cancelAnim]);

  return (
    <div className="video-bg">
      <video ref={videoRef} autoPlay muted loop={false} playsInline preload="metadata" disableRemotePlayback>
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  );
}
