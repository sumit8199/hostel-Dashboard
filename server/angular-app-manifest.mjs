
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://github.com/sumit8199/hostel-Dashboard',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/sumit8199/hostel-Dashboard/users",
    "route": "/sumit8199/hostel-Dashboard"
  },
  {
    "renderMode": 2,
    "route": "/sumit8199/hostel-Dashboard/users"
  },
  {
    "renderMode": 2,
    "route": "/sumit8199/hostel-Dashboard/details"
  },
  {
    "renderMode": 2,
    "route": "/sumit8199/hostel-Dashboard/edit-form"
  },
  {
    "renderMode": 2,
    "redirectTo": "/sumit8199/hostel-Dashboard/users",
    "route": "/sumit8199/hostel-Dashboard/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7737, hash: '625dc072f67da0cca683c351bf5001a113d6ce12f66c746a2cc69f935d0525ab', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7851, hash: '0aa9b209750355deb72d0e177cdbf0e06474f35c54e469f6b23e5bdc4706895e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'edit-form/index.html': {size: 32388, hash: '2dbc7431640a14235e3594133182bf72d871cccc326f3aeed4c6acc87605c8f5', text: () => import('./assets-chunks/edit-form_index_html.mjs').then(m => m.default)},
    'details/index.html': {size: 28746, hash: '8d3500a58502e439a5d52a95cc072ae52dce3e7138c0de00ce8de9e1176ce1c5', text: () => import('./assets-chunks/details_index_html.mjs').then(m => m.default)},
    'users/index.html': {size: 37104, hash: 'bdbd8b27777ef1e732202411aac1df592e08220f59f447c2a6a32a4e331b382e', text: () => import('./assets-chunks/users_index_html.mjs').then(m => m.default)},
    'styles-J7XKSZSV.css': {size: 324, hash: 'uvCd+9yhRrc', text: () => import('./assets-chunks/styles-J7XKSZSV_css.mjs').then(m => m.default)}
  },
};
