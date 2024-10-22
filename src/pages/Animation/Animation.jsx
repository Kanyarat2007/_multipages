import React, { useState, useEffect } from 'react'
import './Animation.css';

function animation() { 

    const fieldWidth = 1000,
    fieldHeight = 640,
    diameter = 100,
    maxLeft = fieldWidth - diameter - 2,
    maxTop = fieldHeight - diameter - 2,
    vx = 5,
    vy = 5;

    // State variables
    const [running, setRunning] = useState(false);
    const [activeType, setActiveType] = useState('none');
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const types = ['none', 'basketball', 'football', 'voleyball', 'human', 'cartoon', 'logo'];

    // Toggle running state
    const runClick = () => {
        setRunning(prevRunning => !prevRunning);
    };

    // Toggle active type
    const toggleType = (type) => {
        setActiveType(prevType => (prevType === type ? 'none' : type));
    };

    // Calculate ball movement
    const calculate = () => {
        if (!running) return;

        setPosition(prevPosition => {
            let newX = prevPosition.x + (goRight ? vx : -vx);
            let newY = prevPosition.y + (goDown ? vy : -vy);
    
            // Check for bounds and reverse direction if needed
            if (newX >= maxLeft || newX <= 0) {
                setGoRight(prev => !prev);
                newX = Math.max(0, Math.min(newX, maxLeft));
            }
    
            if (newY >= maxTop || newY <= 0) {
                setGoDown(prev => !prev);
                newY = Math.max(0, Math.min(newY, maxTop));
            }
            return { x: newX, y: newY };
        });
    };

    // Handle keyboard input
    const checkKeyboard = (event) => {
        const typeMap = { 
            ' ': runClick, 
            '0': () => toggleType('none'), 
            '1': () => toggleType('basketball'), 
            '2': () => toggleType('football'), 
            '3': () => toggleType('voleyball'), 
            '4': () => toggleType('human'), 
            '5': () => toggleType('cartoon'), 
            '6': () => toggleType('logo') 
        };

        if (typeMap[event.key]) typeMap[event.key]();
    };
    
    useEffect(() => {
        document.addEventListener('keydown', checkKeyboard);
        return () => {
            document.removeEventListener('keydown', checkKeyboard);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                calculate();
            }
        }, 25);

        return () => clearInterval(interval);
    }, [running, goRight, goDown]);
    
    return ( 
        <div className='animation-component'>
        <div className="field">
            <div 
                className={`ball ${activeType}`} 
                style={{ 
                    left: `${position.x}px`, 
                    top: `${position.y}px`, 
                    width: `${diameter}px`, 
                    height: `${diameter}px`, 
                    position: 'absolute' ,
                }} >
            </div>
        </div>

        <div className="control">

            <button className="run btn btn-success" 
                onClick={runClick}>
                <span className={`bi bi-${running ? 'pause' : 'play'}`}
                >&nbsp;{running ? 'PAUSE' : 'RUN'}</span>
            </button>

            <button className="btn btn-dark"
                onClick={() => toggleType('none')}>
                None
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => toggleType('basketball')}>
                Basketball
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => toggleType('football')}>
                Football
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => toggleType('voleyball')}>
                Voleyball
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => toggleType('human')}>
                Human
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => toggleType('cartoon')}>
                Cartoon
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => toggleType('logo')}>
                Logo
            </button>
        </div>
    </div>
     );
}

export default animation;