import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {
    public app: typeof app;
    public auth: app.auth.Auth;
    public db: app.firestore.Firestore;

    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app;
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async register (name: string, email: string, password: string) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password,
        );

        return newUser.user?.updateProfile({
            displayName: name,
        });
    }

    login(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout () {
        return this.auth.signOut();
    }

    resetPassword(email: string) {
        return this.auth.sendPasswordResetEmail(email);
    }
}

const firebase = new Firebase();
export default firebase;