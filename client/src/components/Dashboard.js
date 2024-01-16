import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    return (

    <>

            <div className="dashboard">
                <div className="user-info">
                    <h3>Yojna Tracking Dashboard</h3>
                    <h5>Yojnas Enrolled: {}</h5>
                    <div className="user-details">
                        <h6>Name: {userData.name}</h6>
                        <h6>Phone: {userData.phone}</h6>
                        <h6>Aadhar No.: 1234 5678 9012</h6>
                        <h6>Email: {userData.email}</h6>
                        <h6>Annual Income: $50,000</h6>
                    </div>

                </div>

            </div>


                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>

        </>
    )
}

    export default Dashboard