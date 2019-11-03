import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/firestore"

const config = {
  apiKey: "AIzaSyCXPdNIMeNHYNkzC-tt9XyjXYaslS7iwVA",
  authDomain: "uralskflats.firebaseapp.com",
  databaseURL: "https://uralskflats.firebaseio.com",
  projectId: "uralskflats",
  storageBucket: "uralskflats.appspot.com",
  messagingSenderId: "833202087258",
  appId: "1:833202087258:web:d6a0ba15e5a06488633f63",
}

let instance

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance
    instance = firebase.initializeApp(config)
    return instance
  }

  return null
}
