
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import React from 'react';
import Home from './pages/Home';
import Detail from './pages/Detail';

const rootRoute = createRootRoute({
  component: () => <div><Outlet /></div>,
});

const homeRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: Home,
});

const detailRoute = createRoute({
  path: '/character/$id',
  getParentRoute: () => rootRoute,
  component: Detail,
});

const routeTree = rootRoute.addChildren([homeRoute, detailRoute]);
const router = createRouter({ routeTree });

export default router;
