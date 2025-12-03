
export default {
  basePath: 'https://github.com/sumit8199/hostel-Dashboard',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
