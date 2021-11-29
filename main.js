//add users to localstorage
let users = [
    {username:'janne', password:'test'},
    {username:'gunde', password:'svan'}
];
localStorage.setItem( "storageUsers", JSON.stringify(users) );
let storageUsers = JSON.parse(localStorage.getItem('storageUsers'));
let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));




if(loggedIn.loggedIn == 'true'){

    document.getElementById('header').innerHTML +=
    `
        <p>Välkommen `+loggedIn.username+`!</p>
        <form>
            <input type="submit" value="Logout" id="logoutButton"></input>
        </form>
    `

    document.getElementById('logoutButton').addEventListener('click', function(){
        loggedIn = {'loggedIn':'false', 'username':'', 'password':''};
        localStorage.setItem( 'loggedIn', JSON.stringify(loggedIn) );
    });
}

else{
    document.getElementById('header').innerHTML +=
    `
    <form>
        <input type="text" placeholder="Username" id="loginUsername"></input>
        <input type="password" placeholder="Password" id="loginPassword"></input>
        <input type="submit" value="Login" id="loginButton"></input>
    </form>
    `;

    document.getElementById('loginButton').addEventListener('click', function(){
        let username = document.getElementById('loginUsername').value;
        let password = document.getElementById('loginPassword').value;
    
        for(let i = 0; i < storageUsers.length; i++){
            if(username == storageUsers[i].username){
                if(password == storageUsers[i].password){
                    loggedIn = {'loggedIn':'true', 'username':username, 'password':password};
                    localStorage.setItem( 'loggedIn', JSON.stringify(loggedIn) );
                }
            }
        }
    
        if(loggedIn.loggedIn == 'false'){
            alert('Wrong username or password.');
        }
    });
}



