const firebaseConfig = {
  apiKey: "AIzaSyCFj7fQ6eXEzK88QRGE2q74gRjQq8EGiJ8",
  authDomain: "chunibyou-market.firebaseapp.com",
  databaseURL: "https://chunibyou-market-default-rtdb.firebaseio.com",
  projectId: "chunibyou-market",
  storageBucket: "chunibyou-market.firebasestorage.app",
  messagingSenderId: "250359580310",
  appId: "1:250359580310:web:3984eddab05c5bad5fe4b7"
};

// 🔥 Inisialisasi Firebase App
firebase.initializeApp(firebaseConfig);

// 🌐 Inisialisasi Database dan Firestore
const db = firebase.database();
const firestore = firebase.firestore();
