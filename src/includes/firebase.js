import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQRFfngtqhJZfMqgAtOfS4jVt0ejXcMQQ',
  authDomain: 'music-app-2e74b.firebaseapp.com',
  projectId: 'music-app-2e74b',
  storageBucket: 'music-app-2e74b.appspot.com',
  messagingSenderId: '746617031662',
  appId: '1:746617031662:web:f6cc29d271717c9a761cff'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log('No Persistance: ', error.code)
})
const userCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, userCollection, songsCollection, storage, commentsCollection }
