import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Weekly Topics</>,
    linkUrl: 'docs/topics',
    description: (
      <>
        A chronological path through the topics covered in the course.
      </>
    ),
  },
  {
    title: <>Course Info and Policies</>,
    linkUrl: 'docs/policies',
    description: (
      <>
        Standard course-syllabus information.
      </>
    ),
  },
  {
    title: <>Blog</>,
    linkUrl: 'blog',
    description: (
      <>
        Daily readings and assignments.
      </>
    ),
  },
];

function Feature({linkUrl, title, description}) {
  const toUrl = useBaseUrl(linkUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <div className="text--center">
        <div className={styles.buttons}>
          <Link
            className={classnames(
              'button button--outline button--secondary button--lg',
              styles.getStarted,
            )}
            to={useBaseUrl(linkUrl)}>
            <h3>{title}</h3>
          </Link>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container"><img
              alt="Smart Fox with Book"
              className={styles.heroLogo}
              src={useBaseUrl('img/SmartFoxLogoSmall.png')}
            />
          <h1 className="hero__title">{siteConfig.title}
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/topics')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
