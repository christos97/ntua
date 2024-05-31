$(document).ready(function() {
    
    var table = $('#storesTable').DataTable( {
        paging: false,
        orderCellsTop: true,
        fixedHeader: true,
        bFilter: true,
        bInfo : false,
        columns: [
        { data: 'Store_id'},
        { data: 'City'},
        { data: 'Address'},
        { data: 'Postal_code'},
        { data: 'Operating_hours'},
        { data: 'Size'}
    ]
    });

    $('#topStoresStable').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        columns: [
            { data : 'City' },
            { data: 'Address' }
        ]
    })
    
    $('#storesTable tbody tr').on('click',  function () {
        let store_id = table.row( this ).data().Store_id;
        window.location = `http://localhost:3000/stores/${store_id}`
    } );

     const updateStoreTable = (stores) => {
        table.clear()
        for (let store of stores){
            table.row.add({
                'Store_id': store.Store_id,
                'City': store.City,
                'Address': store.Street + " " + store.Number_,
                'Postal_code': store.Postal_code,
                'Operating_hours' : store.Operating_hours,
                'Size': store.Size_
            })
        }
        table.draw()
    }

    const triggerUpdate = () => {
        axios
            .get('http://localhost:3000/stores/update_stores_table')
            .then((result) => updateStoreTable(result.data))
            .catch( (err) => alert('Error updating table'))
    }
    
    $('#store_added').hide();
    $('#store_not_added').hide();

    $('#store_edited').hide();
    $('#store_not_edited').hide();

    $('#store_deleted').hide();
    $('#store_not_deleted').hide();

    const displayAlert = (alert) => {
        $(alert).show();
        setTimeout(() => { 
            $(alert).hide(); 
        }, 3000);   
    }

    const postData = (url, body, success, error) => {
        axios
            .post(url, body)    
            .then( () => displayAlert(success))
            .catch( (err) => displayAlert(error))
    }  
    
    const addStore =  () => {
    
        let url = 'http://localhost:3000/stores/addStore'
        let success = '#store_added'
        let error = '#store_not_added'
        let body = {
            store_id: document.getElementById('add_store_id').value,
            city: document.getElementById('add_city').value,
            street: document.getElementById('add_street').value,
            number: document.getElementById('add_number').value,
            postal_code : document.getElementById('add_postal_code').value,
            oper_hours: document.querySelector('input[name="add_oper_hours"]').value,
            size: document.getElementById('add_size').value
        }
        
        postData(url, body, success, error)
        
        return
    }
    
    const editStore = () => {

        let url = 'http://localhost:3000/stores/editStore'
        let success = '#store_edited'
        let error = '#store_not_edited'
        let body = {
            store_id: document.getElementById('edit_store_id').value,
            city: document.getElementById('edit_city').value,
            street: document.getElementById('edit_street').value,
            number: document.getElementById('edit_number').value,
            postal_code: document.getElementById('edit_postal_code').value,
            oper_hours: document.querySelector('input[name="edit_oper_hours"]').value,
            size : document.getElementById('edit_size').value
        }
        
        postData(url, body, success, error)
        for (let f in body) $(`input[name=${f}`).val('')

        return     
    }
    
    const deleteStore = () => {
        
        let url = 'http://localhost:3000/stores/deleteStore'
        let success = '#store_deleted'
        let error = '#store_not_deleted'
        let body = { store_id : document.getElementById('delete_store_id').value }
        
        postData(url, body, success, error)
        for (let f in body) $(`input[name=${f}`).val('')
        
        return
    }    
    
    document.getElementById('add-btn').onclick = () => {
        addStore()
        setTimeout(triggerUpdate,1000)
    }

    document.getElementById('edit-btn').onclick = () => {
        editStore()
        setTimeout(triggerUpdate,1000)
    }

    document.getElementById('delete-btn').onclick = () => {
        deleteStore()
        setTimeout(triggerUpdate,200)
    }
});
 
   
 