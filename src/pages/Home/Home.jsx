import './Home.css'

function Home() {
    return ( 
        <div className='home-container'>
            <hr />
            <div className='home-title'>
                <h1>Profile</h1>
            </div>
            <div className='home-components'>
                <div className='hello'>
                    <img src="human.png" alt="" />
                    <h2>
                        <b>
                            Hello, I'M <br />
                            KANYARAT
                        </b>
                    </h2>
                </div>
                <div className='details'>
                    <h2>ประวัติ</h2>
                    <p>
                        <b>ชื่อ :</b> นางสาวกัลยรัตน์ ถิ่นหาญวงศ์ <br />
                        <b>รหัสนักศึกษา :</b> 66050217 <br />
                        คณะเทคโนโลยีสารสนเทศ สาขาวิทยาการคอมพิวเตอร์ <br />
                        และนวัตกรรมการพัฒนาซอฟต์แวร์ <br />
                        <b>คติประจำใจ :</b> ทำวันนี้ให้ดีที่สุด <br />
                    </p>
                </div>
            </div>
            <hr />
        </div>
     );
}

export default Home;