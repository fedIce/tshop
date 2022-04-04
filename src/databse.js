
let db = require('./data.json')

export const numberWithCommas =(x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Database {

    constructor() {
        this.products = db.database.products
        this.gender = db.database.gender
        this.category = db.database.category
        this.length = this.products.length
    }

    loadStoreFront(gender) {
        console.log(this.products)
        const v = this.products.filter(product => product.gender === gender)
        return v
    }

    getProducts() {
        return this.products
    }

    fetchProductById(id) {
        const v = this.products.filter(product => product.id === parseInt(id))
        return v[0]
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

    fetchCategory(category, gender = 'female') {
        let v = this.products.filter((i) => i.categories.includes(category))
        v = v.filter(i => i.gender === gender)
        return v
    }

    getDeliveryCost(indx) {
        return [20, 50, 100][indx]
    }

    addProduct(product) {
        const id = this.length + 1
        product["id"] = id
        this.products.push(product)
        this.length += 1
        return this.products
    }

    deleteProduct(id) {
        this.products = this?.products.filter(item => item.id !== id)
        return this.products
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
        this.users[id] = {
            ...this.users[id],
            ...data
        }
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
        this.loggedIn = false
    }

    login(email, password) {
        let person = null
        for (const key in this.#db.users) {
            if (this.#db.users.hasOwnProperty(key)) {
                person = this.#db.users[key]
                console.log(person)
                if (person.email === email && person.password === password) {
                    this.loggedIn = true
                    console.log('LOGGED IN')
                    this.load(person)
                    return
                }
            }
        }
        return this.loginError("No user with email found")

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
            console.log("URL: ", response)
            return response
        })
    }
}

export {
    Database,
    UserDB,
    User
}