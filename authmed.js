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

//Info perfil
//verifica CPF
function TestaCPF(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;

if (strCPF == "00000000000") return false;

for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
};

var strCPF = document.getElementById('cpf');

strCPF.addEventListener('change', e=>{
var validar = TestaCPF(strCPF.value);
if(validar == false){
document.getElementById('errocpf').innerHTML = "CPF inválido."
 };
});

//Foto
var btnPfp = document.getElementById('imageUpload');

btnPfp.addEventListener('change', e =>{
    const file = e.target.files[0];
    const filename = file.name;
    const ref = firebase.storage().ref('/users/' + filename);
    const task = ref.put(file);
    task.then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
       var pfp = document.getElementById('imageUpload');
       pfp.src = url;
      })
      .catch(console.error);
});

//Cadastro outras info 
btnCadastrar.addEventListener('click', e =>{
  var user = firebase.auth().currentUser;
  var TXTnome = document.getElementById('userName');
  var TXTcidade = document.getElementById('city');
  var TXTestado = document.getElementById('estado');
  var TXTespecialidade = document.getElementById('especialidade');
  var telefone = document.getElementById('telefone');
  var CRM = document.getElementById('crm');
  e.preventDefault();

  //convênio
  var convenio = document.getElementsById('convenio');
  var checkC;
  if(convenio.checked) {
    checkC = "s";
} else {
    checkC = "n";
}
 
//telemedicina
var telemed = document.getElementsById('telemed');
var checkTM;
if(telemed.checked) {
  checkTM = "s";
} else {
  checkTM = "n";
}


  user.updateProfile({
    displayName: TXTnome.value, 
    photoURL: btnPfp.src
  });
  return firebase.firestore().collection('users').doc(user.uid).set({  
      nome: TXTnome.value,
      cidade: TXTcidade.value,
      estado: TXTestado.value,
      especialidade: TXTespecialidade.value,
      telefone: telefone.value,
      cpf: strCPF.value,
      convenio: checkC,
      telemedicina: checkTM,
      crm: CRM.value,
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

