
export default function userAuth(redirect) {
    if(!redirect) redirect = '#';
    console.log("Authenticating user... => ", localStorage.getItem('token') ? "true" : "false");
    const token = localStorage.getItem('token');
    if(token){
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
        };
        fetch('http://localhost:3333/auth', requestOptions)
            .then(response => response.json())
            .then(data => {
                const { status, message , decoded  } = data;
                if(data.status === 'ok'){
                    console.log(`Auth status => ${status} : ${message} => Username: ${decoded.username}`);
                    localStorage.setItem('username', decoded.username);
                    localStorage.setItem('isLoggedIn', 'true');
                    console.log("Redirecting to => ", redirect);
                    if(redirect !== '#') window.location.href = redirect;
                    return true;
                } else {
                    console.log(`Auth status => ${status} : ${message}`);
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.setItem('isLoggedIn', 'false');
                    return false;
                }
            });
    }else{
        return false;
    }
}