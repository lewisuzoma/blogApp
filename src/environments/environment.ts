// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  STORAGE_REQ_KEY: "storedreq",
  url: "",
  apiUrl: "https://fakestoreapi.com/",
  firebaseConfig: {
    apiKey: "AIzaSyCRvNAqy27QheLpmdCqEcISYBACF1OjzQI",
    authDomain: "user-mgt-app.firebaseapp.com",
    projectId: "user-mgt-app",
    storageBucket: "user-mgt-app.appspot.com",
    messagingSenderId: "67614790555",
    appId: "1:67614790555:web:f6ebb23459126b5194c73e"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
