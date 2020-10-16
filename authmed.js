// Pega os campos
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
  
  e.preventDefault();

  firebase.auth().createUserWithEmailAndPassword(email, pass).then(
      function(){
      window.location.href = "cadastromed.html";
    });
}); 

//Cadastro outras info 
btnCadastrar.addEventListener('click', e =>{
  var user = firebase.auth().currentUser;
  var TXTnome = document.getElementById('userName');
  var TXTlocal = document.getElementById('local');
  var TXTespecialidade = document.getElementById('especialidade');
  var conveniado = document.getElementById('conveniado');
  var telemed = document.getElementById('telemed')
  e.preventDefault();

  user.updateProfile({
    displayName: TXTnome.value 
    //photoURL: 
  });
  return firebase.firestore().collection('users').doc(user.uid).set({  
      nome: TXTnome.value,   
      local: TXTlocal.value,
      especialidade: TXTespecialidade.value,
      convenio: conveniado.value,
      telemedicina: telemed.value,
      tipo: 'medico'
    }).then(function() {
      window.location.replace("mainmed.html");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  
});

//Identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user){
        //identifica se já está cadastrado ou é a primeira vez
        if(user.displayName != null){
          window.location.replace("mainmed.html") ;
          };
          console.log(user);   
    }else {
      console.log('não logado');
    };
  });

//Logout
  btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut(); 
});

