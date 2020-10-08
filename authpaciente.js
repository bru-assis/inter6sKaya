const txtEmail = document.getElementById('txtEmail');
const txtPwd = document.getElementById('txtPwd');
const btnLogin = document.getElementById('btnLogin');
const btnCreate = document.getElementById('btnCreate');
const btnLogOut = document.getElementById('btnLogOut');
const btnCadastrar = document.getElementById('btnCadastrar');

// LogIn
btnLogin.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPwd.value;

    firebase.auth().signInWithEmailAndPassword(email, pass);
    
  e.preventDefault();
});

// SignUp
btnCreate.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPwd.value;
    const TXTbio = document.getElementById('bio');
    const TXTlocal = document.getElementById('local');
    
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(email, pass);


        //Cadastro outras info 
        btnCadastrar.addEventListener('click', e =>{
        var user = firebase.auth().currentUser;
        var TXTnome = document.getElementById('userName');
        var TXTlocal = document.getElementById('local');
    
        e.preventDefault();
    
        user.updateProfile({
          displayName: TXTnome.value 
          //photoURL: 
        });
        return firebase.firestore().collection('users').doc(user.uid).set({  
            nome: TXTnome.value,   
            local: TXTlocal.value,
            tipo: 'paciente'
          }).then(function() {
                window.location.replace("mainpaciente.html");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
    });
       


//Identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user){
        //identifica se já está cadastrado ou é a primeira vez
        if(user.displayName == null){
            window.location.href = "formcadastropaciente.html" ;
          }else{ 
            window.location.replace("mainpaciente.html") ;
           };
          console.log(user);   
    }else {
      console.log('não logado');
    };
  });