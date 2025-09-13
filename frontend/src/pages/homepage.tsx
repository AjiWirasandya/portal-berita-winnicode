import React, { useEffect, useState } from "react";

interface News {
  category: string;
  id: number;
  title: string;
  content: string;
  summary: string;
  image_url: string;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(() => setNews([]));
  }, []);

  // Ambil berita utama (pertama) dan berita populer (selain pertama)
  const featured = news[0];
  const populer = news.slice(1, 6); // ambil 4 berita populer

  return (
    <main style={{ width: "100vw", minHeight: "100vh", background: "#f5f5f5", padding: 0, margin: 0 }}>
    {/* Spacer to push content below header, matches header height */}
    <div style={{ height: 40 }} />
    <div style={{
      maxWidth: 1300,
      margin: "0 auto",
      padding: "0 16px",
      boxSizing: "border-box",
      display: "flex",
      gap: 32,
      alignItems: "flex-start",
      background: "#fff",
      border: 12,
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    }}>
      {/* Featured News */}
      <div style={{ flex: 2, borderRight: "1px solid #eee", padding: 24, minHeight: 350 }}>
        {featured && (
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>{featured.title}</h2>
            <div style={{ color: "red", fontSize: 14, margin: "8px 0" }}>{featured.category}</div>
            <div style={{ color: "#222", fontSize: 16 }}>{featured.summary}</div>
          </div>
          <img
            src={featured.image_url}
            alt={featured.title}
            style={{ width: 550, height: 450, objectFit: "cover", border: 8, background: "#eee" }}
          />
        </div>
        )}
      </div>
      {/* Sidebar Most Popular*/}
      <div style={{ flex: 1, minWidth: 200, padding: "40px 24px 24px 0", height: 400 }}>
        <div style={{ fontWeight: 700, fontSize: 18, display: "inline-block", borderBottom: "2px solid red", marginBottom: 16, paddingBottom: 2 }}>
            MOST POPULAR
        </div>
        <div style={{ position: "sticky", top: 0, background: "#fff", paddingBottom: 16, overflowY: "scroll", height: "calc(100% - 40px)" }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, color: "#222" }}>
          {populer.map((item, idx) => (
            <li key={item.id} style={{ display: "flex", flexDirection: "column", marginBottom: 18 }}>
              <span style={{ color: "#aaa", fontWeight: 600, fontSize: 18 }}>{String(idx + 1).padStart(2, "0")}</span>
              <span style={{ fontWeight: 500 }}>{item.title}</span>
              <span style={{ color: "red", fontSize: 13, marginTop: 2 }}>{item.category}</span>
            </li>
          ))}
          </ol>
        </div>

      </div>
    </div>
    {/* List Berita di bawah Featured dan Most Popular */}
    <div style={{
      maxWidth: 1300,
      margin: "0 auto",
      padding: "0 34px",
    }}>
      <div style={{ display: "inline-block", fontWeight: 700, fontSize: 18, borderBottom: "2px solid red", marginBottom: 16, paddingTop: 24 }}>
        HEADLINES
      </div>
      <div style={{ margin: "auto", display: "flex", gap: 19, flexWrap: "wrap" }}>
        {news.slice(7, 13).map((item) => (
          <div key={item.id} style={{ width: 200, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <img
              src={item.image_url}
              alt={item.title}
              style={{ width: 200, height: 120, objectFit: "cover", border: 8, background: "#eee" }}
            />
            <div style={{ fontWeight: 600, marginTop: 8 }}>{item.title}</div>
            <div style={{ color: "red", fontSize: 13, margin: "4px 0" }}>{item.category}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{
      maxWidth: 1300,
      margin: "0 auto",
      padding: "0 34px",
    }}>
    <div style={{ display: "inline-block", fontWeight: 700, fontSize: 18, borderBottom: "2px solid red", marginBottom: 16, paddingTop: 24 }}>
        LATEST
    </div>
    <div style={{ margin: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
        {news.slice(8, 20).map((item) => (
          <div key={item.id} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <img
              src={item.image_url}
              alt={item.title}
              style={{ width: 300, height: 170, objectFit: "cover", border: 8, background: "#eee" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{item.title}</div>
              <div style={{ color: "red", fontSize: 13, marginTop: 4 }}>{item.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>

  );
};

export default HomePage;