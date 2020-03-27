import Nav from '../components/nav';
export default ({ store }) => {
  return (
    <div>
      <Nav store={store} />
      <div className="hero justify-center items-center flex overflow-hidden">
        <h1 className="title font-bold font-mono tracking-tighter whitespace-no-wrap select-none">
          Next.js + Tailwind CSS
        </h1>
      </div>
    </div>
  );
};
