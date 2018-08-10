const routes = [
  {
    path: '/',
    component: () => import('./../view/index/index.vue'),
  },
  {
    path: '/counter',
    component: () => import('./../view/counter/counter.vue'),
  },
];

export default routes;
