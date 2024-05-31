$(document).ready(function() {
    
    var receipt_total_table = $('#receiptTotalTable').DataTable({
        paging: false,
        bFilter: false,
        bInfo : false,
        columns: [
            { data: 'Total_pieces'},
            { data: 'Total_amount'}  
        ]
    })

    var receipt_table = $('#receiptTable').DataTable({
        paging: false,
        bFilter: false,
        bInfo : false,
        columns: [
            { data: 'Product'}, 
            { data: 'Pieces'}, 
            { data: 'Category'}, 
            { data: 'Price_per_unit'}  
        ]
    })
    var weekly_table = $('#weeklyTable').DataTable({
        paging: true,
        pagingType: 'numbers',
        bFilter: false,
        bInfo : false,
        columns: [
            { data: 'Week'}, 
            { data: '$'} 
        ]
    })
    const updateReceiptTotalTable = (total_pieces, total_amount) => {
        receipt_total_table.clear()
        receipt_total_table.row.add({
                'Total_pieces': total_pieces,
                'Total_amount': total_amount + ' $'
            })
        receipt_total_table.draw()
    }

    const updateReceiptTable = (receipt) => {
        receipt_table.clear()
        receipt_total_table.clear()
        for (let row of receipt){
            receipt_table.row.add({
                'Product': row.product_name,
                'Pieces': row.product_pieces,
                'Category': row.product_category,
                'Price_per_unit': row.product_price + ' $'
            })
        }
        receipt_table.draw()
        updateReceiptTotalTable(receipt[0].total_pieces, receipt[0].total_amount)
    }
    
    var customer_table = $('#customerTransactionsTable').DataTable( {
        paging: true,
        orderCellsTop: true,
        fixedHeader: true,
        columns: [
            { data: 'Date_time'},
            { data: 'Total_piecies'},
            { data: 'Total_amount'},
            { data: 'Payment_method'},
            { data: 'Store'},
            { data: 'Receipt'}
        ]
    } );
    
    
 
    $('#customerTransactionsTable tbody tr').on('click',  function () {
        let trans_id = ((customer_table.row( this ).data().Receipt).toString()).split('<')[0]
        axios
            .get(`http://localhost:3000/api/transactions/${trans_id}`)
            .then( (result) => updateReceiptTable(result.data))
            .catch((err) => alert(err)) 
    } )
    
       
    const updateCustomerTable = (transactions) => {
        customer_table.clear()
        for (let trans of transactions){
            let utc_date = new Date(trans.Date_time)
            let date = (utc_date.toString()).split('GMT')
            customer_table.row.add({
                'Date_time' : date[0],
                'Total_piecies': trans.Total_piecies,
                'Total_amount': trans.Total_amount,
                'Payment_method': trans.Payment_method,
                'Store' : `${trans.Street} ${trans.Number_}`,
                'Receipt': trans.Trans_id + '<a class="btn btn-secondary" style="margin: 0rem 0rem 0rem 2.6rem; border-radius:8px;" href="#" data-toggle="modal" data-target="#receiptModal" role="button"><i class="fas fa-file-invoice-dollar"></i></a>'
            })
            customer_table.draw()
            $('#customerTransactionsTable tbody tr').on('click',  function () {
                let trans_id = ((customer_table.row( this ).data().Receipt).toString()).split('<')[0]
                console.log(trans_id)
                axios
                    .get(`http://localhost:3000/api/transactions/${trans_id}`)
                    .then( (result) => updateReceiptTable(result.data))
                    .catch((err) => alert(err)) 
            } )
        }
    }

    const url = 'http://localhost:3000/customers/transactions'
    let payment_method='';
    let min_amount,
        max_amount,
        min_pieces,
        max_pieces; 
    
    $("#amount_slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1500,
        from: 0,
        to: 1500,
        grid: false,
        skin: 'round',
        
        onStart: function (data) {
            min_amount = data.min
            max_amount = data.max
        },

        onFinish: function(data){
            min_amount = data.from
            max_amount = data.to
            let body = {
                min_price: data.from,
                max_price: data.to,
                min_pieces: min_pieces,
                max_pieces: max_pieces,
                payment_method: payment_method
            }

            axios
                .post(url,{
                    min_price: data.from,
                    max_price: data.to,
                    min_pieces: min_pieces,
                    max_pieces: max_pieces,
                    payment_method: payment_method
                })
                .then((result) => updateCustomerTable(result.data) )
                .catch((err) => {
                    if (err.response.status == 404) 
                        customer_table.clear().draw()
                })
        }   
    })
        
    $("#pieces_slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 25,
        from: 1,
        to: 25,
        grid: false,
        skin: 'round',
        onStart: function (data) {
            min_pieces = data.min
            max_pieces = data.max
        },
        onFinish: function(data){
            min_pieces = data.from
            max_pieces = data.to
            
            axios
                .post(url,{
                    min_price: min_amount,
                    max_price: max_amount,
                    min_pieces : data.from,
                    max_pieces : data.to,
                    payment_method: payment_method
                })
                .then(( result) => updateCustomerTable(result.data) )
                .catch( (err) => {
                    if (err.response.status == 404) 
                        customer_table.clear().draw()
                })
        }
    })   

    const btn = document.querySelector('#radio_buttons');
    
    btn.onclick = () => {
        
        const rbs = document.querySelectorAll('input[name="payment_method"]');
        for (let rb of rbs) {
            if (rb.checked) {
                payment_method = rb.value;
                break;
            }
        }
        
        axios
            .post(url,{
                min_price: min_amount,
                max_price: max_amount,
                min_pieces : min_pieces,
                max_pieces : max_pieces,
                payment_method: payment_method
            })
            .then(( result) => updateCustomerTable(result.data))
            .catch( (err) => {
                if (err.response.status == 404) 
                    customer_table.clear().draw()
            })
    }
} );