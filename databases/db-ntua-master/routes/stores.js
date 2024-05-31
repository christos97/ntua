const router = require('express').Router(),
    { db , query } = require('../db'),
    axios = require ('axios')    

// Initial Stores table render
router.get('/', (req, res) => {       
    let sql = 'SELECT * FROM StoreAddress JOIN Stores ON Stores.Store_id=StoreAddress.Store_id'    
    db.query(sql, (err, info) => {
        if (err) throw err
        axios
            .get('http://localhost:3000/api/most_profitable_shop_in_each_city')
            .then( (result) => {
                res.render('stores/index', {
                    stores: info,
                    top_stores : result.data
                })
        })
    })

})

router.get('/update_stores_table', (req, res) => 
    query('SELECT * FROM StoreAddress JOIN Stores ON Stores.Store_id=StoreAddress.Store_id', null, res))

// Store Profile
router.get('/:store_id', (req, res) => {
    let store_id = parseInt(req.params.store_id),
        sql1 = 'SELECT * FROM StoreAddress as sa JOIN Stores as s ON s.Store_id=sa.Store_id  WHERE s.Store_id=?',
        sql2 = 
        'SELECT t.Trans_id, t.Card, t.Date_time, t.Total_piecies, t.Total_amount, t.Payment_method,t.Store_id ,'+
        'c.Card, c.Name FROM Transaction as t JOIN Customer as c ON c.Card=t.Card ' +
        'WHERE t.Store_id=?'

    db.query(sql1,[store_id], (err,rs1) => {
        if (err) throw err;
        db.query(sql2, [store_id], (err, rs2) => {
            if (err) throw err;
            res.render('stores/storeProfile', { 
                store: rs1,
                transactions: rs2
            })
        })
    })
})

// CRUD Store
router.post('/addStore', (req, res) => {
    let sql1 = 'INSERT INTO Stores (Store_id, Operating_hours, Size_) VALUES (?,?,?)'
    let bind1 = [
        parseInt(req.body.store_id),
        req.body.oper_hours, 
        parseInt(req.body.size)
    ]
    let sql2= 'INSERT INTO StoreAddress(Store_id ,Adr_id, Street,Number_, Postal_code, City) VALUES (?,?,?,?,?,?)'
    let bind2 =[
        parseInt(req.body.store_id),
        parseInt(req.body.store_id),
        req.body.street,
        parseInt(req.body.number),
        req.body.postal_code,
        req.body.city
    ]
    console.log('Add: \n', bind1 , bind2)

    db.query(sql1, bind1, (err,result1) => {
        console.log(result1)  
        if (err) res.status(500).send()     
        if (result1){ 
            db.query( sql2, bind2, (err, result2) => {
                if (err) res.status(500).send()
                console.log(result2)
                res.status(200).send()
            })      
        } 
        else
            res.status(404).send()      
    })
})
router.post('/editStore',(req, res) => {
    query(
        'UPDATE Stores as s, StoreAddress as sa '+
        'SET s.Operating_hours=?, s.Size_=? ,sa.Street=?, sa.Number_=?, sa.Postal_code=?, sa.City=? '+
        'WHERE s.Store_id=? AND sa.Store_id=?',[
        req.body.oper_hours, parseInt(req.body.size), req.body.street, req.body.number,
        req.body.postal_code, req.body.city, parseInt(req.body.store_id), parseInt(req.body.store_id) 
        ],
        res
    )
})
router.post('/deleteStore', (req, res) => 
    query('delete from Stores where Store_id=?', [parseInt(req.body.store_id)], res))

// Handles Transaction Table
router.post('/transactions', (req, res) => {
    
    let store_id = parseInt(((req.headers.referer).split('/'))[4]),
        min_price = parseFloat(req.body.min_price),
        max_price = parseFloat(req.body.max_price),
        min_pieces = parseFloat(req.body.min_pieces),
        max_pieces = parseFloat(req.body.max_pieces),
        payment_method = req.body.payment_method
        
    let bind = [store_id, min_price, max_price, min_pieces, max_pieces]
    let sql = 
    'SELECT t.Trans_id, t.Card, t.Date_time, t.Total_piecies, '+
    't.Total_amount, t.Payment_method, sa.Street, sa.Number_, c.Name, c.Card '+
    'FROM Transaction as t '+
    'JOIN StoreAddress as sa ON sa.Store_id=t.Store_id '+
    'JOIN Customer as c ON c.Card=t.Card '+
    'WHERE t.Store_id=? AND Total_amount>=? AND Total_amount<=? AND Total_piecies>=? '+
    'AND Total_piecies<=?';
        
    if (payment_method === '') 
        payment_method = 'All'
        
    if (payment_method === 'All')
        query(sql, bind, res)
    else
    {
        sql += ' AND Payment_method=?'
        bind.push(payment_method)
        query(sql, bind, res)
    }
})

module.exports = router