//add users to localstorage
let users = [
    {username:'janne', password:'test'},
    {username:'gunde', password:'svan'}
];
localStorage.setItem( "storageUsers", JSON.stringify(users) );
let storageUsers = JSON.parse(localStorage.getItem('storageUsers'));
let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));




if(loggedIn.loggedIn == 'true'){
    renderLoggedIn();
}

else{
    renderLoggedOut();
}



function renderLoggedIn(){
    document.getElementById('headerRight').innerHTML =
    `<div id="headerRight">
        <p>Welcome `+loggedIn.username+`!</p>
        <form>
            <input type="button" value="Logout" id="logoutButton"></input>
        </form>
    </div>`;

    document.getElementById('main').innerHTML = '<p>Welcome back ' + loggedIn.username + '!</p>';

    document.getElementById('logoutButton').addEventListener('click', function(){
        loggedIn = {'loggedIn':'false', 'username':'', 'password':''};
        localStorage.setItem( 'loggedIn', JSON.stringify(loggedIn) );
        renderLoggedOut();
    });
}



function renderLoggedOut(){
    document.getElementById('headerRight').innerHTML =
    `<div id="headerRight">
        <form>
            <input type="text" placeholder="Username" id="loginUsername"></input>
            <input type="password" placeholder="Password" id="loginPassword"></input>
            <input type="button" value="Login" id="loginButton"></input>
        </form>
    </div>`;

    document.getElementById('main').innerHTML = '<p>Welcome! You can log in in the upper right corner, there you can also create a new account.</p>';

    document.getElementById('loginButton').addEventListener('click', function(){
        let username = document.getElementById('loginUsername').value;
        let password = document.getElementById('loginPassword').value;
    
        for(let i = 0; i < storageUsers.length; i++){
            if(username == storageUsers[i].username){
                if(password == storageUsers[i].password){
                    loggedIn = {'loggedIn':'true', 'username':username, 'password':password};
                    localStorage.setItem( 'loggedIn', JSON.stringify(loggedIn) );
                    renderLoggedIn();
                }
            }
        }
    
        if(loggedIn.loggedIn == 'false'){
            alert('Wrong username or password.');
        }
    });
}