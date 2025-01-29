import PropTypes from 'prop-types';

function LoginSucceed({ isVisible, errorMessage = null }) {
    if (isVisible) {
        return (
            <div id="sign">
                <div id="signContent">
                    <h1 style={{ color: errorMessage ? 'red' : 'green' }}>
                        {errorMessage || 'Login Succeed!'}
                    </h1>
                </div>
            </div>
        );
    }
    return null; 
}

LoginSucceed.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string 
};

export default LoginSucceed;
