import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      padding: "8px 100px",
      height: 100,
      background: "#000000",
      color: "#fff"
    }}>
      {/* Logo */}
      {/* <img src="/logo.png" alt="OnlyFacts Logo" style={{ height: 100, marginRight: 32 }} /> */}
      <div style={{ marginRight: 32, height: 100, backgroundColor: "#fff", padding: "8px 16px", border: 0, color: "#000" }}>
        <h1>
          OnlyFacts
        </h1>
      </div>

      {/* Categories */}
      <style>
        {`
          .category-item {
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: color 0.2s;
          }
          .category-item:hover::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -4px;
            height: 2px;
            background: red;
            border: 2px;
          }
        `}
      </style>
      <nav style={{ flex: 1 }}>
        <ul style={{ display: "flex", gap: 30, listStyle: "none", margin: 0, padding: 0 }}>
          {categories.map((cat) => (
            <li key={cat.id} className="category-item" style={{ fontWeight: 500, cursor: "pointer" }}>
              {cat.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* Searchbar */}
      <input
        type="text"
        placeholder="Search news..."
        style={{
          padding: "6px 12px",
          borderRadius: 4,
          border: "1px solid #ccc",
          marginRight: 24,
          minWidth: 180
        }}
      />

      {/* Account Dropdown */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          onClick={() => setShowDropdown((v) => !v)}
        >
          <span role="img" aria-label="account" style={{ fontSize: 20 }}>👤</span>
        </div>
        {showDropdown && (
          <div style={{
            position: "absolute",
            right: 0,
            top: 44,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: 6,
            minWidth: 140,
            zIndex: 10
          }}>
            <button style={{ width: "100%", padding: "10px 16px", border: "none", background: "none", textAlign: "left", cursor: "pointer" }}>
              Settings
            </button>
            <button style={{ width: "100%", padding: "10px 16px", border: "none", background: "none", textAlign: "left", cursor: "pointer", color: "red" }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;