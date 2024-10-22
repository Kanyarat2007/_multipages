import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import'./Navbar.css'

const initPage = "home";

function Navbar({ products, carts, setToken }) {
    
    const [tab, setTab] = useState('');

    useEffect(() => {
        setTab(initPage)
    }, [])
    
    const homeRef = useRef()
    const calculatorRef = useRef()
    const componentsRef = useRef()
    const todoRef = useRef()
    const productsRef = useRef()
    const cartsRef = useRef()

    useEffect(() => {
        if (tab === 'calculator') calculatorRef.current?.click();
        else if (tab === 'components') componentsRef.current?.click();
        else if (tab === 'todo') todoRef.current?.click();
        else if (tab === 'products') productsRef.current?.click();
        else if (tab === 'carts') cartsRef.current?.click();
        else homeRef.current?.click();
    }, [tab]);

    return ( 
        <div className='navbar-container'>
            
            <Link to='/home'>
                <button 
                    className={'btn ' + (tab === 'home' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('home')}>Home
                </button>
            </Link>

            <Link to='/calculator'>
                <button 
                    className={'btn ' + (tab === 'calculator' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('calculator')}>Calculator
                </button>
            </Link>

            <Link to='/animation'>
                <button 
                    className={'btn ' + (tab === 'animation' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('animation')}>Animation
                </button>
            </Link>

            <Link to='/components'>
                <button 
                    className={'btn ' + (tab === 'components' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('components')}>Components
                </button>
            </Link>

            <Link to='/todo'>
                <button 
                    className={'btn ' + (tab === 'todo' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('todo')}>Todo
                </button>
            </Link>

            
            <Link to='/products'>
                <button 
                    className={'btn ' + (tab === 'products' ?  'btn-primary'
                    : 'btn-outline-primary')}
                    onClick={() => setTab('products')}
                    ref={productsRef}
                >
                    Products ({products.length})
                </button>
            </Link>

            <Link to='/carts'>
                <button 
                    className={'position-relative btn ' + (tab === 'carts' ?  'btn-primary'
                    : 'btn-outline-primary')}
                    onClick={() => setTab('carts')}
                    ref={cartsRef}>
                    Carts 
                    { carts.length > 0 && (
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {carts.length < 10 ? carts.length : '9+'}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    )}
                </button>
            </Link>

            <button 
                className='btn btn-outline-danger'
                style={{marginLeft: '1rem'}}
                onClick={() => {setToken('') }}>
                Logout
            </button>

            <hr />

        </div>
        
     );
}

export default Navbar;