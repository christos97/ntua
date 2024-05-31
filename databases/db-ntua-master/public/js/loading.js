$(document).ready(function() { 
    
    const fetchLast = (timeout) => {
        window.setTimeout( () => {
            window.setInterval( () => {
                axios.get('http://localhost:3000/api/database_up')
                    .then( () => window.location = 'http://localhost:3000/dashboard' )
                    .catch((err) => console.log(err))
                }, 2000)
        },timeout)
    }
    
    fetchLast(6000)
});