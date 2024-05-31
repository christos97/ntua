$(document).ready(function() {
   
    const validateInput =  (body) => {
    
        for (let f in body){
            
            if (body[f] === ""){
                alert("Please provide all fields")
                return 0
            }
    
            switch(f) {
    
                case 'barcode':
                    if (body[f].length !=10){
                        alert("Barcode length must be 10, provided: " + body[f].length)
                        $(`input[name=${f}`).val(''); 
                        return 0
                    }
                    break
    
                case 'price':
                    if (!body[f].match(/[+-]?([0-9]*[.])?[0-9]+/)){
                        alert("Price can contain only numbers and a dot (.)")
                        $(`input[name=${f}`).val(''); 
                        return 0
                    }
                    break     
            }
        }
         return 1   
    }

    var table = $('#productTable').DataTable( {
        paging: false,
        orderCellsTop: true,
        fixedHeader: true,
        bFilter: true,
        bInfo : true,
        columns: [
            { data: 'Barcode'},
            { data: 'Price'},
            { data: 'Name'},
            { data: 'Brand'},
            { data: 'Category'},
            { data: 'Price History'}
        ]
    } );
   
    const modal_body = document.getElementById('md_bd')
    const redraw_model = () => {
        modal_body.innerHTML = ''
        let canvas = document.createElement('canvas')
        canvas.id='price_history_chart'
        canvas.width ="400"
        canvas.height= "400"
        document.body.appendChild(canvas)
        modal_body.append(canvas)
    }

    let history_chart
    $('#productTable tbody tr').on('click', function () {
        
        redraw_model()
        
        let barcode = ( table.row( this ).data().Barcode).split('<')[0]
        axios
            .get(`http://localhost:3000/api/price_history/${barcode}`)
            .then( (result) =>{
                let dates= [], prices=[]
                
                for (let row of result.data){
                    let utc = new Date(row.Start_date)
                    dates.push((utc.toUTCString().split('GMT')[0]).split(',')[1])    
                    prices.push(row.Price)
                }
                let now = new Date()
                dates.push(((now.toUTCString()).split('GMT')[0]).split(',')[1])
                prices.push(result.data[0].cur_price)
                var ctx = document.getElementById('price_history_chart').getContext('2d');
                history_chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: dates,
                    datasets: [{
                        label: result.data[0].Name,
                        fill:false,
                        data: prices, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 2
                    }]
                    },
                    options: {
                    legend: {
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'black',
                                fontSize: 14,
                                beginAtZero: false
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'black',
                                fontSize: 14,
                                stepSize: 1,
                                beginAtZero: false
                            }
                        }]
                    }
                    }
                })
            })
            .catch( () => { 
                modal_body.innerHTML = 'No price history changes'; 
            })
    });

    
    
    
    const updateProductTable = (products) => {
        table.clear()
        for (let prod of products){
            table.row.add({
                'Barcode' : prod.Barcode ,
                'Price': prod.Price,
                'Name': prod.prod_name,
                'Brand': prod.Brand_name,
                'Category' : prod.categ_name,
                'Price History' : '<a class="btn btn-secondary" id="price-history-btn" style="margin: 0rem 0rem 0rem 2.6rem; border-radius:8px;" href="#" data-toggle="modal" data-target="#priceHistoryModal" role="button"><i class="fas fa-history"></i></a>'
            })
        }
        table.draw()
    }

    const triggerUpdate = () => {
        axios
            .get('http://localhost:3000/products/update_products_table')
            .then((result) => updateProductTable(result.data))
            .catch( (err) => console.log(err))
    }
    
    $('#product_added').hide();
    $('#product_not_added').hide();
    $('#product_edited').hide();
    $('#product_not_edited').hide();
    $('#product_deleted').hide();
    $('#product_not_deleted').hide();

    const displayAlert = (alert) => {
        $(alert).show();
        setTimeout(() => { 
            $(alert).hide(); 
        }, 5000);   
    }

    const postData = (url, body, success, error) => {
        axios
            .post(url, body)
            .then( () => displayAlert(success))
            .catch( () => displayAlert(error))
    }  
    
    const addProduct =  () => {
    
        let url = 'http://localhost:3000/products/addProduct'
        let success = '#product_added'
        let error = '#product_not_added'
        let body = {
            barcode: document.getElementById('add_barcode').value,
            price: document.getElementById('add_price').value,
            name: document.getElementById('add_name').value,
            brand: document.getElementById('add_brand').value,
            category_id: document.querySelector('input[name="add_category"]').value
        }
        if (!validateInput(body)) return
        postData(url, body, success, error)
        for (let f in body) $(`input[name=${f}`).val(''); 
        
        return
    }
    
    const editProduct = () => {

        let url = 'http://localhost:3000/products/editProduct'
        let success = '#product_edited'
        let error = '#product_not_edited'
        let body = {
            barcode: document.getElementById('edit_barcode').value,
            price: document.getElementById('edit_price').value,
            name: document.getElementById('edit_name').value,
            brand: document.getElementById('edit_brand').value,
            category_id: document.querySelector('input[name="edit_category"]').value
        }
        if (!validateInput(body)) return
        postData(url, body, success, error)
        for (let f in body) $(`input[name=${f}`).val('')

        return     
    }
    
    const deleteProduct = () => {
        
        let url = 'http://localhost:3000/products/deleteProduct'
        let success = '#product_deleted'
        let error = '#product_not_deleted'
        let body = { barcode : document.getElementById('delete_barcode').value }
        if (!validateInput(body)) return
        postData(url, body, success, error)
        for (let f in body) $(`input[name=${f}`).val('')
        
        return
    } 
       
    document.getElementById('history-close-btn').onclick = () => {
        if(history_chart) 
            history_chart.destroy()
        $('canvas').remove();
    }
    
    document.getElementById('edit-close-btn').onclick = () =>  window.location.reload()
    
    document.getElementById('add-btn').onclick = () => {
        addProduct()
        triggerUpdate()
    }

    document.getElementById('edit-btn').onclick = () => {
        editProduct()
        triggerUpdate()
    }

    document.getElementById('delete-btn').onclick = () => {
        deleteProduct()
        triggerUpdate()
    }
  
});




