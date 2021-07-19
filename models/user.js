const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id ? new ObjectId(id) : null;
    };

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    };

    addToCart(product) {
        // const cartProduct = this.cart.item.findIndex(cp => {
        //     return cp._id === product._id;
        // });

        const updatedCart = {
            items: [{
                    productId: new ObjectId(product._id),
                    queantity: 1
                }] // , to add or ovewrite a property tto the object
        };
        const db = getDb();
        return db.collection('users').updateOne({
            _id: this._id
        }, {
            $set: {
                cart: updatedCart
            }
        });
    };

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({
            _id: new ObjectId(userId)
        }).then(user => {
            // console.log(user);
            return user;
        }).catch(err => console.log(err));
    };

}

module.exports = User;