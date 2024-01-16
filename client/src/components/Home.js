import React, { useState, useEffect } from 'react'

const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            // console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);
    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{userName}</h1>
                    <h2> {show ? 'Happy, to see you back' : 'We Are The MERN Developer'}</h2>
                </div>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

                <div className="card" style={{ width: "18rem", height: "30rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">PRADHAN MANTRI AWAS YOJNA</h5>
                        <p className="card-text">
                            <p>-Get upto Rs 70000 at 3% lower Interest Rate.</p>

                            <p>-Maximum principal amount eligible for loan subsidy is Rs 2,00,000.</p>

                            <p>-minimum size of house is 25sq m .</p>
                        </p>
                        <a href="#" className="btn btn-primary"> Read More</a>
                    </div>
                </div>
                <div className="card" style={{ width: "18rem", height: "30rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">PRADHAN MANTRI SWASHTYA SURAKSHA YOJNA</h5>
                        <p className="card-text">-The accidental death insurance cover is Renewable each Year.</p>
                        <br />
                        <br />
                        <br />                        
                        <a href="#" className="btn btn-primary">Read More</a>
                    </div>
                </div>
                <div className="card" style={{ width: "18rem", height: "30rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">PRADHAN MANTRI FASAL BIMA YOJNA </h5>
                        <p className="card-text">
                            <p>-insurance coverage against the crop failure </p>
                            <p>-Stabalizing the income of the farmers</p>
                            <p>-completely voluntary to all indian farmers</p>
                        </p>
                        <a href="#" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Home
