import React from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const NewHomePage = () => {
  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article>
          <header role="banner" className="bg-gray-100 h-40">
            <p>Fun, eye-catching shapes!</p>
          </header>

          <section className="bg-gray-200 h-40">
            <p>Campaigns section!</p>
          </section>

          <article className="bg-gray-600 h-20">
            <p>Impressive impact numbers!</p>
          </article>

          <section className="bg-gray-300 h-40">
            <p>Articles section!</p>
          </section>

          <section className="bg-gray-200 h-40">
            <p>Sponsors!</p>
          </section>

          <article className="bg-gray-600 h-20">
            <p>Join the youth call to action!</p>
          </article>
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

export default NewHomePage;
