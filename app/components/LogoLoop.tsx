"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
} from "react";
import "./LogoLoop.css";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

export type LogoItem =
  | {
      node: ReactNode;
      title?: string;
      href?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
      alt?: string;
      title?: string;
      href?: string;
    };

type LogoLoopDirection = "left" | "right" | "up" | "down";

type LogoLoopProps = {
  logos: readonly LogoItem[];
  speed?: number;
  direction?: LogoLoopDirection;
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

type ElementReference = {
  current: Element | null;
};

type LogoLoopStyles = CSSProperties & {
  "--logoloop-gap"?: string;
  "--logoloop-logoHeight"?: string;
  "--logoloop-fadeColor"?: string;
};

const toCssLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

function useResizeObserver(
  callback: () => void,
  elements: readonly ElementReference[],
  dependencies: readonly unknown[],
) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((reference) => {
      if (!reference.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(reference.current);
      return observer;
    });

    callback();
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [callback, elements, dependencies]);
}

function useImageLoader(
  sequenceReference: { current: HTMLUListElement | null },
  onLoad: () => void,
  dependencies: readonly unknown[],
) {
  useEffect(() => {
    const images = sequenceReference.current?.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    images.forEach((image) => {
      if (image.complete) {
        handleImageLoad();
      } else {
        image.addEventListener("load", handleImageLoad, { once: true });
        image.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
        image.removeEventListener("error", handleImageLoad);
      });
    };
  }, [onLoad, sequenceReference, dependencies]);
}

function useAnimationLoop(
  targetVelocity: number,
  sequenceWidth: number,
  sequenceHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) {
  const trackReference = useRef<HTMLDivElement>(null);
  const animationFrameReference = useRef<number | null>(null);
  const lastTimestampReference = useRef<number | null>(null);
  const offsetReference = useRef(0);
  const velocityReference = useRef(0);

  useEffect(() => {
    const track = trackReference.current;
    if (!track) return;

    const sequenceSize = isVertical ? sequenceHeight : sequenceWidth;

    if (sequenceSize > 0) {
      offsetReference.current =
        ((offsetReference.current % sequenceSize) + sequenceSize) % sequenceSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetReference.current}px, 0)`
        : `translate3d(${-offsetReference.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampReference.current === null) {
        lastTimestampReference.current = timestamp;
      }

      const deltaTime = Math.max(
        0,
        timestamp - lastTimestampReference.current,
      ) / 1000;
      lastTimestampReference.current = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityReference.current +=
        (target - velocityReference.current) * easingFactor;

      if (sequenceSize > 0) {
        let nextOffset =
          offsetReference.current + velocityReference.current * deltaTime;
        nextOffset = ((nextOffset % sequenceSize) + sequenceSize) % sequenceSize;
        offsetReference.current = nextOffset;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetReference.current}px, 0)`
          : `translate3d(${-offsetReference.current}px, 0, 0)`;
      }

      animationFrameReference.current = requestAnimationFrame(animate);
    };

    animationFrameReference.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameReference.current !== null) {
        cancelAnimationFrame(animationFrameReference.current);
        animationFrameReference.current = null;
      }
      lastTimestampReference.current = null;
    };
  }, [
    targetVelocity,
    sequenceWidth,
    sequenceHeight,
    isHovered,
    hoverSpeed,
    isVertical,
  ]);

  return trackReference;
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerReference = useRef<HTMLDivElement>(null);
  const sequenceReference = useRef<HTMLUListElement>(null);

  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [sequenceHeight, setSequenceHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(
    ANIMATION_CONFIG.MIN_COPIES,
  );
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [direction, isVertical, speed]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerReference.current?.clientWidth ?? 0;
    const sequenceRectangle =
      sequenceReference.current?.getBoundingClientRect();
    const measuredWidth = sequenceRectangle?.width ?? 0;
    const measuredHeight = sequenceRectangle?.height ?? 0;

    if (isVertical) {
      const parentHeight =
        containerReference.current?.parentElement?.clientHeight ?? 0;

      if (containerReference.current && parentHeight > 0) {
        const targetHeight = Math.ceil(parentHeight);
        if (containerReference.current.style.height !== `${targetHeight}px`) {
          containerReference.current.style.height = `${targetHeight}px`;
        }
      }

      if (measuredHeight > 0) {
        const nextHeight = Math.ceil(measuredHeight);
        setSequenceHeight(nextHeight);
        const viewportHeight =
          containerReference.current?.clientHeight || parentHeight || nextHeight;
        const copiesNeeded =
          Math.ceil(viewportHeight / nextHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    } else if (measuredWidth > 0) {
      const nextWidth = Math.ceil(measuredWidth);
      setSequenceWidth(nextWidth);
      const copiesNeeded =
        Math.ceil(containerWidth / nextWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  useResizeObserver(
    updateDimensions,
    [containerReference, sequenceReference],
    [logos, gap, logoHeight, isVertical],
  );
  useImageLoader(sequenceReference, updateDimensions, [
    logos,
    gap,
    logoHeight,
    isVertical,
  ]);
  const trackReference = useAnimationLoop(
    targetVelocity,
    sequenceWidth,
    sequenceHeight,
    isHovered,
    effectiveHoverSpeed,
    isVertical,
  );

  const cssVariables = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor
          ? { "--logoloop-fadeColor": fadeOutColor }
          : undefined),
      }) satisfies LogoLoopStyles,
    [fadeOutColor, gap, logoHeight],
  );

  const rootClassName = useMemo(
    () =>
      [
        "logoloop",
        isVertical ? "logoloop--vertical" : "logoloop--horizontal",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [className, fadeOut, isVertical, scaleOnHover],
  );

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = "node" in item;
      const content = isNodeItem ? (
        <span
          className="logoloop__node"
          aria-hidden={Boolean(item.href && !item.ariaLabel)}
        >
          {item.node}
        </span>
      ) : (
        // React Bits also supports externally supplied image logo items.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const itemAriaLabel = isNodeItem
        ? item.ariaLabel ?? item.title
        : item.alt ?? item.title;
      const itemContent = item.href ? (
        <a
          className="logoloop__link"
          href={item.href}
          aria-label={itemAriaLabel || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li className="logoloop__item" key={key} role="listitem">
          {itemContent}
        </li>
      );
    },
    [renderItem],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? sequenceReference : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`),
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  const containerStyle = useMemo(
    () =>
      ({
        width: isVertical
          ? toCssLength(width) === "100%"
            ? undefined
            : toCssLength(width)
          : toCssLength(width) ?? "100%",
        ...cssVariables,
        ...style,
      }) satisfies LogoLoopStyles,
    [cssVariables, isVertical, style, width],
  );

  return (
    <div
      ref={containerReference}
      className={rootClassName}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackReference}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
