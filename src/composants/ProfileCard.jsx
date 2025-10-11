import { useEffect, useRef, useCallback, useMemo } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20
};

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
const easeInOutCubic = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const ProfileCard = ({
  avatarUrl = '/placeholder-avatar.jpg',
  name = 'Coach Name',
  title = 'Spécialité',
  handle = 'username',
  status = 'Disponible',
  contactText = 'Réserver',
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
        '--card-opacity': '1'
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = currentTime => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    event => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, wrap);
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add('card-active');
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    event => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove('card-active');
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY, card, wrap);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [enableTilt, animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const handleContactClickInternal = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div 
      ref={wrapRef} 
      className="relative w-full max-w-sm mx-auto flex items-center justify-center"
      style={{ 
        perspective: '500px',
        '--pointer-x': '50%',
        '--pointer-y': '50%',
        '--pointer-from-center': '0',
        '--pointer-from-top': '0.5',
        '--pointer-from-left': '0.5',
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
        '--card-opacity': '0'
      }}
    >
      {/* Effet glow derrière la carte */}
      <div 
        className="absolute inset--10px rounded-30px transition-all duration-500 opacity-0 card-active:opacity-100"
        style={{
          background: `radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), 
            hsla(45, 100%, 70%, var(--card-opacity)) 4%, 
            hsla(45, 80%, 60%, calc(var(--card-opacity) * 0.75)) 10%, 
            hsla(45, 60%, 50%, calc(var(--card-opacity) * 0.5)) 50%, 
            hsla(45, 0%, 40%, 0) 100%)`,
          filter: 'blur(40px)',
          transform: 'scale(0.9)'
        }}
      />

      {/* Carte principale */}
      <div
        ref={cardRef}
        className="relative rounded-30px overflow-hidden shadow-2xl transition-transform duration-1000 cursor-pointer"
        style={{
          aspectRatio: '0.718',
          height: '70vh',
          maxHeight: '500px',
          transform: 'translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))',
          background: `
            radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), 
              hsla(45, 100%, 90%, var(--card-opacity)) 4%, 
              hsla(45, 80%, 80%, calc(var(--card-opacity) * 0.75)) 10%, 
              hsla(45, 60%, 70%, calc(var(--card-opacity) * 0.5)) 50%, 
              hsla(45, 0%, 60%, 0) 100%),
            linear-gradient(145deg, rgba(0, 0, 0, 0.95), rgba(26, 26, 26, 0.9)),
            linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)
          `,
          boxShadow: `rgba(0, 0, 0, 0.8) 
            calc((var(--pointer-from-left) * 10px) - 3px) 
            calc((var(--pointer-from-top) * 20px) - 6px) 
            20px -5px`
        }}
      >
        {/* Effet brillant au survol */}
        <div 
          className="absolute inset-0 opacity-0 card-active:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(
              farthest-corner circle at var(--pointer-x) var(--pointer-y),
              rgba(210, 168, 19, 0.3) 0%,
              rgba(210, 168, 19, 0.1) 50%,
              transparent 100%
            )`
          }}
        />

        {/* Contenu de la carte */}
        <div className="relative w-full h-full flex flex-col">
          
          {/* Image avatar */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="absolute w-full h-full object-cover object-top"
              style={{
                opacity: `calc(1.5 - var(--pointer-from-center))`,
                transform: `scale(calc(1 + var(--pointer-from-center) * 0.1))`
              }}
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder-avatar.jpg';
              }}
            />
            
            {/* Dégradé en bas */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.9) 90%, rgba(0, 0, 0, 1) 100%)'
              }}
            />
          </div>

          {/* Info utilisateur en bas */}
          {showUserInfo && (
            <div className="absolute bottom-20px left-20px right-20px z-10 flex items-center justify-between bg-white/10 backdrop-blur-30px border border-white/10 rounded-15px p-12px pointer-events-auto">
              <div className="flex items-center gap-12px">
                <div className="w-48px h-48px rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                  <img
                    src={avatarUrl}
                    alt={`${name} mini`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-6px">
                  <div className="text-14px font-500 text-white/90 leading-none">
                    @{handle}
                  </div>
                  <div className="text-14px text-white/70 leading-none">
                    {status}
                  </div>
                </div>
              </div>
              <button
                onClick={handleContactClickInternal}
                className="border border-white/10 rounded-8px px-16px py-8px text-14px font-600 text-white/90 cursor-pointer transition-all duration-200 hover:border-white/40 hover:transform hover:translateY--1px bg-transparent"
                type="button"
              >
                {contactText}
              </button>
            </div>
          )}

          {/* Nom et titre en haut de la card */}
          <div 
            className="absolute top-0.5em left-5em right-0 text-center z-5 pointer-events-none px-4 text-shadow-lg " 
            style={{
              transform: `translate3d(
                calc(var(--pointer-from-left) * -6px + 3px),
                calc(var(--pointer-from-top) * -6px + 3px),
                0.1px
              )`
            }}
          >
            <h3 className="text-3xl font-extrabold m-0 text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-400 leading-tight">
              {name}
            </h3>
            <p className="text-xl font-600 m-0 mt--12px text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-yellow-500">
              {title}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;