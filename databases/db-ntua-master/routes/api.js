const router = require('express').Router()
const {db, query, queryEmpty } = require('../db')


// Check database ready
router.get('/database_up', (err, res) => queryEmpty("select * from Most_profitable_shop_in_each_city;", null, res))


//  Transaction invoice endpoint
router.get('/transactions/:trans_id', (req, res) =>
     query(
        'SELECT t.Total_amount as total_amount,t.Total_piecies as total_pieces, '+
        'tcp.Piecies as product_pieces, p.Name as product_name, '+
        'p.Price as product_price, c.Name as product_category ' +
        'FROM TransactionContainsProduct as tcp ' + 
        'JOIN Products as p ON tcp.Barcode=p.Barcode ' +
        'JOIN Category as c ON p.Category_id=c.Category_id ' +
        'JOIN Transaction as t ON t.Trans_id=tcp.Trans_id '+
        'WHERE tcp.Trans_id=?',
        parseInt(req.params.trans_id), res 
    )
)

// Price history endpoint 
router.get('/price_history/:barcode', (req, res) => 
    query(
        'select h.Start_date, h.End_date, h.Price, p.Name, p.Price as cur_price '+
        'from HadOlderPrice as h join Products as p on h.Barcode=p.Barcode '+
        'where h.Barcode=?',
        req.params.barcode, res
    )
)

router.get('/customer_visiting_hours/:card', (req, res) => {
    query(
        'select tab2.Time_range, count(tab2.Time_range) as cnt from ' +
        '(select case ' +
            `when Time(tab1.Date_time) >='09:00:00' and Time(tab1.Date_time) <'10:00:00' then 1 `+
            `when Time(tab1.Date_time) >='10:00:00' and Time(tab1.Date_time) <'11:00:00' then 2 `+
            `when Time(tab1.Date_time) >='11:00:00' and Time(tab1.Date_time) <'12:00:00' then 3 `+
            `when Time(tab1.Date_time) >='12:00:00' and Time(tab1.Date_time) <'13:00:00' then 4 `+
            `when Time(tab1.Date_time) >='13:00:00' and Time(tab1.Date_time) <'14:00:00' then 5 `+
            `when Time(tab1.Date_time) >='14:00:00' and Time(tab1.Date_time) <'15:00:00' then 6 `+
            `when Time(tab1.Date_time) >='15:00:00' and Time(tab1.Date_time) <'16:00:00' then 7 `+
            `when Time(tab1.Date_time) >='16:00:00' and Time(tab1.Date_time) <'17:00:00' then 8 `+
            `when Time(tab1.Date_time) >='17:00:00' and Time(tab1.Date_time) <'18:00:00' then 9 `+
            `when Time(tab1.Date_time) >='18:00:00' and Time(tab1.Date_time) <'19:00:00' then 10 `+
            `when Time(tab1.Date_time) >='19:00:00' and Time(tab1.Date_time) <'20:00:00' then 11 `+
            `when Time(tab1.Date_time) >='20:00:00' and Time(tab1.Date_time) <='21:00:00' then 12 `+
        `end as Time_range `+
        `from (select Date_time from Transaction where Transaction.Card=?) tab1) tab2 `+
        'group by tab2.Time_range '+
        'order by tab2.Time_range;',
        parseInt(req.params.card), res
    )
})

router.get('/top_10_products_per_customer/:card', (req, res) => 
    query(
        "select tab3.Barcode, tab4.Name, tab4.Brand_name, tab3.Total_piecies from "+
        "(select Barcode, sum(Piecies) as Total_piecies from "+
        "((select Trans_id from Transaction where Card=?) tab1 "+
        "left join " +
        "(select Trans_id, Barcode, Piecies from TransactionContainsProduct) tab2 "+
        "on tab1.Trans_id = tab2.Trans_id) "+
        "group by Barcode "+
        "order by Total_piecies desc "+
        "limit 10) tab3 left join (select Name, Brand_name, Barcode from Products) tab4 "+
        "on tab3.Barcode = tab4.Barcode;",
        [parseInt(req.params.card)], res
    )
)
// Dashboard Charts (Display MySQL stored views in Charts)
const views = [
    'select * from Frequently_bought_together',
    'select * from Top_selling_spots',
    'select * from Prefered_products_per_category',
    'select * from Most_profitable_hours',
    'select * from Most_visited_hours_per_age_pracket',
    'select * from No_of_pet_shop_products_bought_per_pet',
    'select * from Most_profitable_shop_in_each_city'
];

router.get('/freq_bought_together', (req, res) => query(views[0], null, res))
router.get('/top_selling_spots', (req, res) => query(views[1], null, res))
router.get('/prefered_products_per_category', (req, res) => query(views[2], null, res))
router.get('/most_profitable_hours', (req, res) => query(views[3], null, res))
router.get('/most_visited_hours_per_age_bracket', (req, res) => query(views[4], null, res))
router.get('/products_per_pet', (req, res) => query(views[5], null, res))
router.get('/most_profitable_shop_in_each_city', (req, res) => {
    let address = []
    db.query(views[6], (err, result) =>{
        if (err) throw err
        for (let row of result) {
            switch (row.Store) {
                case  1 :
                    let key = row.City
                    address.push({ 
                        city : 'Athens', 
                        adr :'Georgiou Kerdinou 69' 
                    })
                    break
                case 2 :
                    address.push({
                        city: 'Athens',
                        adr :'Korai 3'
                    })
                    break
                case 3 :
                    address.push({
                        city: 'Athens', 
                        adr :'Dimitrakopoulou 72'
                    })
                    break
                case 4 :
                    address.push({
                        city: 'Athens', 
                        adr :'Valtinon 30'
                    })
                    break
                case 5 :
                    address.push({
                        city: 'Kalamata', 
                        adr :'Kallipateiras 91'
                    })
                    break
                case 6 :
                    address.push({
                        city:'Kalamata', 
                        adr :'Akrita 1'
                    })
                    break
                case 7 :
                    address.push({
                        city: 'Kalamata',
                        adr :'Psaron 106'
                    })
                    break
                case 8 :
                    address.push({
                        city: 'Lamia', 
                        adr :'Karagianopoulou 3'
                    })
                    break
                case 9 :
                    address.push({
                        city :'Lamia', 
                        adr :'Pylou 24'
                    })
                    break
                case 10 :
                    address.push({
                        city: 'Lamia', 
                        adr :'Arkadiou 4'
                    })
                    break
            }
        }
        res.status(200).send(address)
    } )
})

module.exports = router;