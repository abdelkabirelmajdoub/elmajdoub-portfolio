const matches = [
  { id: 'martil-social', day: 'Sat', time: '17:00', name: 'Golden hour at Martil', place: 'Martil beach', type: 'beach', level: 'social', spots: 4, format: '4 vs 4' },
  { id: 'tetouan-indoor', day: 'Sun', time: '11:00', name: 'Sunday rally club', place: 'Tetouan · indoor court', type: 'indoor', level: 'intermediate', spots: 2, format: '6 vs 6' },
  { id: 'martil-doubles', day: 'Sun', time: '16:30', name: 'Two sides, endless rallies', place: 'Martil beach', type: 'beach', level: 'intermediate', spots: 1, format: '2 vs 2' }
];
const storageKey = 'sideout-reservations-v1';
let reserved = new Set();
let storageAvailable = true;
try { const saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(saved)) reserved = new Set(saved.filter(id => matches.some(match => match.id === id))); } catch { storageAvailable = false; }
let filter = 'all';
const list = document.querySelector('#match-list');
const level = document.querySelector('#level');
function render() {
  const visible = matches.filter(match => (filter === 'all' || match.type === filter) && (level.value === 'all' || match.level === level.value));
  list.innerHTML = visible.map(match => {
    const joined = reserved.has(match.id);
    return `<article class="match"><div class="date"><span>${match.day}</span><strong>${match.time}</strong></div><div><h3>${match.name}</h3><p>${match.place}</p><p><span class="tag">${match.type === 'beach' ? 'Beach' : 'Indoor'}</span>${match.level === 'social' ? 'Social · all welcome' : 'Intermediate'}</p></div><div class="spots">${match.spots - Number(joined)} ${match.spots - Number(joined) === 1 ? 'spot' : 'spots'} available<small>${match.format} · Demo match</small></div><button class="join" data-id="${match.id}" aria-pressed="${joined}" aria-label="${joined ? 'Leave' : 'Join'} ${match.name}">${joined ? 'Leave game' : 'Save my spot'}</button></article>`;
  }).join('');
  document.querySelector('#empty').hidden = visible.length !== 0;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  render();
}));
level.addEventListener('change', render);
list.addEventListener('click', event => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  const id = button.dataset.id;
  if (reserved.has(id)) reserved.delete(id); else reserved.add(id);
  try { localStorage.setItem(storageKey, JSON.stringify([...reserved])); storageAvailable = true; } catch { storageAvailable = false; }
  document.querySelector('#status').textContent = (reserved.has(id) ? 'Spot saved for this demo. No real booking was made.' : 'Demo reservation removed.') + (storageAvailable ? '' : ' Browser storage is unavailable; changes last until this page closes.');
  render();
  list.querySelector(`[data-id="${id}"]`)?.focus();
});
render();
