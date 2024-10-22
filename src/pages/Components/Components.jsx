import Counter from '../../componant/Counter/Counter'
import Timer from '../../componant/Timer/Timer'
import Add from '../../componant/Add/Add'
import Temperatures from '../../componant/Temperatures/Temperatures'

import './Components.css'

function Components() {
    return ( 
        <div className="components-container">
            <div className='app-title'>
                <h1 className='badge bg-black'>REACT COMPONENTS</h1>
            </div>

            <div className='app-components'>
                <div className='app-ct'>
                    <Counter />
                    <Timer/>
                </div>
                <div><Add/></div>
            </div>
            <Temperatures/>
            
            <div className='app-name'>
                <h1 className='badge bg-black'>
                    นางสาวกัลยรัตน์ ถิ่นหาญวงศ์ รหัส 66050217
                </h1>
            </div>
        </div>
     );
}

export default Components;