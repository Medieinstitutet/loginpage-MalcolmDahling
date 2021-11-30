//add users to localstorage.
let users = [
    {username:'janne', password:'test'},
    {username:'gunde', password:'svan'},
    {username:'1', password:'1'}
];


if( JSON.parse(localStorage.getItem('storageUsers')) === null ){
    localStorage.setItem( "storageUsers", JSON.stringify(users) ); //store users in localStorage.
}

let storageUsers = JSON.parse(localStorage.getItem('storageUsers')); //add users to a variable for use the rest of the code.
users = JSON.parse(localStorage.getItem('storageUsers')); //add users to a variable for use the rest of the code.


//if not already logged in, set loggedIn to false.
let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
if(!loggedIn){
    loggedIn = {'loggedIn':'false', 'username':'', 'password':''};
    localStorage.setItem( 'loggedIn', JSON.stringify(loggedIn) );
}




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
            document.getElementById('main').innerHTML = '<p>Wrong username or password.</p>';
        }
    });





    document.getElementById('main').innerHTML = `
        <p>Welcome! You can log in in the upper right corner, or you can create a new account here:</p>
        <form>
            <input type="text" placeholder="Username" id="createUsername"></input>
            <input type="password" placeholder="Password" id="createPassword"></input>
            <input type="button" value="Create" id="createButton"></input>
        </form>`;

    document.getElementById('createButton').addEventListener('click', function(){

        let createUsername = document.getElementById('createUsername').value;
        let createPassword = document.getElementById('createPassword').value;


        //check if username already exists.
        let exists = 0;
        for(let i = 0; i < users.length; i++){
            if(createUsername == users[i].username){
                alert('Username already exists.');
                exists = 1;
            }
        }


        if(!createUsername || !createPassword){
            alert('Please fill in both a username and a password.');
        }

        else if(exists == 0){
            users.push({'username':createUsername, 'password':createPassword});
            localStorage.setItem( "storageUsers", JSON.stringify(users) ); //store users in localStorage.
            storageUsers = JSON.parse(localStorage.getItem('storageUsers')); //add users to a variable for use the rest of the code.
            document.getElementById('createUsername').value = '';
            document.getElementById('createPassword').value = '';
            alert('Account created!');
        }

    });
  
}


