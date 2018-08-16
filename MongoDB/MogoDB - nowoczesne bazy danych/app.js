// polaczenie z baza
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/db';

MongoClient.connect(url, { useNewUrlParser: true }, (error, database) => {
   if (error) {
       throw new Error(error);
   }
   console.log('Połączono z bazą');
});

// odczyt zawartosci kolekcji
let listProducts = function (db, callback) {
  let cursor = db.collection('products').find();
  cursor.each((error, document) => {
      callback();
  })
};

// dodawanie nowego dokumentu
let insertDocument = function (db, callback) {
    db.collection('products').insertOne({
        name: 'X-Tech Editor',
        price: 249,
        category: 'software',
        stock: 28,
    }, (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log('ok');
        }
    })
};

// aktualizacja dokumentu
let updateProduct = function (database, callback) {
    db.collection('products').updateOne({
       // tak jak w notatkach
    }, (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log('ok');
        }
    })
};

// usuwanie dokumentu
let deleteProduct = function (database, callback) {
  db.collection('products').removeOne({ name: 'X-Tech editor' }, (error, result) => {

  });
};