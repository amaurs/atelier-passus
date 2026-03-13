import { useState } from 'react';

const Lines = () => (
  <svg className="Lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.5 20">
    <rect x="0" y="0" width="5" height="5" transform="translate(0 7.5)" />
    <rect x="12.5" y="0" width="20" height="5" transform="translate(0 7.5)" />
  </svg>
);

const menuLabels: Record<string, Record<string, string>> = {
  es: { projects: 'proyectos', studio: 'estudio', us: 'nosotros', contact: 'contacto' },
  fr: { projects: 'projets', studio: 'studio', us: 'nous', contact: 'contact' },
};

interface Props {
  isGallery?: boolean;
  locale?: string;
  currentPath?: string;
  instagramSrc?: string;
}

export default function Menu({ isGallery = false, locale = 'es', currentPath = '', instagramSrc = '/images/instagram.svg' }: Props) {
  const [active, setActive] = useState(false);
  const toggle = () => setActive(a => !a);
  const close = () => setActive(false);

  const prefix = locale === 'fr' ? '/fr' : '';
  const labels = menuLabels[locale] || menuLabels.es;

  // Build the equivalent path in the other locale
  const cleanPath = currentPath.replace(/^\/(fr)/, '').replace(/^\/+/, '/') || '/';
  const esPath = cleanPath;
  const frPath = `/fr${cleanPath === '/' ? '' : cleanPath}`;

  const items = [
    { href: `${prefix}/projects`, label: labels.projects },
    { href: `${prefix}/studio`, label: labels.studio },
    { href: `${prefix}/us`, label: labels.us },
    { href: `${prefix}/contact`, label: labels.contact },
  ];

  return (
    <>
      <div className={'App-controls' + (active ? ' solid-background' : '')}>
        <div className={'Hamburger' + (active ? ' active' : '')} onClick={toggle}>
          <div className="Hamburger-hamburger" />
        </div>
        <div className="Language">
          <a href={esPath} className={locale === 'es' ? 'active' : ''}>es</a>
          <span>/</span>
          <a href={frPath} className={locale === 'fr' ? 'active' : ''}>fr</a>
        </div>
        {!isGallery && !active && (
          <>
            <span className="App-controls-separator">-</span>
            <a className="App-projects" href={`${prefix}/projects`}>
              <Lines />
              {labels.projects}
            </a>
          </>
        )}
      </div>

      <div className={'Menu' + (active ? ' active' : '')}>
        <aside className="Aside">
          {items.map(item => (
            <a key={item.href} className="Menu-item" href={item.href} onClick={close}>
              <Lines />{item.label}
            </a>
          ))}
          <a className="Menu-item" href="https://www.instagram.com/passusatelier/">
            <Lines /><img alt="Instagram" className="Menu-instagram" src={instagramSrc} />
          </a>
        </aside>
        <div className="Footer">
          <a href={prefix || '/'} onClick={close}>
            <svg className="Logo" style={{ position: 'absolute', bottom: '32.5px', left: '32.5px', width: '75px' }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46">
              <polygon className="garments" points="141.73 0 0 0 0 141.73 0 283.46 141.73 283.46 141.73 141.73 283.46 141.73 283.46 0 141.73 0" />
            </svg>
          </a>
        </div>
      </div>

      <div className={'App-cloud' + (active ? ' active' : '')} onClick={toggle}> </div>
    </>
  );
}
