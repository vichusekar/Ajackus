import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Home() {
    let [data, setData] = useState([])
    let navigate = useNavigate()

    let handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
            setData(data.filter((item) => item.id != id))
            toast.success("User deleted successfully!")
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.error || error.response.data.message)
        }
    };

    let handleGetData = async () => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
            setData(res.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch users.")
        }
    };

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <div>
            {data &&
                data.map((user, i) => (
                    <Card style={{ width: '60rem' }} className="bg-color" key={user.id}>
                        <Card.Body>
                            <Card.Text>
                                <p><strong>Id:</strong> {i + 1}</p>
                                <p><strong>First Name:</strong> {user.name}</p>
                                <p><strong>Last Name:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Department:</strong> {user.company.name}</p>
                            </Card.Text>
                            <div className="action-button">
                                <i className="fa-solid fa-pen" style={{ color: "#052c65", cursor: "pointer", marginLeft: '20px' }} onClick={() => navigate(`/users/${user.id}`)}></i>
                                <i className="fa-solid fa-trash" style={{ color: "#d1625a", cursor: "pointer", marginLeft: '40px' }} onClick={() => handleDelete(user.id)} ></i>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
        </div>
    );
}

export default Home
