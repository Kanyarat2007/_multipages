import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Carts.css'

function Carts({ carts, setCarts}) {
    return ( 
        <div className="carts-container">
            <hr />
            <div className='carts-items-container'>
                {carts.map( (cart) => {
                    return (
                        <Card style={{ width: '18rem', height: '25rem'}} key={cart.id} >
                            <Card.Img variant="top" src={cart.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{cart.title}</Card.Title>
                                <Card.Text><b>${cart.price.toFixed(2)}</b></Card.Text>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={ () => setCarts(carts.filter( (c) => c.id !== cart.id)) 
                                    }> Remove from Carts
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                } )}
            </div>

            <div className='carts-footer'>
                <hr />  
                <h4>
                    Products: <span className='badge bg-danger'> {carts.length} items </span>
                    &nbsp; - Total Price: &nbsp;
                    <span className='badge bg-success'>
                        $
                        {carts.reduce((prev, cart) => {
                            return prev + cart.price
                        }, 0).toFixed(2)}
                    </span>
                </h4>
                <button 
                    style={{marginTop: '0.5rem'}} 
                    className='btn btn-warning' >
                    Checkout &nbsp;
                    <span className='bi bi-credit-card'></span>
                </button>
            </div>
            <hr />
        </div>
     );
}

export default Carts;