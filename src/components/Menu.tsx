import { useState } from 'react';

const Lines = () => (
  <svg className="Lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.5 20">
    <rect x="0" y="0" width="5" height="5" transform="translate(0 7.5)" />
    <rect x="12.5" y="0" width="20" height="5" transform="translate(0 7.5)" />
  </svg>
);

const menuItems = [
  { href: '/projects', key: 'projects', label: 'proyectos' },
  { href: '/studio', key: 'studio', label: 'estudio' },
  { href: '/us', key: 'us', label: 'nosotros' },
  { href: '/contact', key: 'contact', label: 'contacto' },
];

interface Props {
  isGallery?: boolean;
  instagramSrc?: string;
}

export default function Menu({ isGallery = false, instagramSrc = '/images/instagram.svg' }: Props) {
  const [active, setActive] = useState(false);
  const toggle = () => setActive(a => !a);
  const close = () => setActive(false);

  return (
    <>
      {/* Controls bar */}
      <div className={'App-controls' + (active ? ' solid-background' : '')}>
        <div className={'Hamburger' + (active ? ' active' : '')} onClick={toggle}>
          <div className="Hamburger-hamburger" />
        </div>
        <div className="Language">
          <button onClick={() => {}}>es</button>
          <span>/</span>
          <button onClick={() => {}}>fr</button>
        </div>
        {!isGallery && !active && (
          <>
            <span className="App-controls-separator">-</span>
            <a className="App-projects" href="/projects">
              <Lines />
              proyectos
            </a>
          </>
        )}
      </div>

      {/* Slide-in menu */}
      <div className={'Menu' + (active ? ' active' : '')}>
        <aside className="Aside">
          {menuItems.map(item => (
            <a key={item.key} className="Menu-item" href={item.href} onClick={close}>
              <Lines />{item.label}
            </a>
          ))}
          <a className="Menu-item" href="https://www.instagram.com/passusatelier/">
            <Lines /><img alt="Instagram" className="Menu-instagram" src={instagramSrc} />
          </a>
        </aside>
        <div className="Footer">
          <a href="/" onClick={close}>
            <svg className="Logo" style={{ position: 'absolute', bottom: '32.5px', left: '32.5px', width: '75px' }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46">
              <polygon className="garments" points="141.73 0 0 0 0 141.73 0 283.46 141.73 283.46 141.73 141.73 283.46 141.73 283.46 0 141.73 0" />
            </svg>
          </a>
        </div>
      </div>

      {/* Cloud overlay */}
      <div className={'App-cloud' + (active ? ' active' : '')} onClick={toggle}> </div>
    </>
  );
}
