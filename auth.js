import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const errorDiv = document.getElementById('error');

if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      localStorage.setItem('uid', userCred.user.uid);
      window.location.href = 'index.html';
    } catch (e) {
      errorDiv.textContent = e.message;
    }
  });
}

if (signupBtn) {
  signupBtn.addEventListener('click', async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      localStorage.setItem('uid', userCred.user.uid);
      window.location.href = 'index.html';
    } catch (e) {
      errorDiv.textContent = e.message;
    }
  });
}

export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('uid');
  window.location.href = 'login.html';
};
