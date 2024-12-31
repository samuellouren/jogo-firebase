 // Import the functions you need from the SDKs you need
 import firebase from "firebase/compat/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyA1oYEaKXO9b7O8rGJu9wRFFHzAX3NKzqg",
   authDomain: "jogo-firebase-dddc2.firebaseapp.com",
   databaseURL: "https://jogo-firebase-dddc2-default-rtdb.firebaseio.com",
   projectId: "jogo-firebase-dddc2",
   storageBucket: "jogo-firebase-dddc2.firebasestorage.app",
   messagingSenderId: "144537586641",
   appId: "1:144537586641:web:d4cae04fb3d17dd5f76ef0"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = firebase.firestore(app);

 const gameButton = document.getElementById('gameButton');
 const startGameButton = document.getElementById('startGame');
 const scoreDisplay = document.getElementById('score');
 const leaderboard = document.getElementById('leaderboard');

 let pontuaçao = 0
 let jogoAtivo = false;


 startGameButton.addEventListener('click', () => {
  console.log("Jogo iniciado!");
  pontuacao = 0; // Zera a pontuação
  scoreDisplay.textContent = `Pontuação: ${pontuacao}`; // Atualiza o texto da pontuação
  jogoAtivo = true; // Ativa o jogo
  gameButton.disabled = false; // Ativa o botão do jogo
  startGameButton.disabled = true; // Desativa o botão de iniciar

  // Timer de 10 segundos para o jogo
  setTimeout(() => {
      console.log("Tempo esgotado!");
      jogoAtivo = false;
      gameButton.disabled = true; // Desativa o botão do jogo
      startGameButton.disabled = false; // Reativa o botão de iniciar
      salvarPontuacao(pontuacao); // Salva a pontuação
  }, 10000);
});

gameButton.addEventListener('click', () => {
  if (jogoAtivo) {
      pontuacao++;
      scoreDisplay.textContent = `Pontuação: ${pontuacao}`;
  }
});

async function salvarPontuacao(pontuacao) {
      const nomeJogador = prompt("Digite seu nome:");
      if (nomeJogador) {
        await db.collection('scores').add({
          name: nomeJogador,
          score: pontuacao,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        buscarPontuacoes();
      }  
}

async function buscarPontuacoes() {
      const scoresSnapshot = await db.collection('scores').orderBy('score', 'desc').limit(10).get();
      leaderboard.innerHTML = '';
      scoresSnapshot.forEach(doc => {
          const data = doc.data();
          const li = document.createElement('li')
          li.textContent = `${data.name}: ${data.score}`;
          leaderboard.appendChild(li);
      });
}

buscarPontuacoes();