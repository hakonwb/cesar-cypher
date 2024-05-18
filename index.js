
const readlineSync = require('readline-sync')
const fs = require('fs');
const path = require('path');

function cesarCipher(str, idx){
    let result ='';
    let alphabet= 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(letter of str){
        let index = alphabet.indexOf(letter);
        if(index !== -1){
            let newIndex = (index + idx) %26;
            let newLetter = alphabet[newIndex];
            result += newLetter;
        }
        
    }
    return result;
}

function registerUser(){
    let userName = readlineSync.question('enter your name: ');
    let password =readlineSync.question('Enter your password: ');

    let passwordCifrada = cesarCipher(password, 7);

    addUser(userName,passwordCifrada);

    console.log('Welcome ' + userName);
    console.log('Password ' + password);
    console.log(passwordCifrada)
}


function addUser(userName, passwordCifrada){
    const filepath = path.join(__dirname, 'users.json');
    let users = [];

    fs.readFile(filepath, (err, data) => {
        if(err) {
         users;
        }
        else{
            users = JSON.parse(data);
        }
        users.push({userName, passwordCifrada});
        fs.writeFile(filepath, JSON.stringify(users), (err)=> {
            if(err){
                console.log("Error adding user");
            }
            else{
                console.log('User added');
            }
        })
    })
}

function login(){
    let userName = readlineSync.question('Enter your name: ');
    let password =readlineSync.question('Enter your password: ');

    const filepath = path.join(__dirname, 'users.json');

    fs.readFile(filepath, (err,data) =>{
        if(err){
            console.log("Error reading file");
        }
        else{
            for (let userNames of JSON.parse(data)){
                if(userName === userNames.userName &&
                cesarCipher(password,7) === userNames.passwordCifrada){
                    console.log('Welcome', userName);
                    return;
                }
                else{
                    console.log('Wrong user or password');
                }
            }
        }
    })
}



login();
//registerUser();
//console.log(cesarCipher("hola",2))
