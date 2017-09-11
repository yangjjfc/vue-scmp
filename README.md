# scmp

> 基于vue/vue-router/vuex/axios/es6实现的dian供应链平台端,vue-cli脚手架




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 目录结构
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  .project
│  index.html
│  npm-debug.log
│  package.json
│  README.md
│
├─.vscode
│      settings.json
│
├─build
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─assets
│  │  ├─directive
│  │  │      boxer.js
│  │  │      waves.css
│  │  │      waves.js
│  │  │
│  │  ├─images
│  │  │      3.png
│  │  │      cancel.png
│  │  │      deliverys2.png
│  │  │      jquery.fs.boxer-icons
│  │  │      jquery.fs.boxer-loadi
│  │  │      jquery.fs.boxer-loadi
│  │  │      noimage.png
│  │  │      pdf.png
│  │  │      scm_logo.png
│  │  │      tips_info.png
│  │  │      zhu.png
│  │  │
│  │  └─js
│  │      ├─aes
│  │      │      aes-min.min.js
│  │      │
│  │      ├─boxer
│  │      │      jquery.fs.boxer.c
│  │      │      jquery.fs.boxer.j
│  │      │
│  │      └─sha256
│  │              sha256.min.js
│  │
│  ├─components
│  │  │  Dailog.vue
│  │  │  datePicker.vue
│  │  │  FileList.vue
│  │  │  FileUpload.vue
│  │  │  pagination.vue
│  │  │  queryList.vue
│  │  │  regionPicker.vue
│  │  │  Step.vue
│  │  │
│  │  └─address
│  │          address.vue
│  │
│  ├─config
│  │      app.config.js
│  │      app.config_development.js
│  │      app.config_production.js
│  │
│  ├─pages    //显示页面
│  │  ├─auth
│  │  │  │  Auth.vue
│  │  │  │
│  │  │  └─img
│  │  │          bg_login.jpg
│  │  │          bg_login_box.png
│  │  │          ERP-bg.jpg
│  │  │          ERPlogo.png
│  │  │          login.png
│  │  │          verifycode.jpg
│  │  │
│  │  ├─cert
│  │  │  │  cert.vue
│  │  │  │
│  │  │  ├─auth
│  │  │  │  │  CertAuth.vue
│  │  │  │  │
│  │  │  │  └─mods
│  │  │  │          AuthDetail.vu
│  │  │  │          AuthLog.vue
│  │  │  │
│  │  │  ├─electronic
│  │  │  │  │  Electronic.vue
│  │  │  │  │
│  │  │  │  └─mods
│  │  │  │          ElectronicDet
│  │  │  │
│  │  │  ├─entrust
│  │  │  │  │  Entrust.vue
│  │  │  │  │
│  │  │  │  └─mods
│  │  │  │          EntrustDetail
│  │  │  │
│  │  │  ├─preserve
│  │  │  │  │  Preserve.vue
│  │  │  │  │
│  │  │  │  └─mods
│  │  │  │          PreserveDetai
│  │  │  │
│  │  │  ├─promise
│  │  │  │  │  Promise.vue
│  │  │  │  │
│  │  │  │  └─mods
│  │  │  │          PromiseDetail
│  │  │  │
│  │  │  ├─register
│  │  │  │  │  Register.vue
│  │  │  │  │  RegisterSearch.vu
│  │  │  │  │  RegisterTable.vue
│  │  │  │  │
│  │  │  │  └─mods
│  │  │  │          RegisterDetai
│  │  │  │          RegisterLog.v
│  │  │  │          SetStatus.vue
│  │  │  │
│  │  │  └─vendor
│  │  │      │  Vendor.vue
│  │  │      │
│  │  │      └─mods
│  │  │              VendorDetail.
│  │  │
│  │  ├─chart
│  │  │  │  chart.vue
│  │  │  │
│  │  │  ├─hospital
│  │  │  │      HospitalChart.vue
│  │  │  │
│  │  │  └─supplier
│  │  │          SupplierChart.vue
│  │  │
│  │  ├─dashboard
│  │  │      Dashboard.vue
│  │  │
│  │  ├─hospital
│  │  │  │  hospital.vue
│  │  │  │  product.vue
│  │  │  │  supplier.vue
│  │  │  │
│  │  │  └─mods
│  │  │          addHospital.vue
│  │  │          detail.vue
│  │  │          log.vue
│  │  │          productLog.vue
│  │  │
│  │  ├─index
│  │  │      index.vue
│  │  │
│  │  ├─logistic
│  │  │  │  Logistic.vue
│  │  │  │
│  │  │  └─mods
│  │  │          CheckLogistic.vue
│  │  │          LogisticDetail.vu
│  │  │
│  │  ├─order
│  │  │  │  Order.vue
│  │  │  │
│  │  │  └─detail
│  │  │          orderDetail.vue
│  │  │
│  │  ├─product
│  │  │  │  product.vue
│  │  │  │  productTable.vue
│  │  │  │
│  │  │  └─mods
│  │  │          detail.vue
│  │  │          down.vue
│  │  │          log.vue
│  │  │
│  │  ├─return
│  │  │  │  Return.vue
│  │  │  │
│  │  │  └─detail
│  │  │          ReturnDetail.vue
│  │  │
│  │  ├─supplier
│  │  │  │  customer.vue
│  │  │  │  product.vue
│  │  │  │  supplier.vue
│  │  │  │
│  │  │  └─mods
│  │  │          addSupplier.vue
│  │  │          certs.vue
│  │  │          certTimeSet.vue
│  │  │          detail.vue
│  │  │          log.vue
│  │  │
│  │  └─user
│  │      │  User.vue
│  │      │
│  │      └─mods
│  │              addUser.vue
│  │              permission.vue
│  │
│  ├─router
│  │      index.js
│  │      r-config.js
│  │      _import_development.js
│  │      _import_production.js
│  │
│  ├─services
│  │      global.common.js
│  │      Http.js
│  │      interceptor.js
│  │
│  ├─store
│  │      action.js
│  │      getter.js
│  │      index.js
│  │      mutation-types.js
│  │      mutations.js
│  │
│  └─style
│          common.scss
│          element-ui.scss
│          mixin.scss
│
└─static
    │  .gitkeep
    │
    └─tpl
            printTpl.html