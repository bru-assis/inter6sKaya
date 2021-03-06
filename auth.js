
const txtEmail = document.getElementById('txtEmail');
const txtPwd = document.getElementById('txtPwd');
const btnLogin = document.getElementById('btnLogin');
const btnCreate = document.getElementById('btnCreate');
const btnLogOut = document.getElementById('btnLogOut');

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
        const btnCadastrar = document.getElementById('btnCadastrar');

        btnCadastrar.addEventListener('click', e =>{
        var user = firebase.auth().currentUser;
        var TXTnome = document.getElementById('userName');
        var TXTlocal = document.getElementById('local');
        var TXTtipo = document.getElementById('userTipo');
    
        e.preventDefault();
    
        user.updateProfile({
          displayName: TXTnome.value 
          //photoURL: 
        });
        return firebase.firestore().collection('users').doc(user.uid).set({    
            local: TXTlocal.value,
            tipo: TXTtipo
          }).then(function() {
              //identifica se é médico ou paciente
              if(TXTtipo == "medico"){
                window.location.replace("mainpagemed.html");
              }else{
                window.location.replace("mainpagepaciente.html");
              }
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
    });
       


//Identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //identifica se já está cadastrado ou é a primeira vez
        if(user.displayName == null){
            window.location.href = "formcadastro.html" ;
          }else{ 
            function (){
                //identifica se é médico ou paciente
                const user = firebase.auth().currentUser;
                const ref = firebase.firestore().collection('users').doc(user.uid);
            
                ref.onSnapshot(snapshot => {
                  var tipo = snapshot.data().tipo;
                  console.log(tipo);
                  if(tipo == "medico"){
                    window.location.replace("mainpagemed.html") ;
                   }else{
                    window.location.replace("mainpagepaciente.html") ; 
                   }
                });
             
            }
          }
          console.log(user);   
    } else {
      console.log('não logado');
    }
  });


// Sign Out

btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut(); 
});
