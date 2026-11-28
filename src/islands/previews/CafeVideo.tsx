import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  active: boolean;
}

const BASE = '/projects/rush-hour-cafe/rush-hour-cafe';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Given: a looping recording of the sim that should only run while its project is shown.
// Approach: the switcher passes `active`. While active (and motion is allowed) the video
//   autoplays; switching away pauses it. Under reduced motion it never plays, so only
//   the poster shows. Muted + playsinline keeps autoplay allowed on mobile.
export default function CafeVideo({ active }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!reducedMotion());
  }, []);

  const play = active && motionOk;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (play) {
      // Blocked autoplay just leaves the poster showing.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [play]);

  return (
    <div class="cafevid">
      <video
        ref={ref}
        class="cafevid__video"
        autoplay={play}
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${BASE}-poster.jpg`}
        width={1192}
        height={408}
        aria-label="Recording of Rush Hour Café: two cafés side by side; robots under local rules jam at the kitchen counter while CBS keeps serving."
      >
        <source src={`${BASE}.webm`} type="video/webm" />
        <source src={`${BASE}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
