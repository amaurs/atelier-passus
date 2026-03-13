import { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

type ImageItem = { type: 'image'; src: string; width: number; height: number; index: number };
type VideoItem = { type: 'video'; vimeoId: string; index: number };
type GalleryItem = ImageItem | VideoItem;

interface Props {
  images: GalleryItem[];
  title: string;
  headers: string[];
  paragraphs: string[];
}

export default function ImageGallery({ images, title, headers, paragraphs }: Props) {
  const [index, setIndex] = useState(0);
  const [vertical, setVertical] = useState(false);
  const hasGallery = images.length > 1;
  const current = images[index];

  const go = useCallback((dir: number) => {
    setIndex(i => Math.max(0, Math.min(images.length - 1, i + dir)));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const handlers = useSwipeable({
    onSwipedLeft: () => go(1),
    onSwipedRight: () => go(-1),
    trackMouse: true,
  });

  return (
    <div {...handlers} className="RenderHelper">
      <div className="RenderHelper-container">
        <div className="RenderHelper-content-wrapper">
          {current.type === 'video' ? (
            <div className="RenderHelper-video">
              <iframe
                src={`https://player.vimeo.com/video/${current.vimeoId}?muted=1&loop=1&autoplay=1`}
                title={title ?? ''}
                width="800"
                height="600"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : (
            <div className={`RenderHelper-content${vertical ? ' vertical' : ''}`}>
              <span
                onClick={() => go(-1)}
                className={`Navigate navleft${index > 0 ? ' decorationleft' : ''}`}
              />
              <span
                onClick={() => go(1)}
                className={`Navigate navright${index < images.length - 1 ? ' decorationright' : ''}`}
              />
              {hasGallery && (
                <button
                  className={`RenderHelper-navigation RenderHelper-left`}
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                >
                  <i className="arrow left" />
                </button>
              )}
              <img
                className="RenderHelper-image"
                alt={title ?? ''}
                src={current.src}
                onLoad={e => {
                  const img = e.target as HTMLImageElement;
                  setVertical(img.naturalWidth < img.naturalHeight);
                }}
              />
              {hasGallery && (
                <button
                  className={`RenderHelper-navigation RenderHelper-right`}
                  aria-label="Next image"
                  onClick={() => go(1)}
                >
                  <i className="arrow right" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="Card">
        {title && <h1 className="Card-title">{title}</h1>}
        {headers.map((h, i) => <h2 key={i} className="Card-subtitle">{h}</h2>)}
        <div className="Card-description">
          {paragraphs.map((p, i) => <p key={i} className="Card-text">{p}</p>)}
        </div>
        {hasGallery && (
          <div className="Shortcut">
            {images.map((_, i) => (
              <button
                key={i}
                className={`Shortcut-thumb${i === index ? ' highlight' : ''}`}
                onClick={() => setIndex(i)}
              >
                <span>{i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
