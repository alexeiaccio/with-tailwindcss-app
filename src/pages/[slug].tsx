import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Nav from '../components/nav';
import { useLocalJsonForm } from 'next-tinacms-json';
import fs from 'fs';
import path from 'path';

const Page: React.FC<{ page: any }> = ({ page }) => {
  const [pageData] = useLocalJsonForm(page, {
    label: 'Page',
    fields: [
      {
        name: 'rawJson.title',
        label: 'Post Title',
        component: 'text',
      },
    ],
  });

  return (
    <div>
      <Nav />
      <div className="hero justify-center items-center flex overflow-hidden">
        <h1 className="title font-bold font-mono tracking-tighter whitespace-no-wrap select-none">
          {pageData.title}
          Poop
        </h1>
      </div>
    </div>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const dataDirectory = path.join(process.cwd(), 'data');
  const filenames = fs.readdirSync(dataDirectory);

  // Get the paths we want to pre-render based on posts
  const paths = filenames.map((path: string) => ({
    params: { slug: path.replace('.json', '') },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, `${slug}.json`);
    const content = fs.readFileSync(filePath, 'utf8');

    return {
      props: {
        page: {
          fileRelativePath: `/data/${slug}.json`,
          data: content,
        },
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default Page;
