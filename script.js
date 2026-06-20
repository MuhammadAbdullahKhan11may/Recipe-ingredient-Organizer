
// ══════════════════════════════════════════════════════════════
//  RECIPE ORGANIZER — script.js
//  DSA Concepts Used:
//    1. Linked List   — RecipeLinkedList (dynamic recipe storage)
//    2. Stack         — DeleteStack (undo-delete, LIFO)
//    3. Queue         — RecentQueue (recently added recipes, FIFO)
//    4. Hash Table    — HashMap (O(1) recipe lookup by name)
//    5. BST           — IngredientBST (sorted ingredient traversal)
//    6. Binary Search — binarySearchRecipe (O(log n) name search)
// ══════════════════════════════════════════════════════════════


// ── DSA 1: BST NODE & TREE ────────────────────────────────────
// Stores ingredient names in sorted order via in-order traversal.
// Insert: O(log n) avg | Traversal: O(n)
class BSTNode {
  constructor(key) { this.key = key; this.left = null; this.right = null; }
}

class IngredientBST {
  constructor() { this.root = null; }

  insert(key) {
    const node = new BSTNode(key);
    if (!this.root) { this.root = node; return; }
    let cur = this.root;
    while (true) {
      if (key === cur.key) return;           // no duplicates
      if (key < cur.key) {
        if (!cur.left)  { cur.left  = node; return; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = node; return; }
        cur = cur.right;
      }
    }
  }

  // In-order traversal → returns alphabetically sorted array
  inorder(node = this.root, result = []) {
    if (!node) return result;
    this.inorder(node.left, result);
    result.push(node.key);
    this.inorder(node.right, result);
    return result;
  }

  toSortedList() { return this.inorder(); }
}

// Helper: given array of ingredient names, return sorted via BST
function sortedIngredientNames(ings) {
  const bst = new IngredientBST();
  ings.forEach(i => bst.insert(i));
  return bst.toSortedList();
}


// ── DSA 2: LINKED LIST ────────────────────────────────────────
// Stores recipes as a singly linked list.
// Append: O(n) | Delete by index: O(n) | Traversal: O(n)
class LLNode {
  constructor(data) { this.data = data; this.next = null; }
}

class RecipeLinkedList {
  constructor() { this.head = null; this._size = 0; }

  append(recipe) {
    const node = new LLNode(recipe);
    if (!this.head) { this.head = node; }
    else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
    this._size++;
  }

  // Remove node at 0-based index, return removed data
  removeAt(index) {
    if (index < 0 || index >= this._size) return null;
    let removed;
    if (index === 0) {
      removed = this.head.data;
      this.head = this.head.next;
    } else {
      let cur = this.head;
      for (let i = 0; i < index - 1; i++) cur = cur.next;
      removed = cur.next.data;
      cur.next = cur.next.next;
    }
    this._size--;
    return removed;
  }

  getAt(index) {
    let cur = this.head;
    for (let i = 0; i < index; i++) {
      if (!cur) return null;
      cur = cur.next;
    }
    return cur ? cur.data : null;
  }

  toArray() {
    const arr = [];
    let cur = this.head;
    while (cur) { arr.push(cur.data); cur = cur.next; }
    return arr;
  }

  get size() { return this._size; }
}


// ── DSA 3: STACK (Undo Delete) ────────────────────────────────
// LIFO — last deleted recipe is restored first.
// Push/Pop: O(1)
class DeleteStack {
  constructor(maxSize = 10) { this._data = []; this._max = maxSize; }
  push(item) {
    if (this._data.length >= this._max) this._data.shift(); // drop oldest
    this._data.push(item);
  }
  pop()      { return this._data.length ? this._data.pop()  : null; }
  isEmpty()  { return this._data.length === 0; }
  get size() { return this._data.length; }
}


// ── DSA 4: QUEUE (Recently Added) ────────────────────────────
// FIFO — first added recipe shows first in "recent" panel.
// Enqueue/Dequeue: O(1)
class RecentQueue {
  constructor(maxSize = 5) { this._data = []; this._max = maxSize; }
  enqueue(item) {
    if (this._data.length >= this._max) this._data.shift(); // drop oldest
    this._data.push(item);
  }
  toArray()  { return [...this._data]; }
  isEmpty()  { return this._data.length === 0; }
}


// ── DSA 5: HASH TABLE (Fast Lookup) ──────────────────────────
// Maps recipe name (lowercase) → array index for O(1) lookup.
class RecipeHashMap {
  constructor() { this._map = {}; }
  set(name, index)   { this._map[name.toLowerCase()] = index; }
  get(name)          { return this._map[name.toLowerCase()] ?? -1; }
  delete(name)       { delete this._map[name.toLowerCase()]; }
  // Rebuild entire map from current recipes array
  rebuild(recipesArr) {
    this._map = {};
    recipesArr.forEach((r, i) => this._map[r.name.toLowerCase()] = i);
  }
}


// ══════════════════════════════════════════════════════════════
//  GLOBAL DATA STORES
// ══════════════════════════════════════════════════════════════
const recipeList   = new RecipeLinkedList(); // DSA: Linked List
const deleteStack  = new DeleteStack();      // DSA: Stack
const recentQueue  = new RecentQueue();      // DSA: Queue
const hashMap      = new RecipeHashMap();    // DSA: Hash Table

// Convenience: keep a plain array mirror for indexed access
// (rebuilt whenever recipeList changes)
let recipes = [];

// Temp state while user is building a new recipe in the form
let currentIngTags = []; // [{name, qty}]

// Valid categories
const CATEGORIES = ['Breakfast','Lunch','Dinner','Dessert','Snack','Beverage','Other'];


// ── SYNC HELPER ───────────────────────────────────────────────
// Keeps recipes[] mirror and hashMap in sync with recipeList
function syncMirror() {
  recipes = recipeList.toArray();
  hashMap.rebuild(recipes);
}


// ── UTILS ────────────────────────────────────────────────────
function containsNumber(s) { return /\d/.test(s); }

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = isError ? 'show error' : 'show';
  setTimeout(() => t.className = '', 2400);
}

function validateName(input) {
  const err = document.getElementById('name-error');
  err.textContent = '';
}
function validateIng(input) {
  const err = document.getElementById('ing-error');
  err.textContent = '';
}

function validateQty(input) {}


// ── DSA 6: BINARY SEARCH on recipe names ─────────────────────
// Sorts recipe names, then binary searches → O(n log n) build + O(log n) search
function binarySearchRecipe(name) {
  const sorted = recipes
    .map((r, i) => ({ n: r.name.toLowerCase(), i }))
    .sort((a, b) => a.n.localeCompare(b.n));
  let lo = 0, hi = sorted.length - 1;
  const target = name.toLowerCase().trim();
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid].n === target) return sorted[mid].i;
    else if (sorted[mid].n < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Search by ingredient name — linear scan O(n*m)
function searchByIngredient(ingName) {
  const target = ingName.toLowerCase().trim();
  return recipes
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => r.ingredients.some(ing => ing.name.toLowerCase() === target));
}


// ── PANEL SWITCHING ───────────────────────────────────────────
function showPanel(id) {
  document.querySelectorAll('.main-panel > div').forEach(d => d.classList.add('hidden'));
  document.getElementById('panel-' + id).classList.remove('hidden');
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');

  if (id === 'list')   renderList();
  if (id === 'recent') renderRecent();
  if (['union','intersection','delete'].includes(id)) populateSelects();
}


// ── RENDER: ALL RECIPES ───────────────────────────────────────
function renderList() {
  const c = document.getElementById('recipe-list-container');
  if (!recipes.length) {
    c.innerHTML = '<div class="empty-state">No recipes yet. Click ➕ Add Recipe to get started!</div>';
    return;
  }
  c.innerHTML = recipes.map((r, i) => {
    const ingNames = sortedIngredientNames(r.ingredients.map(x => x.name));
    const badgeColor = categoryColor(r.category);
    return `
    <div class="recipe-card">
      <div style="flex:1">
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.35rem;">
          <div class="recipe-card-name">${r.name}</div>
          <span class="cat-badge" style="background:${badgeColor}22;color:${badgeColor};border:1px solid ${badgeColor}55;">
            ${r.category || 'Other'}
          </span>
        </div>
        <div class="recipe-card-ings">
          ${r.ingredients.length
            ? r.ingredients.map(x => `<span>${x.name}${x.qty ? ' <em style="color:#666">— ' + x.qty + '</em>' : ''}</span>`).join(' &nbsp;·&nbsp; ')
            : '<em style="color:#555">No ingredients</em>'}
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-gray" onclick="viewRecipe(${i})">View</button>
      </div>
    </div>`;
  }).join('');
}

function categoryColor(cat) {
  const map = {
    Breakfast:'#f59e0b', Lunch:'#3b82f6', Dinner:'#8b5cf6',
    Dessert:'#ec4899',   Snack:'#10b981', Beverage:'#06b6d4', Other:'#6b7280'
  };
  return map[cat] || '#6b7280';
}

function viewRecipe(i) {
  const r = recipes[i];
  const color = categoryColor(r.category);

  // Remove existing modal if any
  const existing = document.getElementById('recipe-view-modal');
  if (existing) existing.remove();

  const ingHTML = r.ingredients.length
    ? r.ingredients.map(x => `
        <div class="rvm-ing-row">
          <span class="rvm-ing-name">${x.name}</span>
          ${x.qty ? `<span class="rvm-ing-qty">${x.qty}</span>` : ''}
        </div>`).join('')
    : '<p style="color:#555;font-size:0.88rem;">No ingredients added.</p>';

  const modal = document.createElement('div');
  modal.id = 'recipe-view-modal';
  modal.className = 'rvm-overlay';
  modal.innerHTML = `
    <div class="rvm-box">

      <!-- Header -->
      <div class="rvm-header">
        <div>
          <div class="rvm-title">${r.name}</div>
          <span class="rvm-cat" style="background:${color}22;color:${color};border:1px solid ${color}55;">
            ${r.category || 'Other'}
          </span>
        </div>
        <button class="rvm-close" onclick="document.getElementById('recipe-view-modal').remove();document.body.style.overflow='';">✕</button>
      </div>

      <!-- Divider -->
      <div class="rvm-divider"></div>

      <!-- Ingredients -->
      <div class="rvm-section-label">Ingredients</div>
      <div class="rvm-ing-list">${ingHTML}</div>

      <!-- Footer -->
      <div class="rvm-divider" style="margin-top:1.5rem;"></div>
      <div style="text-align:right;">
        <button class="btn btn-green" style="font-size:0.82rem;padding:0.55rem 1.2rem;"
          onclick="document.getElementById('recipe-view-modal').remove();document.body.style.overflow='';">
          Close
        </button>
      </div>

    </div>`;

  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  });

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}


// ── RENDER: RECENT QUEUE ──────────────────────────────────────
function renderRecent() {
  const c = document.getElementById('recent-list');
  const items = recentQueue.toArray();
  if (!items.length) {
    c.innerHTML = '<div class="empty-state">No recently added recipes yet.</div>';
    return;
  }
  // Show newest first (reverse of FIFO order)
  c.innerHTML = [...items].reverse().map(r => `
    <div class="recipe-card">
      <div>
        <div class="recipe-card-name">${r.name}
          <span class="cat-badge" style="margin-left:0.5rem;background:${categoryColor(r.category)}22;
            color:${categoryColor(r.category)};border:1px solid ${categoryColor(r.category)}55;">
            ${r.category || 'Other'}
          </span>
        </div>
        <div class="recipe-card-ings">
          ${r.ingredients.map(x => x.name + (x.qty ? ' — ' + x.qty : '')).join(', ') || '<em style="color:#555">No ingredients</em>'}
        </div>
      </div>
    </div>`).join('');
}


// ── ADD RECIPE: INGREDIENT TAG WITH QUANTITY ──────────────────
function addIngredientTag() {
  const ingInput = document.getElementById('ing-input');
  const qtyInput = document.getElementById('qty-input');
  const name = ingInput.value.trim();
  const qty  = qtyInput.value.trim();

  if (!name) { showToast('Enter an ingredient name first', true); return; }
  

  // Quantity validation: if entered, must start with a number
  if (qty !== '') {
    const validQty = /^[\d\/\.\s]*(g|kg|ml|l|oz|lb|cup|cups|tsp|tbsp|litre|liter|litres|liters|piece|pieces|slice|slices|unit|units)?$/i.test(qty);
    if (!validQty) {
      const err = document.getElementById('qty-error');
      if (err) err.textContent = '✗ Quantity must start with a number (e.g. 2 cups, 500g, 1/2 tsp).';
      document.getElementById('qty-input').focus();
      return;
    }
  }

  // Clear qty error if valid
  const err = document.getElementById('qty-error');
  if (err) err.textContent = '';
  if (currentIngTags.find(t => t.name.toLowerCase() === name.toLowerCase())) {
    showToast('Duplicate ingredient!', true); return;
  }

  currentIngTags.push({ name: name.toLowerCase(), qty });
  renderTags();
  ingInput.value = '';
  qtyInput.value = '';
  ingInput.focus();
  document.getElementById('ing-error').textContent = '';
}

function renderTags() {
  document.getElementById('ing-tags').innerHTML = currentIngTags.map((t, i) => `
    <span class="tag">
      ${t.name}${t.qty ? `<em style="opacity:0.7;font-style:normal"> — ${t.qty}</em>` : ''}
      <span class="tag-remove" onclick="removeTag(${i})">✕</span>
    </span>`).join('');
}

function removeTag(i) { currentIngTags.splice(i, 1); renderTags(); }

function submitRecipe() {
  const name = document.getElementById('add-name').value.trim();
  const cat  = document.getElementById('add-category').value;

  if (!name) { showToast('Recipe name is required!', true); return; }


  const recipe = { name, category: cat, ingredients: [...currentIngTags] };

  // DSA: append to Linked List
  recipeList.append(recipe);
  syncMirror();

  // DSA: enqueue into Recent Queue
  recentQueue.enqueue(recipe);

  currentIngTags = [];
  document.getElementById('add-name').value = '';
  document.getElementById('ing-tags').innerHTML = '';
  showToast(`'${name}' added! ✓`);
}


// ── SET OPERATIONS ────────────────────────────────────────────
function populateSelects() {
  ['union-a','union-b','inter-a','inter-b','delete-select'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = recipes.map((r, i) =>
      `<option value="${i}">${r.name} [${r.category || 'Other'}]</option>`).join('');
  });
}

// Union: combine ingredient names (ignores qty — names only for set ops)
function computeUnion(all) {
  if (!recipes.length) { showToast('No recipes!', true); return; }
  let nameSet;
  if (all) {
    nameSet = new Set(recipes.flatMap(r => r.ingredients.map(x => x.name)));
  } else {
    const a = +document.getElementById('union-a').value;
    const b = +document.getElementById('union-b').value;
    nameSet = new Set([
      ...recipes[a].ingredients.map(x => x.name),
      ...recipes[b].ingredients.map(x => x.name)
    ]);
  }
  showResult('union-result', all ? 'Union — ALL Recipes' : 'Union A ∪ B', [...nameSet]);
}

// Intersection: common ingredient names
function computeIntersection(all) {
  if (recipes.length < 2) { showToast('Need at least 2 recipes!', true); return; }
  let result;
  if (all) {
    result = new Set(recipes[0].ingredients.map(x => x.name));
    for (let i = 1; i < recipes.length; i++) {
      const s = new Set(recipes[i].ingredients.map(x => x.name));
      result = new Set([...result].filter(x => s.has(x)));
    }
  } else {
    const a  = +document.getElementById('inter-a').value;
    const b  = +document.getElementById('inter-b').value;
    const sb = new Set(recipes[b].ingredients.map(x => x.name));
    result   = new Set(recipes[a].ingredients.map(x => x.name).filter(x => sb.has(x)));
  }
  showResult('inter-result', all ? 'Common — ALL Recipes' : 'Intersection A ∩ B', [...result]);
}

function showResult(elId, label, items) {
  const box = document.getElementById(elId);
  box.classList.remove('hidden');
  // DSA: sort items via BST
  const sorted = sortedIngredientNames(items);
  box.innerHTML = `
    <div class="result-label">${label}</div>
    <div class="result-tags">${sorted.length
      ? sorted.map(i => `<span class="result-tag">${i}</span>`).join('')
      : '<span style="color:#555">∅ Empty set</span>'
    }</div>`;
}


// ── SEARCH ────────────────────────────────────────────────────
function searchRecipe() {
  const q   = document.getElementById('search-input').value.trim();
  const box = document.getElementById('search-result');
  if (!q) { box.innerHTML = ''; return; }

  // DSA: Hash Table O(1) lookup first
  let idx = hashMap.get(q);

  // Fallback: Binary Search O(log n)
  if (idx === -1) idx = binarySearchRecipe(q);

  if (idx === -1) {
    box.innerHTML = `<div class="result-box">
      <span style="color:#ef4444">❌ Recipe '<strong>${q}</strong>' not found.</span>
    </div>`;
  } else {
    const r = recipes[idx];
    box.innerHTML = `<div class="result-box">
      <div class="result-label">✓ Found via Hash Table / Binary Search — position ${idx + 1}</div>
      <div style="font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:0.75rem;">
        ${r.name}
        <span class="cat-badge" style="margin-left:0.5rem;font-size:0.75rem;
          background:${categoryColor(r.category)}22;color:${categoryColor(r.category)};
          border:1px solid ${categoryColor(r.category)}55;">${r.category || 'Other'}</span>
      </div>
      <div class="result-tags">
        ${r.ingredients.length
          ? r.ingredients.map(x =>
              `<span class="result-tag">${x.name}${x.qty ? ' <em style="opacity:0.7"> — ' + x.qty + '</em>' : ''}</span>`
            ).join('')
          : '<span style="color:#555">No ingredients</span>'}
      </div>
    </div>`;
  }
}

// Search by ingredient — shows all recipes that contain it
function searchByIngredientUI() {
  const q   = document.getElementById('ing-search-input').value.trim();
  const box = document.getElementById('ing-search-result');
  if (!q) { box.innerHTML = ''; return; }

  const matches = searchByIngredient(q);
  if (!matches.length) {
    box.innerHTML = `<div class="result-box">
      <span style="color:#ef4444">❌ No recipes contain '<strong>${q}</strong>'.</span>
    </div>`;
  } else {
    box.innerHTML = `<div class="result-box">
      <div class="result-label">Recipes containing '${q}' — ${matches.length} found</div>
      ${matches.map(({ r, i }) => {
        const ing = r.ingredients.find(x => x.name.toLowerCase() === q.toLowerCase());
        return `<div style="margin-bottom:0.6rem;">
          <span style="color:#fff;font-weight:600;">${r.name}</span>
          <span class="cat-badge" style="margin-left:0.4rem;font-size:0.72rem;
            background:${categoryColor(r.category)}22;color:${categoryColor(r.category)};
            border:1px solid ${categoryColor(r.category)}55;">${r.category || 'Other'}</span>
          ${ing && ing.qty ? `<span style="color:#888;font-size:0.82rem;margin-left:0.4rem;">— qty: ${ing.qty}</span>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  }
}


// ── DELETE / UNDO ─────────────────────────────────────────────
function deleteSelected() {
  const sel = document.getElementById('delete-select');
  if (!sel || !recipes.length) { showToast('No recipes!', true); return; }

  const i       = +sel.value;
  // DSA: Linked List removeAt
  const removed = recipeList.removeAt(i);
  if (!removed) return;

  syncMirror();

  // DSA: push onto Stack for undo
  deleteStack.push(removed);
  showToast(`'${removed.name}' deleted. Use ↩️ Undo to restore.`);
  populateSelects();
}

function undoDelete() {
  // DSA: pop from Stack
  if (deleteStack.isEmpty()) { showToast('Nothing to undo!', true); return; }
  const r = deleteStack.pop();
  // DSA: append back to Linked List
  recipeList.append(r);
  syncMirror();
  showToast(`'${r.name}' restored! ✓`);
  renderList();
}


// ── HTML PANEL: Add Ingredient row (qty field injected) ───────
// Called once on DOM ready to inject qty input next to ing input
function injectQtyField() {
  const row = document.querySelector('#panel-add .row');
  if (!row) return;
  if (document.getElementById('qty-input')) return;

  const qtyInput = document.createElement('input');
  qtyInput.id          = 'qty-input';
  qtyInput.className   = 'form-input';
  qtyInput.placeholder = 'Quantity (e.g. 2 cups)';
  qtyInput.style.flex  = '0.7';
  qtyInput.oninput     = function() { validateQty(this); };
  qtyInput.onkeydown   = (e) => { if (e.key === 'Enter') addIngredientTag(); };

  const addBtn = row.querySelector('button');
  row.insertBefore(qtyInput, addBtn);

  // Inject qty error message element below the row
  const qtyErr = document.createElement('div');
  qtyErr.id        = 'qty-error';
  qtyErr.style.cssText = 'color:#ef4444;font-size:0.8rem;margin-top:0.3rem;';
  row.after(qtyErr);

  // Category dropdown injection (unchanged)
  const formGroup = document.querySelector('#panel-add .form-group');
  if (formGroup && !document.getElementById('add-category')) {
    const catGroup = document.createElement('div');
    catGroup.className = 'form-group';
    catGroup.innerHTML = `
      <label class="form-label">Category</label>
      <select id="add-category" class="form-select">
        ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>`;
    formGroup.after(catGroup);
  }
}

// Inject ingredient search panel into search panel
function injectIngredientSearch() {
  const panel = document.getElementById('panel-search');
  if (!panel || document.getElementById('ing-search-input')) return;

  const block = document.createElement('div');
  block.style.marginTop = '2rem';
  block.innerHTML = `
    <div class="panel-title" style="font-size:1.1rem;margin-bottom:1rem;">🥕 Search by Ingredient</div>
    <div class="form-group">
      <label class="form-label">Ingredient Name</label>
      <div class="row">
        <input id="ing-search-input" class="form-input" style="flex:1" placeholder="e.g. tomato"
          onkeydown="if(event.key==='Enter')searchByIngredientUI()"/>
        <button class="btn btn-green" onclick="searchByIngredientUI()">Search</button>
      </div>
    </div>
    <div id="ing-search-result"></div>`;
  panel.appendChild(block);
}

// Inject Recent Recipes panel into sidebar + main panel
function injectRecentPanel() {
  // Sidebar button
  if (!document.getElementById('btn-recent')) {
    const sidebar = document.querySelector('.sidebar');
    const undoBtn = [...sidebar.querySelectorAll('.sidebar-btn')]
      .find(b => b.textContent.includes('Undo'));
    if (sidebar && undoBtn) {
      const btn = document.createElement('button');
      btn.id        = 'btn-recent';
      btn.className = 'sidebar-btn';
      btn.innerHTML = '<span class="icon">🕐</span> Recent (Queue)';
      btn.onclick   = function() { showPanel('recent'); };
      undoBtn.after(btn);
    }
  }

  // Main panel
  if (!document.getElementById('panel-recent')) {
    const mainPanel = document.querySelector('.main-panel');
    const div = document.createElement('div');
    div.id        = 'panel-recent';
    div.className = 'hidden';
    div.innerHTML = `
      <div class="panel-title">🕐 Recently Added (Queue — FIFO, last 5)</div>
      <div id="recent-list"></div>`;
    mainPanel.appendChild(div);
  }
}


// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectQtyField();
  injectIngredientSearch();
  injectRecentPanel();
  syncMirror();
  renderList();
});

// ══════════════════════════════════════
//  MEAL PLANNER
// ══════════════════════════════════════
const MP_YEAR   = 2026;
const MP_MONTHS = ['January','February','March','April','May','June',
                   'July','August','September','October','November','December'];
const MP_MEAL_TYPES = ['Breakfast','Lunch','Dinner','Snack','Dessert','Beverage','Other'];

let mpCurrentMonth = 0;           // 0-based index
let mpSelectedDate = null;        // 'YYYY-MM-DD' string
const mpData = {};                // { 'YYYY-MM-DD': [{type, recipe}, ...] }

/* ── Render calendar ── */
function mpRender() {
  document.getElementById('mp-month-label').textContent =
    `${MP_MONTHS[mpCurrentMonth]} ${MP_YEAR}`;

  const grid      = document.getElementById('mp-calendar-grid');
  const firstDay  = new Date(MP_YEAR, mpCurrentMonth, 1).getDay();
  const daysInMonth = new Date(MP_YEAR, mpCurrentMonth + 1, 0).getDate();
  const today     = new Date();

  let html = '';
  // Empty cells before 1st
  for (let i = 0; i < firstDay; i++) html += `<div class="mp-day mp-empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const key = mpDateKey(mpCurrentMonth, d);
    const isToday = today.getFullYear() === MP_YEAR &&
                    today.getMonth()    === mpCurrentMonth &&
                    today.getDate()     === d;
    const hasMeals  = mpData[key] && mpData[key].length > 0;
    const isSelected = mpSelectedDate === key;

    let cls = 'mp-day';
    if (isToday)    cls += ' mp-today';
    if (hasMeals)   cls += ' mp-has-meals';
    if (isSelected) cls += ' mp-selected';

    html += `<div class="${cls}" onclick="mpSelectDate(${d})">${d}</div>`;
  }

  grid.innerHTML = html;
}

/* ── Next month (loops back to Jan) ── */
function mpNextMonth() {
  mpCurrentMonth = (mpCurrentMonth + 1) % 12;
  mpSelectedDate = null;
  document.getElementById('mp-form-area').classList.add('hidden');
  mpRender();
}

/* ── Date key helper ── */
function mpDateKey(month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${MP_YEAR}-${m}-${d}`;
}

/* ── Select a date ── */
function mpSelectDate(day) {
  mpSelectedDate = mpDateKey(mpCurrentMonth, day);
  mpRender();

  const label = document.getElementById('mp-selected-date-label');
  label.textContent = `${day} ${MP_MONTHS[mpCurrentMonth]} ${MP_YEAR}`;

  const formArea = document.getElementById('mp-form-area');
  formArea.classList.remove('hidden');

  // Show saved meals
  mpShowSaved();

  // Reset meal input rows to one empty row
  document.getElementById('mp-meal-rows').innerHTML = '';
  mpAddMealRow();

  formArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── Show saved meals for selected date ── */
function mpShowSaved() {
  const box  = document.getElementById('mp-saved-display');
  const meals = mpData[mpSelectedDate];
  if (!meals || !meals.length) { box.classList.add('hidden'); return; }

  box.classList.remove('hidden');
  box.innerHTML = `<h4>Saved Meals</h4>` +
    meals.map(m => `
      <div class="mp-saved-item">
        <span class="mp-saved-type">${m.type}</span>
        <span>${m.recipe}</span>
      </div>`).join('');
}

/* ── Add a meal input row ── */
function mpAddMealRow() {
  const container = document.getElementById('mp-meal-rows');
  const id = Date.now();
  const optionsHTML = MP_MEAL_TYPES.map(t => `<option>${t}</option>`).join('');
  const row = document.createElement('div');
  row.className = 'mp-meal-row';
  row.id = `mp-row-${id}`;
  row.innerHTML = `
    <select class="form-select">${optionsHTML}</select>
    <input  class="form-input" placeholder="Recipe name (e.g. Chicken Biryani, Pasta #1)"/>
    <button class="mp-remove-row" onclick="document.getElementById('mp-row-${id}').remove()" title="Remove">✕</button>`;
  container.appendChild(row);
}

/* ── Save meals ── */
function mpSaveMeals() {
  if (!mpSelectedDate) { showToast('Select a date first!', true); return; }

  const rows  = document.querySelectorAll('.mp-meal-row');
  const meals = [];

  rows.forEach(row => {
    const type   = row.querySelector('select').value;
    const recipe = row.querySelector('input').value.trim();
    if (recipe) meals.push({ type, recipe });
  });

  if (!meals.length) { showToast('Enter at least one recipe!', true); return; }

  // Merge with existing saved meals for that date
  mpData[mpSelectedDate] = [
    ...(mpData[mpSelectedDate] || []),
    ...meals
  ];

  showToast(`Saved ${meals.length} meal(s) for ${mpSelectedDate} ✓`);
  mpRender();
  mpShowSaved();

  // Clear input rows
  document.getElementById('mp-meal-rows').innerHTML = '';
  mpAddMealRow();
}

/* ── Init planner when panel opens ── */
const _origShowPanel = showPanel;
// Patch showPanel to init mp on first open
const _mpInit = () => {
  if (!document.getElementById('panel-mealplanner')) return;
  mpRender();
};
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const btn = [...document.querySelectorAll('.sidebar-btn')]
      .find(b => b.textContent.includes('Plan Meals'));
    if (btn) btn.addEventListener('click', () => {
      mpCurrentMonth = new Date().getMonth();
      mpRender();
    });
  }, 300);
});

// ── Image Modal ───────────────────────────────────────────────
// Close recipe view modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const rvm = document.getElementById('recipe-view-modal');
    if (rvm) { rvm.remove(); document.body.style.overflow = ''; }
  }
});

// ── Member Modal Data ─────────────────────────────────────────
const MEMBER_DATA = {
  abdullah: {
    name:     'Abdullah Khan',
    role:     'Team Leader',
    photo:    'img 7.jpeg',
    linkedin: 'https://www.linkedin.com/in/muhammad-abdullah-khan-34b156402',
    github:   'https://github.com/MuhammadAbdullahKhan11may',
    email:    'abdullahkhan11may@gmail.com',
    phone:    '03192096617',
  },
  hannan: {
    name:     'Abdul Hannan Shaikh',
    role:     'Team Member',
    photo:    'img 10.jpeg',
    linkedin: 'https://www.linkedin.com/in/abdul-hannan-shaikh-2727b630b',
    github:   null,
    email:    null,
    phone:    '03340638457',
  },
  bilal: {
    name:     'Bilal Faheem',
    role:     'Team Member',
    photo:    'img 8.png',
    linkedin: 'https://www.linkedin.com/in/muhammad-bilal-b74398377',
    github:   null,
    email:    null,
    phone:    '03052691363',
  },
};

function openMemberModal(key) {
  const m = MEMBER_DATA[key];
  if (!m) return;

  document.getElementById('mm-photo').src = m.photo;
  document.getElementById('mm-photo').alt = m.name;
  document.getElementById('mm-name').textContent = m.name;
  document.getElementById('mm-role').textContent = m.role;

  const links = document.getElementById('mm-links');
  links.innerHTML = `
    <!-- LinkedIn -->
    <a class="mm-link mm-linkedin" href="${m.linkedin}" target="_blank" rel="noopener">
      <span class="mm-link-icon">💼</span>
      <span>LinkedIn Profile</span>
      <span class="mm-link-label">↗</span>
    </a>

    ${m.github ? `
    <!-- GitHub -->
    <a class="mm-link mm-github" href="${m.github}" target="_blank" rel="noopener">
      <span class="mm-link-icon">🐙</span>
      <span>GitHub Profile</span>
      <span class="mm-link-label">↗</span>
    </a>` : ''}

    <!-- Email -->
    ${m.email
      ? `<a class="mm-link mm-email" href="mailto:${m.email}">
           <span class="mm-link-icon">✉️</span>
           <span>${m.email}</span>
         </a>`
      : `<div class="mm-link mm-email mm-disabled">
           <span class="mm-link-icon">✉️</span>
           <span>Email not available</span>
         </div>`
    }

    <!-- Phone -->
    <a class="mm-link mm-phone" href="tel:${m.phone}">
      <span class="mm-link-icon">📞</span>
      <span>${m.phone}</span>
    </a>
  `;

  document.getElementById('member-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
  document.getElementById('member-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMemberModal();
});

// ── FEATURE DETAIL MODAL ──────────────────────────────────────
const FEATURE_DATA = {
  add: {
    icon: '📋', tag: 'Recipe Manager',
    title: 'Add Recipes',
    desc: 'Creating a recipe is fast and structured. Enter a name, choose a category (Breakfast, Lunch, Dinner, and more), then build your ingredient list one tag at a time — each with an optional quantity.',
    bullets: [
      'Press Enter or click Add to append each ingredient as a tag',
      'Optional quantity field accepts formats like 2 cups, 500g, or 1/2 tsp',
      'Duplicate ingredient names are blocked automatically',
      'Recipe is saved into a Linked List and mirrored for instant access',
    ],
  },
  view: {
    icon: '👁️', tag: 'Recipe Manager',
    title: 'View All Recipes',
    desc: 'Every saved recipe appears as a clean card showing its name, colour-coded category badge, and full ingredient list. Click View on any card to open a detailed modal with quantities.',
    bullets: [
      'Colour-coded category badges: Breakfast, Lunch, Dinner, Dessert, and more',
      'Ingredients sorted alphabetically using a Binary Search Tree',
      'Quantity shown per ingredient inside the detail modal',
      'Cards update instantly when you add or delete a recipe',
    ],
  },
  save: {
    icon: '💾', tag: 'Persistence',
    title: 'Save Recipes to JSON',
    desc: 'Your recipe collection can be exported as a structured JSON file and reloaded in any future session. Nothing is lost when you close the browser — just load your file to restore everything.',
    bullets: [
      'Export all recipes to a .json file with one click',
      'Reload a saved file to restore your full recipe collection',
      'JSON structure preserves names, categories, ingredients, and quantities',
      'Compatible with any session — no account or login required',
    ],
  },
  delete: {
    icon: '🗑️', tag: 'Recipe Manager',
    title: 'Delete & Undo',
    desc: 'Select any recipe from the dropdown and delete it instantly. Deleted recipes are pushed onto a Stack, so you can undo the last deletion and restore the recipe to your collection at any time.',
    bullets: [
      'Select a recipe by name from the dropdown and confirm deletion',
      'Deleted recipe is pushed onto a LIFO Stack — last in, first out',
      'Undo Delete button pops the Stack and restores the recipe',
      'Stack holds up to the 10 most recent deletions',
    ],
  },
  ingredients: {
    icon: '🥕', tag: 'Ingredient Input',
    title: 'Tag-Based Ingredient Input',
    desc: 'Ingredients are added as interactive pill tags rather than plain text, keeping the list clean and easy to manage. Each tag can carry an optional quantity that appears inline.',
    bullets: [
      'Press Enter or click the Add button to append each ingredient',
      'Quantity is optional — leave it blank if not needed',
      'Duplicates are caught before they are added',
      'Each tag has an × button to remove it before saving',
    ],
  },
  removeIng: {
    icon: '✂️', tag: 'Ingredient Input',
    title: 'Remove Ingredients',
    desc: 'While building a recipe, click the × on any ingredient tag to remove it immediately. The list updates in real time so you always see exactly what will be saved.',
    bullets: [
      'Click × on any tag to remove that ingredient instantly',
      'Works during recipe creation before the recipe is saved',
      'No confirmation needed — removal is immediate and reversible by re-adding',
      'Remaining tags re-render instantly with correct indices',
    ],
  },
  searchRecipe: {
    icon: '🔍', tag: 'Search',
    title: 'Search Recipes by Name',
    desc: 'Type a recipe name and hit Search. The system checks the Hash Table first for O(1) lookup, then falls back to Binary Search across a sorted name array. Results show category, ingredients, and quantities.',
    bullets: [
      'Hash Table provides O(1) average-case lookup by lowercase name',
      'Binary Search fallback runs in O(log n) on the sorted recipe array',
      'Result card shows category badge, all ingredients, and quantities',
      'Search is case-insensitive and works on exact name matches',
    ],
  },
  searchIng: {
    icon: '🧪', tag: 'Search',
    title: 'Search by Ingredient',
    desc: 'Enter any ingredient name to find every recipe that contains it. The system scans all recipes and returns a grouped list of matches, including the quantity for that ingredient in each recipe.',
    bullets: [
      'Linear scan across all recipes and their ingredient arrays — O(n×m)',
      'Returns all matching recipes grouped in a result card',
      'Quantity for the searched ingredient is shown per recipe',
      'Case-insensitive matching — "Tomato" and "tomato" both match',
    ],
  },
  union: {
    icon: '➕', tag: 'Set Operations',
    title: 'Total Ingredients — Union',
    desc: 'Choose two recipes and compute their union to get a deduplicated master list of all ingredients combined. You can also run union across all recipes at once to generate a complete shopping list.',
    bullets: [
      'A ∪ B combines ingredient names from two selected recipes',
      'All Recipes mode unions every recipe in your collection',
      'Duplicate ingredient names are removed automatically via JavaScript Set',
      'Result is sorted alphabetically using a Binary Search Tree',
    ],
  },
  intersection: {
    icon: '∩', tag: 'Set Operations',
    title: 'Common Ingredients — Intersection',
    desc: 'Find exactly which ingredients two recipes share using set intersection. Useful for meal planning with pantry constraints — run it across all recipes to find universally shared ingredients.',
    bullets: [
      'A ∩ B returns only ingredient names present in both recipes',
      'All Recipes mode intersects across your entire collection',
      'Empty set (∅) is shown clearly when no common ingredients exist',
      'Result is sorted alphabetically via BST traversal',
    ],
  },
  mealplan: {
    icon: '📅', tag: 'Meal Planner',
    title: 'Interactive Meal Planner',
    desc: 'A full 2026 calendar lets you click any date and assign one or more meals — Breakfast, Lunch, Dinner, Snacks, and more. Planned dates are highlighted in green so you can see your week at a glance.',
    bullets: [
      'Click any date cell to open the meal entry form for that day',
      'Add multiple meals per day — each with a type and recipe name',
      'Planned dates are highlighted green with a dot indicator',
      'Navigate forward through months; saved meals persist within the session',
    ],
  },
  dsa: {
    icon: '🖥️', tag: 'Under the Hood',
    title: 'DSA-Powered Engine',
    desc: 'Every feature in the Recipe Manager is backed by a real data structure — not just arrays. This was built as a DSA course project to demonstrate how classic algorithms solve practical everyday problems.',
    bullets: [
      'Linked List — dynamic recipe storage with O(n) traversal and deletion',
      'Stack — undo-delete with LIFO behaviour, capped at 10 entries',
      'Queue — recently added recipes tracker with FIFO eviction',
      'Hash Table — O(1) recipe lookup by name; BST — sorted ingredient output',
    ],
  },
};

function openFeatureModal(key) {
  const d = FEATURE_DATA[key];
  if (!d) return;

  document.getElementById('fd-content').innerHTML = `
    <div class="fd-icon-wrap">${d.icon}</div>
    <div class="fd-tag">${d.tag}</div>
    <div class="fd-title">${d.title}</div>
    <div class="fd-divider"></div>
    <p class="fd-desc">${d.desc}</p>
    <ul class="fd-bullets">
      ${d.bullets.map(b => `
        <li><span class="fd-bullet-dot"></span>${b}</li>
      `).join('')}
    </ul>
  `;

  document.getElementById('fd-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeFeatureModal() {
  document.getElementById('fd-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeFeatureModal();
});

// ══════════════════════════════════════
//  SAVE TO JSON  (browser download)
// ══════════════════════════════════════
function saveToJSON() {
  if (!recipes.length) { showToast('No recipes to save!', true); return; }

  const data = recipes.map(r => ({
    name:        r.name,
    category:    r.category,
    ingredients: r.ingredients   // [{name, qty}]
  }));

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'recipes.json';
  a.click();
  URL.revokeObjectURL(url);

  showToast(`Saved ${recipes.length} recipe(s) as recipes.json ✓`);
}

// ══════════════════════════════════════
//  LOAD FROM JSON  (file input)
// ══════════════════════════════════════
function loadFromJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Invalid format');

      // Clear existing
      while (recipeList.size > 0) recipeList.removeAt(0);

      data.forEach(d => {
        const recipe = {
          name:        d.name        || 'Unnamed',
          category:    d.category    || 'Other',
          ingredients: Array.isArray(d.ingredients)
            ? d.ingredients.map(i =>
                typeof i === 'string'
                  ? { name: i, qty: '' }
                  : { name: i.name || '', qty: i.qty || '' }
              )
            : []
        };
        recipeList.append(recipe);
        recentQueue.enqueue(recipe);
      });

      syncMirror();
      renderList();
      showToast(`Loaded ${recipes.length} recipe(s) ✓`);
    } catch (err) {
      showToast('Failed to load file — invalid JSON', true);
    }
    // Reset input so same file can be reloaded
    event.target.value = '';
  };
  reader.readAsText(file);
}

// ══════════════════════════════════════
//  UNDO DELETE  (Stack pop)
// ══════════════════════════════════════
function undoDelete() {
  if (deleteStack.isEmpty()) { showToast('Nothing to undo!', true); return; }

  const r = deleteStack.pop();           // DSA: Stack pop
  recipeList.append(r);                  // DSA: Linked List append
  syncMirror();
  renderList();
  showToast(`'${r.name}' restored! ✓`);

  // Refresh delete dropdown if visible
  const delPanel = document.getElementById('panel-delete');
  if (delPanel && !delPanel.classList.contains('hidden')) populateSelects();
}

// ══════════════════════════════════════
//  REMOVE INGREDIENT FROM RECIPE
// ══════════════════════════════════════

// Populate recipe select when "Remove Ingredient" panel opens
function loadIngForEdit() {
  const sel = document.getElementById('editIng-recipe-select');
  const idx = +sel.value;
  renderIngTags(idx);
}

function renderIngTags(recipeIdx) {
  const area = document.getElementById('editIng-tag-area');
  const r    = recipes[recipeIdx];
  if (!r) { area.innerHTML = ''; return; }

  if (!r.ingredients.length) {
    area.innerHTML = '<span style="color:#555;font-size:0.85rem;">No ingredients in this recipe.</span>';
    return;
  }

  area.innerHTML = r.ingredients.map((ing, i) => `
    <span class="tag" style="font-size:0.88rem;padding:0.35rem 0.75rem;">
      ${ing.name}${ing.qty ? `<em style="opacity:0.65;font-style:normal"> — ${ing.qty}</em>` : ''}
      <span class="tag-remove" onclick="removeIngFromRecipe(${recipeIdx}, ${i})" title="Remove">✕</span>
    </span>
  `).join('');
}

function removeIngFromRecipe(recipeIdx, ingIdx) {
  const r = recipes[recipeIdx];
  if (!r) return;

  const removed = r.ingredients.splice(ingIdx, 1)[0];
  // Sync back into linked list node (recipes[] is a reference mirror)
  syncMirror();
  renderIngTags(recipeIdx);
  showToast(`'${removed.name}' removed from '${r.name}' ✓`);
}

// Patch showPanel to populate editIng select on open
const _baseShowPanel = showPanel;
showPanel = function(id, btn) {
  // Call original
  document.querySelectorAll('.main-panel > div').forEach(d => d.classList.add('hidden'));
  document.getElementById('panel-' + id).classList.remove('hidden');
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (id === 'list')             renderList();
  if (id === 'recent')           renderRecent();
  if (['union','intersection','delete'].includes(id)) populateSelects();

  if (id === 'editIng') {
    const sel = document.getElementById('editIng-recipe-select');
    sel.innerHTML = recipes.map((r, i) =>
      `<option value="${i}">${r.name} [${r.category || 'Other'}]</option>`
    ).join('');
    if (recipes.length) renderIngTags(0);
    else document.getElementById('editIng-tag-area').innerHTML =
      '<span style="color:#555;font-size:0.85rem;">No recipes yet.</span>';
  }
};
