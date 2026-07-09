import React from 'react';
import Layout from './Layout';

// Route table consumed by vite-react-ssg (react-router data routes). Each leaf
// uses `lazy` for code-splitting; vite-react-ssg awaits these during static
// generation so every route is pre-rendered to full HTML at build time.
const lazyRoute = (loader) => () => loader().then((m) => ({ Component: m.default }));

export const routes = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.jsx',
    children: [
      { index: true, lazy: lazyRoute(() => import('./pages/Home')) },
      { path: 'services', lazy: lazyRoute(() => import('./pages/Services')) },
      { path: 'about', lazy: lazyRoute(() => import('./pages/About')) },
      { path: 'portfolio', lazy: lazyRoute(() => import('./pages/Portfolio')) },
      { path: 'service-areas', lazy: lazyRoute(() => import('./pages/ServiceAreas')) },
      { path: 'contact', lazy: lazyRoute(() => import('./pages/Contact')) },
      { path: 'services/finish-carpentry', lazy: lazyRoute(() => import('./pages/services/FinishCarpentry')) },
      { path: 'services/general-construction', lazy: lazyRoute(() => import('./pages/services/GeneralConstruction')) },
      { path: 'services/residential-projects', lazy: lazyRoute(() => import('./pages/services/ResidentialProjects')) },
      { path: 'services/home-additions', lazy: lazyRoute(() => import('./pages/services/HomeAdditions')) },
      { path: 'services/custom-woodwork', lazy: lazyRoute(() => import('./pages/services/CustomWoodwork')) },
      { path: 'services/complete-remodeling', lazy: lazyRoute(() => import('./pages/services/CompleteRemodeling')) },
      // Emitted as dist/404.html (Vercel serves it with a real 404 status).
      { path: '404', lazy: lazyRoute(() => import('./pages/NotFound')) },
      // Client-side catch-all so bad in-app navigation renders the 404 page.
      { path: '*', lazy: lazyRoute(() => import('./pages/NotFound')) },
    ],
  },
];

export default routes;
