import './Login.css'
export default function Login () {
    return(
        <div className="login-container">
            <div className='login-box'>
                <h1>Login</h1>
                <div>
                    <input className="login-field" name="Login" placeholder='Username'></input> 
                    <input className="login-field" name="Login" type="password" placeholder='Password'></input>
                </div>
                <div className='login-button-group'>
                    <button>Continue</button>
                </div>
            </div>
        </div>
    )
}