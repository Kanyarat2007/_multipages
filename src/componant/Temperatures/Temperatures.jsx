import Variable from '../Variable/Variable';
import './Temperatures.css'
import { useState, useEffect } from 'react';

function Temperatures({name, value, setValue}) {

    const [celsius, setCelsius] = useState(25);
    const [fahrenheit, setFahrenheit] = useState(77.00);
    const [kelvin, setKelvin] = useState(298.15);

        // Fahrenheit and Kelvin
        useEffect(() => {
            setFahrenheit((celsius * 9/5) + 32);
            setKelvin(celsius + 273.15);
        }, [celsius]);
    
        // Celsius and Kelvin 
        useEffect(() => {
            setCelsius((fahrenheit - 32) * 5/9);
            setKelvin(((fahrenheit - 32) * 5/9) + 273.15);
        }, [fahrenheit]);
    
        // Celsius and Fahrenheit
        useEffect(() => {
            setCelsius(kelvin - 273.15);
            setFahrenheit(((kelvin - 273.15) * 9/5) + 32);
        }, [kelvin]);

    return ( 
    <div className='temperature-container'>

        <h3 className='temperature-title'>TEMPERATURE</h3>

        <h3 className='temperature-display'>
            <span className='badge bg-primary'>{celsius.toFixed(2)} ํC</span>
            <span className='badge bg-primary'>{fahrenheit.toFixed(2)} ํF</span>
            <span className='badge bg-primary'>{kelvin.toFixed(2)}K</span>  
        </h3>

        <div className='temperature-variables'>
            <Variable name={'CELSIUS'} value={celsius} setValue={setCelsius} />
            <Variable name={'FAHRENHEIT'} value={fahrenheit} setValue={setFahrenheit}/>
            <Variable name={'KELVIN'} value={kelvin} setValue={setKelvin} />
        </div>

    </div> 
    );
}

export default Temperatures;