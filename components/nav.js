import Link from 'next/link';
import { observer } from 'mobx-react-lite';
const randomId = () => Math.floor(Math.random() * 1000).toString(36);

const links = [
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
];

export default observer(function Nav({ store }) {
  if (typeof window !== 'undefined') {
    import('reactotron-react-js').then(({ default: Reactotron }) => {
      Reactotron.log(store.toJSON());
    });
  }

  React.useEffect(() => {
    store.addTodo(randomId(), 'New Task');
  }, []);

  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline">Home</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`} className="ml-4">
              <a href={href} className="btn-blue no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
});
