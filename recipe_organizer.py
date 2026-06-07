"""
============================================================
  Recipe Ingredient Organizer — Python Edition  v2
  University Project  |  DSA-Focused Redesign
============================================================

DSA CONCEPTS USED:
  1. Hash Table     (dict / set)   : O(1) recipe lookup by name; set ops
  2. Singly Linked List            : RecipeLinkedList — dynamic recipe storage
  3. Stack          (list-based)   : DeleteStack — undo-delete, LIFO
  4. Queue          (deque-based)  : RecentQueue — recently added, FIFO
  5. Binary Search Tree (BST)      : IngredientBST — sorted ingredient traversal
  6. Binary Search                 : O(log n) recipe-name search
  7. OOP / ABC                     : BaseRecipe → Recipe hierarchy
  8. Categorization                : Category-indexed hash table of linked lists
============================================================
"""

import os
import sys
import json
from abc import ABC, abstractmethod
from collections import deque


# ─────────────────────────────────────────────────────────────
#  UTILITY FUNCTIONS
# ─────────────────────────────────────────────────────────────

CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage', 'Other']


def contains_number(s: str) -> bool:
    return any(ch.isdigit() for ch in s)


def get_int_input(prompt: str) -> int:
    while True:
        raw = input(prompt).strip()
        if raw.lstrip('-').isdigit():
            return int(raw)
        print("  ✗ Enter a whole number only.")


def hr(char='─', width=52):
    print(char * width)


def print_ingredients(ingredients: list) -> None:
    """Pretty-print a list of {name, qty} dicts."""
    if not ingredients:
        print("    (no ingredients)")
    else:
        for ing in ingredients:
            qty_str = f"  —  {ing['qty']}" if ing.get('qty') else ''
            print(f"    • {ing['name']}{qty_str}")


# ─────────────────────────────────────────────────────────────
#  DSA 1 — BINARY SEARCH TREE (per-recipe ingredient storage)
#  Keeps ingredient names sorted; O(log n) insert & search.
# ─────────────────────────────────────────────────────────────

class BSTNode:
    def __init__(self, name: str):
        self.name  = name
        self.left  = None
        self.right = None


class IngredientBST:
    """
    BST storing ingredient names (keys).
    Full ingredient data ({name, qty}) lives in Recipe._ingredients list;
    BST provides sorted traversal and O(log n) existence checks.
    """

    def __init__(self):
        self._root = None

    def insert(self, name: str) -> None:
        """Insert name; ignore duplicates."""
        node = BSTNode(name)
        if not self._root:
            self._root = node
            return
        cur = self._root
        while True:
            if name == cur.name:
                return
            elif name < cur.name:
                if cur.left is None:
                    cur.left = node
                    return
                cur = cur.left
            else:
                if cur.right is None:
                    cur.right = node
                    return
                cur = cur.right

    def search(self, name: str) -> bool:
        """O(log n) existence check."""
        cur = self._root
        while cur:
            if name == cur.name:
                return True
            cur = cur.left if name < cur.name else cur.right
        return False

    def _inorder(self, node, result: list) -> None:
        if node is None:
            return
        self._inorder(node.left, result)
        result.append(node.name)
        self._inorder(node.right, result)

    def sorted_names(self) -> list:
        """In-order traversal → alphabetically sorted list."""
        result = []
        self._inorder(self._root, result)
        return result


# ─────────────────────────────────────────────────────────────
#  OOP — ABSTRACT BASE CLASS
# ─────────────────────────────────────────────────────────────

class BaseRecipe(ABC):
    @abstractmethod
    def input_recipe(self) -> None: ...

    @abstractmethod
    def display(self) -> None: ...


# ─────────────────────────────────────────────────────────────
#  RECIPE CLASS
# ─────────────────────────────────────────────────────────────

class Recipe(BaseRecipe):
    """
    One recipe: name + category + list of {name, qty} ingredients.

    Internal DSA:
      _bst       : IngredientBST  — sorted traversal, existence check
      _hash_set  : set (hash table) — O(1) name-only set operations
      _ingredients: list          — ordered storage with qty data
    """

    def __init__(self, name: str = '', category: str = 'Other'):
        self.name      = name
        self.category  = category if category in CATEGORIES else 'Other'
        self._ingredients: list       = []   # [{name, qty}]
        self._bst:         IngredientBST = IngredientBST()
        self._hash_set:    set           = set()

    # ── add ingredient ────────────────────────────────────────
    def add_ingredient(self, name: str, qty: str = '') -> bool:
        """Add ingredient with optional quantity. Returns False on duplicate."""
        name_lower = name.lower().strip()
        if name_lower in self._hash_set:
            return False
        self._ingredients.append({'name': name_lower, 'qty': qty.strip()})
        self._bst.insert(name_lower)
        self._hash_set.add(name_lower)
        return True

    def remove_ingredient(self, name: str) -> bool:
        """Remove ingredient by name. Returns False if not found."""
        name_lower = name.lower().strip()
        if name_lower not in self._hash_set:
            return False
        self._ingredients = [i for i in self._ingredients if i['name'] != name_lower]
        self._hash_set.discard(name_lower)
        # Rebuild BST (simple approach — BST deletion is complex)
        self._bst = IngredientBST()
        for ing in self._ingredients:
            self._bst.insert(ing['name'])
        return True

    # ── properties ────────────────────────────────────────────
    @property
    def ingredient_names(self) -> set:
        """Hash-set of ingredient names for O(1) set operations."""
        return self._hash_set

    @property
    def ingredients(self) -> list:
        """List of {name, qty} dicts."""
        return self._ingredients

    def sorted_ingredients(self) -> list:
        """
        Returns ingredients sorted alphabetically by name (BST in-order).
        Each item is a {name, qty} dict.
        """
        sorted_names = self._bst.sorted_names()
        name_to_qty  = {i['name']: i['qty'] for i in self._ingredients}
        return [{'name': n, 'qty': name_to_qty.get(n, '')} for n in sorted_names]

    # ── input from user ────────────────────────────────────────
    def input_recipe(self) -> None:
        # Name
        while True:
            name = input("\n  Recipe name: ").strip()
            if not name:
                print("  ✗ Name cannot be empty.")
            elif contains_number(name):
                print("  ✗ Name cannot contain numbers.")
            else:
                self.name = name
                break

        # Category
        print("\n  Categories:")
        for i, cat in enumerate(CATEGORIES, 1):
            print(f"    {i}) {cat}")
        while True:
            c = get_int_input("  Choose category (number): ")
            if 1 <= c <= len(CATEGORIES):
                self.category = CATEGORIES[c - 1]
                break
            print("  ✗ Invalid choice.")

        # Ingredients with quantity
        n = get_int_input("  Number of ingredients (0 for none): ")
        for i in range(max(0, n)):
            while True:
                ing = input(f"  Ingredient {i+1} name: ").strip()
                if not ing:
                    print("  ✗ Cannot be empty.")
                elif contains_number(ing):
                    print("  ✗ Letters only (no digits).")
                else:
                    break
            qty = input(f"  Quantity for '{ing}' (e.g. 2 cups, 500g) [press Enter to skip]: ").strip()
            if not self.add_ingredient(ing, qty):
                print(f"  ⚠  '{ing}' already added — skipped.")

    # ── display ───────────────────────────────────────────────
    def display(self) -> None:
        print(f"\n  ┌─ {self.name}  [{self.category}]")
        for ing in self.sorted_ingredients():
            qty_str = f"  —  {ing['qty']}" if ing['qty'] else ''
            print(f"  │  • {ing['name']}{qty_str}")
        if not self._ingredients:
            print("  │  (no ingredients)")
        print("  └" + "─" * 40)

    # ── set operations (name-only, ignores qty) ───────────────
    def __add__(self, other: "Recipe") -> "Recipe":
        """Union of ingredient names."""
        result = Recipe("Union_Result")
        for n in self._hash_set | other._hash_set:
            result.add_ingredient(n)
        return result

    def __mul__(self, other: "Recipe") -> "Recipe":
        """Intersection of ingredient names."""
        result = Recipe("Intersection_Result")
        for n in self._hash_set & other._hash_set:
            result.add_ingredient(n)
        return result

    def complement(self, other: "Recipe") -> set:
        """A − B: names in self but not in other."""
        return self._hash_set - other._hash_set

    # ── serialization ─────────────────────────────────────────
    def to_dict(self) -> dict:
        return {
            'name':        self.name,
            'category':    self.category,
            'ingredients': self._ingredients   # [{name, qty}]
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Recipe":
        r = cls(data.get('name', ''), data.get('category', 'Other'))
        for ing in data.get('ingredients', []):
            # Support old format (plain strings) and new format (dicts)
            if isinstance(ing, str):
                r.add_ingredient(ing)
            else:
                r.add_ingredient(ing.get('name', ''), ing.get('qty', ''))
        return r


# ─────────────────────────────────────────────────────────────
#  DSA 2 — SINGLY LINKED LIST (recipe storage)
# ─────────────────────────────────────────────────────────────

class LLNode:
    def __init__(self, recipe: Recipe):
        self.recipe = recipe
        self.next   = None


class RecipeLinkedList:
    def __init__(self):
        self._head  = None
        self._count = 0

    def append(self, recipe: Recipe) -> None:
        node = LLNode(recipe)
        if not self._head:
            self._head = node
        else:
            cur = self._head
            while cur.next:
                cur = cur.next
            cur.next = node
        self._count += 1

    def remove_at(self, index: int):
        if index < 0 or index >= self._count:
            return None
        if index == 0:
            removed        = self._head.recipe
            self._head     = self._head.next
            self._count   -= 1
            return removed
        cur = self._head
        for _ in range(index - 1):
            cur = cur.next
        removed    = cur.next.recipe
        cur.next   = cur.next.next
        self._count -= 1
        return removed

    def get(self, index: int):
        cur = self._head
        for _ in range(index):
            if cur is None:
                return None
            cur = cur.next
        return cur.recipe if cur else None

    def to_list(self) -> list:
        result, cur = [], self._head
        while cur:
            result.append(cur.recipe)
            cur = cur.next
        return result

    def __len__(self):  return self._count
    def __iter__(self):
        cur = self._head
        while cur:
            yield cur.recipe
            cur = cur.next


# ─────────────────────────────────────────────────────────────
#  DSA 3 — STACK (undo delete, LIFO)
# ─────────────────────────────────────────────────────────────

class DeleteStack:
    def __init__(self, max_size=10):
        self._data = []
        self._max  = max_size

    def push(self, recipe: Recipe) -> None:
        if len(self._data) >= self._max:
            self._data.pop(0)
        self._data.append(recipe)

    def pop(self):
        return self._data.pop() if self._data else None

    def is_empty(self): return not self._data
    def peek(self):     return self._data[-1] if self._data else None


# ─────────────────────────────────────────────────────────────
#  DSA 4 — QUEUE (recently added, FIFO)
# ─────────────────────────────────────────────────────────────

class RecentQueue:
    def __init__(self, max_size=5):
        self._data = deque()
        self._max  = max_size

    def enqueue(self, recipe: Recipe) -> None:
        if len(self._data) >= self._max:
            self._data.popleft()
        self._data.append(recipe)

    def to_list(self) -> list: return list(self._data)
    def is_empty(self):        return not self._data


# ─────────────────────────────────────────────────────────────
#  DSA 5 — HASH TABLE (fast name lookup + category index)
# ─────────────────────────────────────────────────────────────

class RecipeHashMap:
    """
    Two hash tables:
      _name_map  : recipe_name (lower) → index in linked list  O(1) lookup
      _cat_map   : category → list of recipe names             O(1) category filter
    """

    def __init__(self):
        self._name_map: dict = {}
        self._cat_map:  dict = {cat: [] for cat in CATEGORIES}

    def rebuild(self, recipes: list) -> None:
        self._name_map = {}
        self._cat_map  = {cat: [] for cat in CATEGORIES}
        for i, r in enumerate(recipes):
            self._name_map[r.name.lower()] = i
            cat = r.category if r.category in CATEGORIES else 'Other'
            self._cat_map[cat].append(r.name)

    def get_index(self, name: str) -> int:
        return self._name_map.get(name.lower(), -1)

    def get_by_category(self, cat: str) -> list:
        return self._cat_map.get(cat, [])


# ─────────────────────────────────────────────────────────────
#  RECIPE MANAGER
# ─────────────────────────────────────────────────────────────

class RecipeManager:
    FILE_PATH = "recipes.json"

    def __init__(self):
        self._recipes      = RecipeLinkedList()   # DSA: Linked List
        self._delete_stack = DeleteStack()         # DSA: Stack
        self._recent_queue = RecentQueue()         # DSA: Queue
        self._hash_map     = RecipeHashMap()       # DSA: Hash Table

    # ── sync ──────────────────────────────────────────────────
    def _sync(self):
        self._hash_map.rebuild(self._recipes.to_list())

    def _list(self) -> list:
        return self._recipes.to_list()

    def _print_numbered(self, recipes=None):
        items = recipes if recipes is not None else self._list()
        for i, r in enumerate(items, 1):
            print(f"    {i}) {r.name}  [{r.category}]")

    # ── binary search on names ────────────────────────────────
    def _binary_search(self, name: str) -> int:
        """O(n log n) sort + O(log n) binary search."""
        items  = self._list()
        sorted_pairs = sorted(enumerate(items), key=lambda x: x[1].name.lower())
        lo, hi = 0, len(sorted_pairs) - 1
        target = name.lower()
        while lo <= hi:
            mid = (lo + hi) // 2
            mid_name = sorted_pairs[mid][1].name.lower()
            if   mid_name == target: return sorted_pairs[mid][0]
            elif mid_name <  target: lo = mid + 1
            else:                    hi = mid - 1
        return -1

    # ── search by ingredient ──────────────────────────────────
    def _search_by_ingredient(self, ing_name: str) -> list:
        """Linear scan O(n*m) — returns list of (index, Recipe)."""
        target = ing_name.lower()
        return [(i, r) for i, r in enumerate(self._list())
                if target in r.ingredient_names]

    # ── add recipe ────────────────────────────────────────────
    def add_recipe(self) -> None:
        hr()
        print("  ADD RECIPE")
        hr()
        r = Recipe()
        r.input_recipe()
        self._recipes.append(r)          # Linked List append
        self._recent_queue.enqueue(r)    # Queue enqueue
        self._sync()
        print(f"\n  ✓ '{r.name}' added successfully.")

    # ── display all / one ─────────────────────────────────────
    def display_menu(self) -> None:
        hr()
        print("  DISPLAY RECIPES")
        hr()
        recipes = self._list()
        if not recipes:
            print("  No recipes stored.")
            return

        self._print_numbered()
        print(f"  {len(recipes)+1}) Show ALL")
        print(f"  {len(recipes)+2}) Return")
        c = get_int_input("  Choose: ")
        if   c == len(recipes) + 2: return
        elif c == len(recipes) + 1:
            for r in recipes: r.display()
        elif 1 <= c <= len(recipes):
            recipes[c-1].display()
        else:
            print("  ✗ Invalid.")

    # ── search recipe (name) ──────────────────────────────────
    def search_menu(self) -> None:
        hr()
        print("  SEARCH RECIPE")
        hr()
        print("  1) Search by recipe name  (Hash Table + Binary Search)")
        print("  2) Search by ingredient name")
        print("  3) Return")
        c = get_int_input("  Choose: ")

        if c == 1:
            name = input("  Recipe name: ").strip()
            # Try Hash Table O(1) first
            idx = self._hash_map.get_index(name)
            method = "Hash Table O(1)"
            if idx == -1:
                idx    = self._binary_search(name)
                method = "Binary Search O(log n)"
            if idx == -1:
                print(f"  ✗ '{name}' not found.")
            else:
                print(f"\n  ✓ Found via {method} at position {idx+1}:")
                self._list()[idx].display()

        elif c == 2:
            ing = input("  Ingredient name: ").strip()
            matches = self._search_by_ingredient(ing)
            if not matches:
                print(f"  ✗ No recipes contain '{ing}'.")
            else:
                print(f"\n  Recipes containing '{ing}':")
                for idx, r in matches:
                    qty = next((x['qty'] for x in r.ingredients
                                if x['name'] == ing.lower()), '')
                    qty_str = f"  (qty: {qty})" if qty else ''
                    print(f"    • {r.name} [{r.category}]{qty_str}")

    # ── search by category ────────────────────────────────────
    def category_menu(self) -> None:
        hr()
        print("  BROWSE BY CATEGORY  (Hash Table index)")
        hr()
        for i, cat in enumerate(CATEGORIES, 1):
            names = self._hash_map.get_by_category(cat)
            print(f"  {i}) {cat}  ({len(names)} recipes)")
        print(f"  {len(CATEGORIES)+1}) Return")
        c = get_int_input("  Choose: ")
        if c == len(CATEGORIES) + 1: return
        if 1 <= c <= len(CATEGORIES):
            cat   = CATEGORIES[c-1]
            names = self._hash_map.get_by_category(cat)
            if not names:
                print(f"  No {cat} recipes.")
                return
            print(f"\n  ── {cat} Recipes ──")
            for n in names:
                idx = self._hash_map.get_index(n)
                if idx != -1:
                    self._list()[idx].display()

    # ── recent queue ──────────────────────────────────────────
    def show_recent(self) -> None:
        hr()
        print("  RECENTLY ADDED  (Queue — FIFO, last 5)")
        hr()
        items = self._recent_queue.to_list()
        if not items:
            print("  No recent recipes.")
            return
        for r in reversed(items):   # newest first
            r.display()

    # ── union ─────────────────────────────────────────────────
    def union_menu(self) -> None:
        hr(); print("  UNION ∪  (Total Ingredients)"); hr()
        recipes = self._list()
        if len(recipes) < 2: print("  Need at least 2 recipes."); return

        self._print_numbered()
        print(f"\n  Select Recipe A:")
        a = get_int_input("  A: ") - 1
        print(f"  Select Recipe B:")
        b = get_int_input("  B: ") - 1
        if not (0 <= a < len(recipes) and 0 <= b < len(recipes)):
            print("  ✗ Invalid."); return

        result = recipes[a] + recipes[b]
        print(f"\n  {recipes[a].name} ∪ {recipes[b].name}:")
        print_ingredients(result.sorted_ingredients())

    # ── intersection ──────────────────────────────────────────
    def intersection_menu(self) -> None:
        hr(); print("  INTERSECTION ∩  (Common Ingredients)"); hr()
        recipes = self._list()
        if len(recipes) < 2: print("  Need at least 2 recipes."); return

        self._print_numbered()
        a = get_int_input("  Recipe A: ") - 1
        b = get_int_input("  Recipe B: ") - 1
        if not (0 <= a < len(recipes) and 0 <= b < len(recipes)):
            print("  ✗ Invalid."); return

        result = recipes[a] * recipes[b]
        print(f"\n  {recipes[a].name} ∩ {recipes[b].name}:")
        print_ingredients(result.sorted_ingredients())

    # ── complement ────────────────────────────────────────────
    def complement_menu(self) -> None:
        hr(); print("  COMPLEMENT A−B  (Unique to A)"); hr()
        recipes = self._list()
        if len(recipes) < 2: print("  Need at least 2 recipes."); return

        self._print_numbered()
        a = get_int_input("  Recipe A (keep): ") - 1
        b = get_int_input("  Recipe B (subtract): ") - 1
        if not (0 <= a < len(recipes) and 0 <= b < len(recipes)) or a == b:
            print("  ✗ Invalid or same recipe."); return

        diff = recipes[a].complement(recipes[b])
        print(f"\n  Only in '{recipes[a].name}' (not in '{recipes[b].name}'):")
        if diff:
            for n in sorted(diff): print(f"    • {n}")
        else:
            print("    ∅ Empty set")

    # ── delete ────────────────────────────────────────────────
    def delete_recipe(self) -> None:
        hr(); print("  DELETE RECIPE"); hr()
        recipes = self._list()
        if not recipes: print("  No recipes."); return

        self._print_numbered()
        d = get_int_input("  Choose recipe to delete (0 to cancel): ")
        if d == 0: return
        if not (1 <= d <= len(recipes)): print("  ✗ Invalid."); return

        removed = self._recipes.remove_at(d - 1)     # Linked List removal
        self._delete_stack.push(removed)              # Stack push
        self._sync()
        print(f"  ✓ '{removed.name}' deleted.  (Undo available)")

    # ── undo delete ───────────────────────────────────────────
    def undo_delete(self) -> None:
        if self._delete_stack.is_empty():
            print("  Nothing to undo.")
            return
        r = self._delete_stack.pop()                  # Stack pop
        self._recipes.append(r)                       # Linked List append
        self._sync()
        print(f"  ✓ '{r.name}' restored.")

    # ── edit ingredients ──────────────────────────────────────
    def edit_ingredients(self) -> None:
        hr(); print("  EDIT INGREDIENTS"); hr()
        recipes = self._list()
        if not recipes: print("  No recipes."); return

        self._print_numbered()
        c = get_int_input("  Choose recipe: ") - 1
        if not (0 <= c < len(recipes)): print("  ✗ Invalid."); return

        r = recipes[c]
        while True:
            print(f"\n  Editing: {r.name}")
            r.display()
            print("\n  1) Add ingredient")
            print("  2) Remove ingredient")
            print("  3) Done")
            ch = get_int_input("  Choose: ")
            if ch == 1:
                while True:
                    ing = input("  Ingredient name: ").strip()
                    if not ing: print("  ✗ Cannot be empty."); continue
                    if contains_number(ing): print("  ✗ No digits."); continue
                    break
                qty = input("  Quantity (press Enter to skip): ").strip()
                if r.add_ingredient(ing, qty):
                    print(f"  ✓ '{ing}' added.")
                else:
                    print(f"  ⚠  '{ing}' already exists.")
            elif ch == 2:
                ing = input("  Ingredient to remove: ").strip()
                if r.remove_ingredient(ing):
                    print(f"  ✓ '{ing}' removed.")
                else:
                    print(f"  ✗ '{ing}' not found.")
            elif ch == 3:
                break

    # ── save ──────────────────────────────────────────────────
    def save_to_file(self) -> None:
        try:
            data = [r.to_dict() for r in self._recipes]
            with open(self.FILE_PATH, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
            print(f"  ✓ Saved {len(data)} recipe(s) to '{self.FILE_PATH}'.")
        except OSError as e:
            print(f"  ✗ Error: {e}")

    # ── load ──────────────────────────────────────────────────
    def load_from_file(self) -> None:
        if not os.path.exists(self.FILE_PATH):
            print(f"  ✗ '{self.FILE_PATH}' not found."); return
        try:
            with open(self.FILE_PATH, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # DSA: use Queue as staging area before inserting into Linked List
            stage = deque()
            for d in data:
                stage.append(Recipe.from_dict(d))

            self._recipes = RecipeLinkedList()
            while stage:
                r = stage.popleft()
                self._recipes.append(r)
                self._recent_queue.enqueue(r)

            self._sync()
            print(f"  ✓ Loaded {len(self._list())} recipe(s).")
        except (OSError, json.JSONDecodeError, KeyError) as e:
            print(f"  ✗ Error loading file: {e}")

    # ── main menu ─────────────────────────────────────────────
    def menu(self) -> None:
        while True:
            hr('═')
            print("  RECIPE INGREDIENT ORGANIZER  v2")
            hr('═')
            print(f"  Recipes: {len(self._recipes)}  |  Undo stack: {self._delete_stack._data.__len__()}")
            hr()
            print("  1)  Add recipe")
            print("  2)  Display recipes")
            print("  3)  Search  (by name or ingredient)")
            print("  4)  Browse by category  (Hash Table)")
            print("  5)  Recently added      (Queue)")
            print("  6)  Union ∪             (Total ingredients)")
            print("  7)  Intersection ∩      (Common ingredients)")
            print("  8)  Complement A−B      (Unique ingredients)")
            print("  9)  Edit ingredients    (add / remove)")
            print(" 10)  Delete recipe       (Linked List + Stack)")
            print(" 11)  Undo delete         (Stack pop)")
            print(" 12)  Save to file        (JSON)")
            print(" 13)  Load from file      (JSON + Queue)")
            print(" 14)  Exit")
            hr()
            c = get_int_input("  Choose: ")
            actions = {
                1:  self.add_recipe,
                2:  self.display_menu,
                3:  self.search_menu,
                4:  self.category_menu,
                5:  self.show_recent,
                6:  self.union_menu,
                7:  self.intersection_menu,
                8:  self.complement_menu,
                9:  self.edit_ingredients,
                10: self.delete_recipe,
                11: self.undo_delete,
                12: self.save_to_file,
                13: self.load_from_file,
            }
            if c == 14:
                print("\n  Goodbye!\n"); sys.exit(0)
            elif c in actions:
                actions[c]()
            else:
                print("  ✗ Invalid choice.")


# ─────────────────────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────────────────────

def main() -> None:
    hr('═')
    print("  RECIPE INGREDIENT ORGANIZER  —  Python v2")
    print("  DSA: Linked List · Stack · Queue · Hash Table · BST")
    hr('═')
    manager = RecipeManager()

    # Offer to load existing file on startup
    if os.path.exists(RecipeManager.FILE_PATH):
        ans = input(f"\n  Found '{RecipeManager.FILE_PATH}'. Load it? (y/n): ").strip().lower()
        if ans == 'y':
            manager.load_from_file()

    manager.menu()


if __name__ == "__main__":
    main()
