import { createRouter, createWebHashHistory } from 'vue-router'
import { createGuards } from './permission'

// const routes2 = [
//   {
//     path: '',
//     component: () => import('@/components/Layout'),
//     redirect: '/overview',
//     children: [
//       {
//         path: '/overview',
//         component: () => import('@/views/Overview'),
//         redirect: '/overview/idex',
//         children: [
//           { path: 'idex', component: () => import('@/views/Overview/Idex') },
//           { path: 'logic', component: () => import('@/views/Overview/Logic') },
//           { path: 'patrol', component: () => import('@/views/Overview/Patrol') },
//           { path: 'smart', component: () => import('@/views/Overview/Smart') },
//           { path: 'law', component: () => import('@/views/Overview/Law') }
//         ]
//       },
//       {
//         path: '/grid',
//         component: () => import('@/views/Grid'),
//         redirect: '/grid/idex',
//         children: [
//           {
//             path: 'idex',
//             component: () => import('@/views/Grid/Idex'),
//             redirect: '/grid/idex/data',
//             children: [{ path: 'data', component: () => import('@/views/Grid/Idex/Data') }]
//           }
//         ]
//       },
//       { path: '/objects', component: () => import('@/views/Objects') },
//       {
//         path: '/human',
//         component: () => import('@/views/Human'),
//         redirect: '/human/grider',
//         children: [
//           {
//             path: 'grider',
//             component: () => import('@/views/Human/Grider'),
//             redirect: '/human/grider/idex',
//             children: [
//               { path: 'idex', component: () => import('@/views/Human/Grider/Idex') },
//               { path: 'user', component: () => import('@/views/Human/Grider/User') },
//               { path: 'callVideo', component: () => import('@/views/Human/Grider/CallVideo') },
//               { path: 'callVoice', component: () => import('@/views/Human/Grider/CallVoice') }
//             ]
//           },
//           {
//             path: 'media',
//             component: () => import('@/views/Human/Media'),
//             redirect: '/human/media/idex',
//             children: [
//               { path: 'idex', component: () => import('@/views/Human/Media/Idex') },
//               { path: 'monitor', component: () => import('@/views/Human/Media/Monitor') },
//               { path: 'incidents', component: () => import('@/views/Human/Media/Incidents') },
//               { path: 'incident', component: () => import('@/views/Human/Media/Incident') }
//             ]
//           },
//           { path: 'uav', component: () => import('@/views/Human/UAV') }
//         ]
//       },
//       {
//         path: '/thing',
//         component: () => import('@/views/Thing'),
//         redirect: '/thing/ai',
//         children: [
//           { path: 'report', component: () => import('@/views/Thing/Report') },
//           { path: 'cate', component: () => import('@/views/Thing/Cate') },
//           {
//             path: '/thing/ai',
//             component: () => import('@/views/Thing/AI'),
//             redirect: '/thing/ai/aiDetail',
//             children: [
//               { path: 'aiDetail', component: () => import('@/views/Thing/AI/AIDetail') },
//               { path: 'aiEvent', component: () => import('@/views/Thing/AI/AIEvent') },
//               { path: 'inClient', component: () => import('@/views/Thing/AI/inClient') },
//             ]
//           }
//         ]
//       }
//     ]
//   }
//   // { path: "/login", component: () => import("@/views/Login") },
// ]

const routes = [
  {
    path: '',
    component: () => import('@/components/Layout'),
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        component: () => import('@/views/Overview'),
        redirect: '/overview/idex',
        children: [
          { path: 'idex', component: () => import('@/views/Overview/Idex') },
          { path: 'logic', component: () => import('@/views/Overview/Logic') },
          { path: 'patrol', component: () => import('@/views/Overview/Patrol') },
          { path: 'smart', component: () => import('@/views/Overview/Smart') },
          { path: 'law', component: () => import('@/views/Overview/Law') }
        ]
      },
      {
        path: '/human',
        component: () => import('@/views/Human'),
        redirect: '/human/grider',
        children: [
          {
            path: 'grider',
            component: () => import('@/views/Human/Grider'),
            redirect: '/human/grider/idex',
            children: [
              {
                path: 'idex',
                component: () => import('@/views/Human/Grider/Idex'),
                redirect: '/human/grider/idex/info',
                children: [
                  { path: "info", component: () => import('@/views/Human/Grider/Idex/Info') },
                  { path: "call", component: () => import('@/views/Human/Grider/Idex/Call') }
                ]
              },
              { path: 'media', component: () => import('@/views/Human/Grider/Media') },
              { path: 'uav', component: () => import('@/views/Human/Grider/UAV') },
            ]
          },
        ]
      },
      { path: '/objects', component: () => import('@/views/Objects') },
      {
        path: '/thing',
        component: () => import('@/views/Thing'),
        redirect: '/thing/ai',
        children: [
          {
            path: '/thing/ai',
            component: () => import('@/views/Thing/AI'),
            redirect: '/thing/ai/idex',
            children: [
              {
                path: "/thing/ai/idex",
                component: () => import('@/views/Thing/AI/Idex'),
              },
              {
                path: "/thing/ai/idex/incidents",
                component: () => import('@/views/Thing/AI/Incidents')
              }
            ]
          },
        ]
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes]
})

export const setup = (app) => {
  app.use(router)
  createGuards(router)
}

export default router
