import { updateDoc } from 'firebase/firestore/lite';
import {
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateCurrentUser,
    getDoc,
    getDocs,
    setDoc,
    doc,
    query,
    where,
    collection,
    deleteDoc,
    addDoc,
    firestore
}
    from './config/firebase';

let db = require('./data.json')

export const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Database {

    constructor() {
        this.products = db.database.products
        this.gender = db.database.gender
        this.category = db.database.category
        this.length = this.products.length
    }

    loadStoreFront = async (gender) => {
        const prod = [];

        const q = query(collection(firestore, "Products"), where("gender", "==", gender));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            prod.push({ id: doc.id, ...doc.data() })
        });

        return prod
    }

    getProducts = async () => {
        const prod = []
        const querySnapshot = await getDocs(collection(firestore, "Products"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            prod.push({ id: doc.id, ...doc.data() })
        });
        this.products = prod
        return this.products
    }

    fetchProductById = async (id) => {
        const docRef = doc(firestore, "Products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        }
        return null
    }

    getCategories() {
        return db.database.category
    }

    getGender() {
        return db.database.gender
    }

    getSizes() {
        return db.database.size
    }

    fetchCategory = async (category, gender = 'female') => {
        return await this.loadStoreFront(gender).then((res) => {
            let v = res.filter((i) => i.categories.includes(category))
            return v
        })
    }

    getDeliveryCost(indx) {
        return [20, 50, 100][indx]
    }

    // addAllProd(){
    //     db.database.products.map(async i => {
    //         await this.addProduct(i)
    //     })
    // }

    addProduct = async (product) => {

        const prodRef = collection(firestore, 'Products')
        addDoc(prodRef, {
            ...product
        })


        const id = this.length + 1
        product["id"] = id
        this.products.push(product)
        this.length += 1
        return this.products
    }

    deleteProduct = async (id) => {
        const prodRef = doc(firestore, "Products", id)
        return  await deleteDoc(prodRef)
    }

    updateProduct = async (id, data) => {
        const userRef = doc(firestore, "Products", id)
        await updateDoc(userRef, data)
        return data
    }
}

class UserDB {

    constructor() {
        this.users = {}
        this.length = 0
    }

    add_user(user) {
        const id = this.length
        this.users[id] = user
        this.users[id]['id'] = id
        this.length += 1
        return this.users[id]
    }

    get_user(id) {
        return this.users[id]
    }

    update_user(id, data) {
        const userRef = doc(firestore, "Users", id)
        updateDoc(userRef, data)
        return data
    }


}

class User {
    #db = new UserDB() //private instance

    constructor() {
        this.id = null
        this.firstname = null
        this.lastname = null
        this.address = null
        this.email = null
        this.phone = null
        this.password = null
        this.loggedIn = auth.currentUser ? true : false
    }

    fb_signout() {
        auth.signOut()
    }

    fb_signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                this.fb_load()
            }).catch((e) => {
                return this.loginError(JSON.stringify(e))
            })
    }

    fb_signup(data) {
        return createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                setDoc(doc(firestore, 'Users', user.user.uid), {
                    uid: user.user.uid,
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname
                })
                this.fb_load()
            })
            .then(() => {
                updateCurrentUser(auth, {
                    displayName: data.firstname + ' ' + data.lastname
                }).catch((e) => {
                    return this.loginError(JSON.stringify(e))
                })
            })
    }

    login(email, password) {
        let person = null;
        for (const key in this.#db.users) {
            if (this.#db.users.hasOwnProperty(key)) {
                person = this.#db.users[key]
                if (person.email === email && person.password === password) {
                    this.loggedIn = true
                    this.load(person)
                    return
                }
            }
        }
        return this.loginError("No user with email found")

    }

    fb_load = async () => {
        const u = auth.currentUser
        const docRef = doc(firestore, 'Users', u.uid)
        return await getDoc(docRef).then(user => {
            this.id = u.uid
            this.firstname = user.firstname
            this.lastname = user.lastname
            this.address = user.address
            this.email = user.email
            this.phone = user.phoneNumber
            this.avatar = user.avatar
            this.loggedIn = true
        })

    }

    load(person) {
        this.id = person.id
        this.firstname = person.firstname
        this.lastname = person.lastname
        this.address = person.address
        this.email = person.email
        this.phone = person.phone
    }

    logout() {
        this.id = null
        this.firstname = null
        this.lastname = null
        this.address = null
        this.email = null
        this.phone = null
        this.loggedIn = false
    }

    signup(data) {
        const _user = this.login(data.email, data.password)
        if (_user?.error) {
            const newUser = this.#db.add_user(data)
            if (newUser) {
                this.loggedIn = true
                this.load(newUser)
                return newUser
            }
        } else {
            return this.loginError(`user with this email already exists`)
        }
    }

    update_user(id, data) {
        this.#db.update_user(id, data)
    }

    fb_getuser = async () => {
        if(!auth.currentUser) return null
        const u = auth?.currentUser
        const docRef = doc(firestore, 'Users', u?.uid)
        const snapShot = await getDoc(docRef)
        if (snapShot) {
            this.id = u.uid
            this.firstname = snapShot.data().firstname
            this.lastname = snapShot.data().lastname
            this.address = snapShot.data().address
            this.email = snapShot.data().email
            this.phone = snapShot.data().phoneNumber
            this.avatar = snapShot.data().avatar
            this.loggedIn = true
        }

        return snapShot.data()
    }

    get_user() {
        if (!this.loggedIn) return { error: "user is not logged In " }
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            address: this.address,
            email: this.email,
            phone: this.phone,
            loggedIn: this.loggedIn
        }
    }

    loginError(error) {
        this.loggedIn = false
        return { error: error }
    }

    makePayment = async (data) => {
        return fetch('http://127.0.0.1:5000/send', {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
            },
            body: JSON.stringify(data)
        }).then(async (resp) => {
            let response = await resp.json()
            response = response[3]
            return response
        })
    }

    verify_payment(ref) {
        return fetch('http://127.0.0.1:5000/transaction/verify?ref=' + ref, {
            method: "GET",
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
            }
        }).then(async (resp) => {
            let response = await resp.json()
            // response = response[3]
            return response
        })
    }
}

export {
    Database,
    UserDB,
    User
}