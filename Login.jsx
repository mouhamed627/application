import { useState } from 'react';
import LoginSucceed from './LoginSucceed';
import { useNavigate } from 'react-router-dom';  
import './Tasks';
import './App.css';

function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
        email: "",
        phone_number: ""
    });

    const navigate = useNavigate(); 

    function handleButtonClick(event) {
        event.preventDefault();

        if (inputs.name.length > 30) {
            setErrorMessage('Error: The name is too long');
            setShowMessage(true);
        } else if (inputs.age > 100 || inputs.age < 18) {
            setErrorMessage('Error: The age is invalid');
            setShowMessage(true);
        } else if (inputs.email.length < 10 || !inputs.email.includes('@')) {
            setErrorMessage('Error: The email must contain a few characters before @');
            setShowMessage(true);
        } else if (inputs.phone_number.length !== 8 || isNaN(inputs.phone_number)) {
            setErrorMessage('Error: The phone number must have 8 digits');
            setShowMessage(true);
        } else {
            setErrorMessage(null); 
            setShowMessage(true); 
            setTimeout(() => {
                setShowMessage(false);  
                navigate('/Tasks',{state:{name:inputs.name}});  
            }, 2000);  
        }
    }

    function handleDivClick() {
        if (showMessage && errorMessage) {
            setErrorMessage(null);
            setShowMessage(false);
        }
    }

    const btnIsDisabled = inputs.name === ''
        || inputs.age === ''
        || inputs.email === ''
        || inputs.phone_number === ''
        || isNaN(inputs.age)
        || isNaN(inputs.phone_number)
        || !inputs.email.endsWith('@gmail.com');

    return (
        <div onClick={handleDivClick}>
            <form className='Login' style={{ flexDirection: "column" }}>
                <label>Name:</label>
                <input value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                <label>Age:</label>
                <input value={inputs.age} onChange={(e) => setInputs({ ...inputs, age: e.target.value })} />
                <label>Email:</label>
                <input type='email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                <label>Phone Number:</label>
                <input value={inputs.phone_number} onChange={(e) => setInputs({ ...inputs, phone_number: e.target.value })} />
                <button className={btnIsDisabled ? 'Disabled' : 'Enabled'} onClick={handleButtonClick} disabled={btnIsDisabled}>
                    Submit
                </button>
            </form>

            <LoginSucceed errorMessage={errorMessage} isVisible={showMessage} />
        </div>
    );
}

export default Login;
