# Electrochemical Converter ⚡️🔬

A Progressive Web App (PWA) for converting potentials between common electrochemical reference electrodes (SHE, RHE, SCE, Ag/AgCl, HgO).  
Deployed at 👉 [electroconverter.netlify.app](https://electroconverter.netlify.app/)

---

## ✨ Features
- Convert between **SHE**, **RHE**, **SCE (Calomel)**, **Ag/AgCl**, and **HgO** reference electrodes.
- Built-in **default literature reference values** for each electrode.
- Optional **custom reference values** (user-defined).
- **pH-dependent RHE correction** included automatically.
- Clean and responsive **Material UI design**.
- Works offline as a **PWA**.
- Exportable to APK for mobile use.

---

## 🚀 Live Demo
Try it here:  
👉 [https://electroconverter.netlify.app/](https://electroconverter.netlify.app/)

---

## 🛠️ Tech Stack
- **React + Vite**
- **Material UI (MUI)**
- **JavaScript (ES6+)**
- **PWA support** (offline usage, installable)
- **Netlify** (deployment & hosting)

---

## ⚡ Installation & Development
Clone the repository:
```bash
git clone https://github.com/owanner/electrochemical-converter.git
cd electrochemical-converter
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

---

## 📱 PWA / Mobile

Fully installable on Android, iOS, macOS, Windows.

Optionally packaged as an APK for offline mobile use.

| Electrode | vs. SHE (V)         |
| --------- | ------------------- |
| SCE       | +0.241              |
| Ag/AgCl   | +0.197              |
| Hg/HgO    | +0.098              |
| RHE       | 0.000 (+0.059 × pH) |

(Users may override these defaults in the app settings.)

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

MIT License © 2025 Wanner Menezes
