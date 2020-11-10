let conversas = [];
var db = firebase.firestore().collection('chat').where("Id_p", "==", user.uid);
   db.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          conversas.push({...doc.data(), id: doc.id});
        });
        let html = '';
        conversas.forEach(conversa => {
            //html =+ finge que tem a linha da pfp
          html += `<li data-id= ${conversa.id} onclick="chatpg(this)">`;
          html += `<h5> ${conversa.medico}</h5>`;
          html += `<p id="ultima"></p>`;
          html += `</li>`;

                    //pesquisa a última msg no chat
                    var refs = db.collection('mensagens').get();
                    const lastmsg = refs.docs[snapshot.docs.length - 1];
                    var aMsg = lastmsg.data().text;
                    document.getElementById('ultima').innerHTML = aMsg;

                    var db2 = firebase.firestore().collection('users').doc(conversa.Id_m);
                    db2.onSnapshot(snapshot =>{
                        var pfp = snapshot.data().pfp;
                        document.getElementById('imgPfp').style = "background-image: url('"+ pfp +"')";
                    })

        });
        document.getElementById('meuchat').innerHTML = html;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });