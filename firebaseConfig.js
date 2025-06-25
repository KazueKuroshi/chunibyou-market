const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "NAMA_PROJECT.firebaseapp.com",
  databaseURL: "https://NAMA_PROJECT.firebaseio.com",
  projectId: "NAMA_PROJECT",
  storageBucket: "NAMA_PROJECT.appspot.com",
  messagingSenderId: "xxxx",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
