import { db } from './firebase-config.js';
import { collection, doc, updateDoc, addDoc, getDoc, onSnapshot, arrayUnion, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { logout } from './auth.js';

const uid = localStorage.getItem('uid');
if (!uid) window.location.href = 'login.html';

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logout);

const itemInput = document.getElementById('itemInput');
const qtyInput = document.getElementById('qtyInput');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('listContainer');

let listId = localStorage.getItem('listId');

async function initList() {
  if (!listId) {
    const listRef = await addDoc(collection(db, 'lists'), {
      users: [uid],
      items: [],
      createdAt: serverTimestamp()
    });
    listId = listRef.id;
    localStorage.setItem('listId', listId);
  }
  listenToList();
}

function listenToList() {
  const docRef = doc(db, 'lists', listId);
  onSnapshot(docRef, (snap) => {
    const data = snap.data();
    renderList(data.items || []);
  });
}

async function addItem() {
  const name = itemInput.value.trim();
  const qty = qtyInput.value;
  if (!name) return;
  const docRef = doc(db, 'lists', listId);
  const snap = await getDoc(docRef);
  const data = snap.data();
  data.items.push({ name, qty, addedBy: uid, done: false, createdAt: Date.now() });
  await updateDoc(docRef, { items: data.items });
  itemInput.value = '';
}

function renderList(items) {
  listContainer.innerHTML = '';
  items.forEach((it, i) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center p-2 bg-white rounded shadow';
    li.innerHTML = `<span>${it.name} (${it.qty})</span>`;
    listContainer.appendChild(li);
  });
}

addBtn.addEventListener('click', addItem);
initList();
