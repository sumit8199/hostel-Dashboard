
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: './',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/users",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/users"
  },
  {
    "renderMode": 2,
    "route": "/details"
  },
  {
    "renderMode": 2,
    "route": "/edit-form"
  },
  {
    "renderMode": 2,
    "redirectTo": "/users",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7694, hash: '244ea3c69b9b16eb18fe396c9dafec583e1c2cc7f95f0348f06a3e9d2b7ab43b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7808, hash: 'bf4826b644989c1459ca09b2fc9bd34ab232b477090ebe3a765e0dba8367e565', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'details/index.html': {size: 28703, hash: 'ec390eadd0500fa08c41a31c3bb72a2f7815bfb12bf7e124513ba1b2385f28a3', text: () => import('./assets-chunks/details_index_html.mjs').then(m => m.default)},
    'edit-form/index.html': {size: 32345, hash: '5319efd90a90e1d9368997a80a494c00228f75c83b61f478f56e9153fd5b440b', text: () => import('./assets-chunks/edit-form_index_html.mjs').then(m => m.default)},
    'users/index.html': {size: 37061, hash: 'e6d9526e0c19cf65b68702f37a1da5d08c32a05979490486381573274afe6c4e', text: () => import('./assets-chunks/users_index_html.mjs').then(m => m.default)},
    'styles-J7XKSZSV.css': {size: 324, hash: 'uvCd+9yhRrc', text: () => import('./assets-chunks/styles-J7XKSZSV_css.mjs').then(m => m.default)}
  },
};
