import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBnGKjSTjHt5IAYkB-MgsVx4LsNHtOkJd4",
    authDomain: "classtask-6aae2.firebaseapp.com",
    databaseURL: "https://classtask-6aae2.firebaseio.com",
    projectId: "classtask-6aae2",
    storageBucket: "classtask-6aae2.appspot.com",
    messagingSenderId: "309362585872"
};
firebase.initializeApp(config);

export default firebase; 