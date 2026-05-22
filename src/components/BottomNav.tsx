import { navigate } from '../App';

interface Props {
  current: string;
}

const items = [
  { id: 'accueil', label: 'Accueil', path: '/accueil' },
  { id: 'catalogue', label: 'Catalogue', path: '/catalogue' },
  { id: 'progression', label: 'Progrès', path: '/progression' },
  { id: 'reglages', label: 'Réglages', path: '/reglages' }
];

export default function BottomNav({ current }: Props) {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {items.map((item) => (
        <button
          key={item.id}
          className={current === item.id ? 'active' : ''}
          onClick={() => navigate(item.path)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
