import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, ArrowRight, Droplets, ShieldCheck, Sparkles, MapPin, Phone, Mail, Menu, X, Check } from 'lucide-react';

// --- DATA PAKET MENU (Nasi Kotak, Coffee Break, & Prasmanan) ---
const paketMenuData = {
  nasiKotak: [
    { name: "Nasi Ayam Kalasan", price: "37.500", desc: "Ayam Kalasan, Tahu/Tempe Bacem, Sayur Lalapan, Sambal" },
    { name: "Nasi Rames", price: "35.500", desc: "Opor Daging, Sambal Goreng Kentang Wortel, Oseng Sayur, Mie Goreng" },
    { name: "Nasi Ayam Geprek", price: "41.500", desc: "Ayam Geprek, Tahu/Tempe Mendoan, Terong, Bakso Goreng, Kremikan" },
    { name: "Nasi Kotak China (Set 1)", price: "45.500", desc: "Kacang Panjang Sapi Cincang, Omelet Kepiting, Cap Cay Goreng" },
    { name: "Nasi Kuning Komplit", price: "51.500", desc: "Ayam Bumbu Rujak, Telur Suwir, Sambal Goreng Kentang Ati, Perkedel" },
  ],
  coffeeBreak: [
    { name: "Paket Coffee Break 1", price: "18.500", desc: "Pisang Goreng, Lumpia Goreng, Teh Manis / Tawar, Kopi" },
    { name: "Paket Coffee Break 5", price: "17.500", desc: "Risoles, Donat Manis, Teh Manis / Tawar, Kopi" },
    { name: "Paket Coffee Break 9", price: "21.500", desc: "Risoles, Apem, Pisang Goreng, Teh Manis / Tawar, Kopi" },
    { name: "Paket Coffee Break 10", price: "22.500", desc: "Donat Manis, Pisang Goreng, Lumpia Goreng, Teh Manis / Tawar, Kopi" },
  ],
  prasmanan: [
    { name: "Prasmanan Series A", price: "46.500", desc: "3 Lauk Utama, 1 Sup, Nasi Putih, Air Mineral (330ml). Terdapat pilihan kombinasi menu (A1 - A8)." },
    { name: "Prasmanan Series B", price: "52.500", desc: "4 Lauk Utama, 1 Sup, Nasi Putih, Air Mineral (330ml). Ideal untuk resepsi pernikahan (Pilihan B1 - B8)." },
    { name: "Prasmanan Series C", price: "65.500", desc: "5 Lauk Utama, 1 Sup, Nasi Putih, Hidangan Es Segar, Air Mineral (330ml). Pilihan lengkap dan memuaskan." },
    { name: "Prasmanan VIP Series D", price: "99.500", desc: "8 Lauk Utama, Sup, 2 Ragam Karbohidrat, Es Segar, Air Mineral (330ml). Sajian eksklusif tamu istimewa." },
    { name: "Prasmanan VVIP Series D", price: "108.500", desc: "8 Lauk Utama, Sup, Nasi Putih & Goreng, Es, Buah Segar, Air Mineral. Sajian paling paripurna (D5 - D8)." },
  ]
};

// --- DATA SET MENU BANQUET ---
const setMenuBanquet = [
  { 
    series: "Kun Ming", 
    price: "869.000", 
    badge: "9 COURSES",
    items: ["Sup Ayam Jamur Merang", "Ayam Masak Cabe Kering", "Kacang Panjang Masak Sapi Cincang", "Cap Cay Goreng Seafood", "Lumpia Udang Shanghai", "Tamie Goreng", "Nasi Goreng Jawa", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV7xSuQF3wf5vky04u4rmBWSXVn9cN7Q6J01CnexYLq-oobPWB3QtGN-3VrrN7TKf2CKFPIscFSsq9aOpzvc4KB70Zd06bDvEgzN4K9IeppiKwEU3HfnEEdIvKNx2-zswS3kSo10mgmozVoOB8_aGsWjkY2xqE-ucFsD4Pry05_1RodTrd1Nd_mVx_dcKqj1oNiUGnLE8m8tYA1l4k0lqZ562VQGOp-Tp6BalrXnzuLHn5xdOgPGzlZgSETSAXlUTuhGIw2fxOXdU"
  },
  { 
    series: "Hang Zhou", 
    price: "899.000", 
    badge: "9 COURSES",
    items: ["Sup Hiwan", "Ayam Goreng Tepung", "Ikan Kakap Masak Saos Asam Manis", "Tahu Jepang Goreng Gandum", "Cap Cay Goreng", "Mie Goreng Spesial", "Nasi Goreng Ikan Asin", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnbJZNxcAnQxMYlFbSj2akSFuLlVlstDSUqXUEvI2tp-nYbilLAGmY-NHpYsj-BH102z-_oqqxD7IjJCqKapf9cyN3y8fPmqWPZEqo7PW8yol4jVLdLnnNTOACVo0fe_80PLJqYmR5th5YJoglDBemGabXMeQ-8Gab4R-S7wK0ML26z0HJubacOOLO_PW49JppShydgcR80Fzr_8XCGy4CPoJhbMSVm09r4Rdb6xoM1Z0ud52NwwOCgurM1fK6iERycs5tODNp4f0"
  },
  { 
    series: "Chong Qing", 
    price: "965.000", 
    badge: "9 COURSES",
    items: ["Sup Cap Cay", "Ayam Masak Saos Asam Manis", "Udang Gulung", "Angsio Tahu Jepang", "Daging Sapi Masak Bawang Bombay", "Mie Goreng", "Nasi Goreng Seafood", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAVcbZ7IILJou0ex01P8VPvpRQe6Lw0IfSZrSOOWdNysJSOhrfwo_c_G8r-jf3vQEjdu9KeH2OWUXQbumbnGukwVai5pZrSeBifeH3BpTT7Q7k5cGhZhZR5gARoG3Xfans9BGJuHNXjF0cYNy9IqfW5q6sVlqHiSKBRSlOR50ZdqL0rsj1zREZuj3oIRGm-89QsZfwqfMsv8q-M1Gqaljf565OwOrLpY6-Fl-_n6IbmO2jBsKXlECOo6yNyZU0UYElS339Qo21HHM"
  },
  { 
    series: "Guang Zhou", 
    price: "985.000", 
    badge: "9 COURSES",
    items: ["Sup Cap Cay", "Udang Goreng Tepung Roti", "Daging Sapi Masak Lada Hitam", "Ayam Masak Saos Lemon", "Angsio Tahu Jepang", "Mie Goreng", "Nasi Goreng Kurnia", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnbJZNxcAnQxMYlFbSj2akSFuLlVlstDSUqXUEvI2tp-nYbilLAGmY-NHpYsj-BH102z-_oqqxD7IjJCqKapf9cyN3y8fPmqWPZEqo7PW8yol4jVLdLnnNTOACVo0fe_80PLJqYmR5th5YJoglDBemGabXMeQ-8Gab4R-S7wK0ML26z0HJubacOOLO_PW49JppShydgcR80Fzr_8XCGy4CPoJhbMSVm09r4Rdb6xoM1Z0ud52NwwOCgurM1fK6iERycs5tODNp4f0"
  },
  { 
    series: "Tian Jin", 
    price: "1.015.000", 
    badge: "9 COURSES",
    items: ["Sup Sehat", "Ayam Goreng Kurnia", "Ikan Lapis Masak Saos Asam Manis", "Udang Goreng Tepung Roti", "Daging Sapi Masak Bawang Bombay", "Tamie Goreng", "Nasi Goreng Hongkong", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV7xSuQF3wf5vky04u4rmBWSXVn9cN7Q6J01CnexYLq-oobPWB3QtGN-3VrrN7TKf2CKFPIscFSsq9aOpzvc4KB70Zd06bDvEgzN4K9IeppiKwEU3HfnEEdIvKNx2-zswS3kSo10mgmozVoOB8_aGsWjkY2xqE-ucFsD4Pry05_1RodTrd1Nd_mVx_dcKqj1oNiUGnLE8m8tYA1l4k0lqZ562VQGOp-Tp6BalrXnzuLHn5xdOgPGzlZgSETSAXlUTuhGIw2fxOXdU"
  },
  { 
    series: "Bei Jing", 
    price: "1.075.000", 
    badge: "9 COURSES",
    items: ["Sup Ayam Jamur Merang", "Ayam Goreng Kurnia", "Daging Sapi Lada Hitam", "Gurami Masak Asam Manis", "Lumpia Udang Shanghai", "Sapo Tahu Seafood", "Nasi Goreng Hongkong", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAVcbZ7IILJou0ex01P8VPvpRQe6Lw0IfSZrSOOWdNysJSOhrfwo_c_G8r-jf3vQEjdu9KeH2OWUXQbumbnGukwVai5pZrSeBifeH3BpTT7Q7k5cGhZhZR5gARoG3Xfans9BGJuHNXjF0cYNy9IqfW5q6sVlqHiSKBRSlOR50ZdqL0rsj1zREZuj3oIRGm-89QsZfwqfMsv8q-M1Gqaljf565OwOrLpY6-Fl-_n6IbmO2jBsKXlECOo6yNyZU0UYElS339Qo21HHM"
  },
  { 
    series: "Shang Hai", 
    price: "1.150.000", 
    badge: "9 COURSES",
    items: ["Sup Sehat", "Daging Sapi Masak Bawang Bombay", "Ikan Lapis Masak Saos Asam Manis", "Ayam Saos Lemon", "Udang Mentega", "Sapo Tahu Seafood", "Nasi Goreng Kurnia", "Es Buah Leci", "Minuman Ringan"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnbJZNxcAnQxMYlFbSj2akSFuLlVlstDSUqXUEvI2tp-nYbilLAGmY-NHpYsj-BH102z-_oqqxD7IjJCqKapf9cyN3y8fPmqWPZEqo7PW8yol4jVLdLnnNTOACVo0fe_80PLJqYmR5th5YJoglDBemGabXMeQ-8Gab4R-S7wK0ML26z0HJubacOOLO_PW49JppShydgcR80Fzr_8XCGy4CPoJhbMSVm09r4Rdb6xoM1Z0ud52NwwOCgurM1fK6iERycs5tODNp4f0"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('prasmanan'); // Default tab sekarang Prasmanan
  const carouselRef = useRef(null);

  const WA_NUMBER = '6285186880510';
  const categoryLabelMap = {
    prasmanan: 'Paket Prasmanan',
    nasiKotak: 'Nasi Kotak & Mealbox',
    coffeeBreak: 'Coffee Break',
  };

  const getWhatsAppLink = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  const getPaketMenuMessage = (item, categoryLabel) => `Halo Restaurant Kurnia,\n\nSaya ingin memesan:\n- Kategori: ${categoryLabel}\n- Menu: ${item.name}\n- Harga: Rp ${item.price}\n- Jumlah: ...\n- Tanggal acara: ...\n\nMohon konfirmasi ketersediaan, total harga, dan cara pembayaran.\nTerima kasih.`;

  const getSetMenuMessage = (set) => `Halo Restaurant Kurnia,\n\nSaya ingin memesan Set Menu Banquet:\n- Seri: ${set.series}\n- Harga: Rp ${set.price}\n- Paket: ${set.badge}\n- Jumlah meja / porsi: ...\n- Tanggal acara: ...\n\nMohon detail paket dan ketersediaan.\nTerima kasih.`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 380 + 24;
      carouselRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans text-[#1b1c1c] selection:bg-[#c8c6c5] min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        .font-serif { font-family: 'Noto Serif', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Top Navigation Bar */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#fbf9f8]/95 backdrop-blur-md border-b border-[#c4c7c7] shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center px-[24px] h-[80px] max-w-[1280px] mx-auto">
          <div className="flex flex-col">
            <div className={`font-serif text-[24px] font-medium leading-none tracking-tight ${isScrolled ? 'text-[#0e0f0f]' : 'text-white'}`}>
              Restaurant Kurnia
            </div>
            <div className={`font-sans text-[10px] tracking-[0.2em] uppercase font-bold mt-1 ${isScrolled ? 'text-[#5e5f5c]' : 'text-white/80'}`}>
              Sejak 1985
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[32px]">
            <a href="#home" className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase pb-1 transition-colors ${isScrolled ? 'text-[#0e0f0f] border-b-2 border-[#0e0f0f]' : 'text-white border-b-2 border-white'}`}>Home</a>
            <a href="#paket" className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase pb-1 transition-colors border-b-2 border-transparent ${isScrolled ? 'text-[#5e5f5c] hover:text-[#0e0f0f]' : 'text-white/80 hover:text-white'}`}>Paket Menu</a>
            <a href="#set-menu" className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase pb-1 transition-colors border-b-2 border-transparent ${isScrolled ? 'text-[#5e5f5c] hover:text-[#0e0f0f]' : 'text-white/80 hover:text-white'}`}>Set Menu</a>
            <a href="#contact" className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase pb-1 transition-colors border-b-2 border-transparent ${isScrolled ? 'text-[#5e5f5c] hover:text-[#0e0f0f]' : 'text-white/80 hover:text-white'}`}>Contact</a>
          </nav>

          <a href="https://wa.me/6285186880510" target="_blank" rel="noreferrer" className="hidden md:flex font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase bg-[#0e0f0f] text-[#ffffff] px-[24px] py-[12px] hover:opacity-80 transition-all duration-300 items-center gap-2">
            Pesan Sekarang <ArrowRight size={16}/>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-[#0e0f0f]' : 'text-white'} size={28} />
            ) : (
              <Menu className={isScrolled ? 'text-[#0e0f0f]' : 'text-white'} size={28} />
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[80px] left-0 w-full bg-[#fbf9f8] border-b border-[#c4c7c7] p-[24px] flex flex-col gap-[16px] shadow-lg">
            <a href="#home" className="font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase text-[#0e0f0f]" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#paket" className="font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase text-[#5e5f5c]" onClick={() => setIsMobileMenuOpen(false)}>Paket Menu</a>
            <a href="#set-menu" className="font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase text-[#5e5f5c]" onClick={() => setIsMobileMenuOpen(false)}>Set Menu</a>
            <a href="#contact" className="font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase text-[#5e5f5c]" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative w-full h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover brightness-[0.60]" 
              alt="High-end dining setup" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoiLr0GggSWW1I5VdBstQgX2kuVpoKs5qxWjBCY-2bI9aJJUDD6pfi7qr68Zf5AuTdCEFhY7LKYVtZ67eW4tugYdzTxA22y1_xhP9AJW_9_xhKQp6R6Kzo2ePLJOByofLIYABHnAn7uxeb59Uf7IPZnfb3GAITa3Z1-cLoeoOb5v9kXZF0Y98XRbQ1vcxNPS8Gzfm975GmpUnfn23EO8rxwFY9AeVSOIuQU5ndhwJSVeXrFK7J8rVmbrQCa-2dqohXh9LflOA5yao" 
            />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-[24px] w-full mt-20">
            <div className="max-w-2xl bg-[#fbf9f8]/40 backdrop-blur-md p-[48px] border-l-4 border-[#0e0f0f]">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck size={20} className="text-[#0e0f0f]" />
                <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#0e0f0f]">
                  100% Sertifikasi Halal
                </span>
              </div>
              <h1 className="font-serif text-[48px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0e0f0f] mb-[24px]">
                Kualitas Restoran, <br/>Kini Hadir di Setiap Acara Anda
              </h1>
              <p className="font-sans text-[18px] leading-[1.6] text-[#242424] font-medium mb-[48px]">
                Melayani berbagai kebutuhan catering—mulai dari Nasi Kotak, Prasmanan, hingga Set Menu Banquet Mewah dengan dedikasi cita rasa otentik sejak tahun 1985.
              </p>
              <div className="flex gap-[24px]">
                <a href="#paket" className="font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase bg-[#0e0f0f] text-[#ffffff] px-[48px] py-[24px] hover:opacity-90 transition-all">
                  Lihat Menu
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-[80px] max-w-[1280px] mx-auto px-[24px] grid grid-cols-1 md:grid-cols-12 gap-[48px] items-center">
          <div className="md:col-span-5">
            <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#5e5f5c] block mb-[8px]">
              Kurnia Heritage
            </span>
            <h2 className="font-serif text-[36px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#0e0f0f] mb-[24px]">
              Tiga Dekade Melayani Rasa
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-[#444748] mb-[24px]">
              Berpusat di Pasuruan, Jawa Timur, Restaurant Kurnia telah menjadi saksi berbagai momen berharga sejak 1985. Kami memadukan bahan-bahan terbaik dengan teknik memasak profesional untuk memastikan hidangan yang disajikan selalu memuaskan.
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-[#444748] mb-[24px]">
              Kami siap melayani kebutuhan acara Anda: Wedding Party, Engagement, Birthday, Corporate Event, Outside Catering, Mealbox Package, hingga Reuni.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-[24px]">
            <img 
              className="w-full h-80 object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 rounded-sm" 
              alt="Fresh organic ingredients" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtY8CboYgALMsE4YtGV8refD5rBs-49tErvoGBxju69I0XPVQt8XpDoZNqmam-zR_q1WwpG8H3dopYaUGwt7hS9x4vbG5T_k7WnK61yL9y1OH_ywaZEUXn4La2iTJkMubpZpgw_qNbOtDUYjaKdS_1qEnT-_vm3SFJUOwKVe78UiJ5iC0uPhzao_1AI5gU0sW1m-yqsrldOMW9HBT3Mla1EDhuwJ_ZaDSXxv06O7VQpX48SYoyfbaWeKeHewfs8M7rsvcS-OpzpFs" 
            />
            <img 
              className="w-full h-80 object-cover mt-[80px] grayscale-[10%] hover:grayscale-0 transition-all duration-700 rounded-sm" 
              alt="Chef plating food" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjVzUclnhW4WMUJ9e38GgzEp3E5m0dFWHm-3NaQ6yBCtJzi5WQxm-XIlsiSb6LvNfg5Xybs8IV6692mx1ioDWDFvgY2OSnIhlIlK5nT99WdSkWuVV8bSofIvLiIemizSPpu5mJ5QJXxo8mszmaXV-7xn0Mqzibj5V6kRFSjYyASz-M8Lb-3kVUa_8XR5WBj5f8hmbzb00d0HnQblm0hJen44O_JXzrFPtfkmcU-ewXl0d5tsnec4hBb8pmNR8llG-KBM-wEJFy0Zo" 
            />
          </div>
        </section>

        {/* PAKET MENU SECTION (Prasmanan, Nasi Kotak, & Coffee Break) */}
        <section id="paket" className="py-[80px] bg-[#ffffff] border-y border-[#e4e2e2]">
          <div className="max-w-[1280px] mx-auto px-[24px]">
            <div className="text-center max-w-2xl mx-auto mb-[48px]">
              <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#5e5f5c] block mb-[8px]">
                Fleksibel & Higienis
              </span>
              <h2 className="font-serif text-[36px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#0e0f0f]">
                Kategori Paket Menu
              </h2>
            </div>

            {/* Tabs for Paket Menu */}
            <div className="flex flex-wrap justify-center gap-4 mb-[48px]">
              <button 
                onClick={() => setActiveTab('prasmanan')}
                className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase px-[32px] py-[16px] transition-all border ${activeTab === 'prasmanan' ? 'bg-[#0e0f0f] text-white border-[#0e0f0f]' : 'bg-transparent text-[#5e5f5c] border-[#c4c7c7] hover:border-[#0e0f0f]'}`}
              >
                Paket Prasmanan
              </button>
              <button 
                onClick={() => setActiveTab('nasiKotak')}
                className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase px-[32px] py-[16px] transition-all border ${activeTab === 'nasiKotak' ? 'bg-[#0e0f0f] text-white border-[#0e0f0f]' : 'bg-transparent text-[#5e5f5c] border-[#c4c7c7] hover:border-[#0e0f0f]'}`}
              >
                Nasi Kotak & Mealbox
              </button>
              <button 
                onClick={() => setActiveTab('coffeeBreak')}
                className={`font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase px-[32px] py-[16px] transition-all border ${activeTab === 'coffeeBreak' ? 'bg-[#0e0f0f] text-white border-[#0e0f0f]' : 'bg-transparent text-[#5e5f5c] border-[#c4c7c7] hover:border-[#0e0f0f]'}`}
              >
                Coffee Break
              </button>
            </div>

            {/* List Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {paketMenuData[activeTab].map((item, idx) => (
                <div key={idx} className="p-[32px] border border-[#e4e2e2] bg-[#fbf9f8] hover:border-[#0e0f0f] transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-[24px] font-medium leading-[1.4] text-[#0e0f0f]">{item.name}</h3>
                      <div className="text-right">
                        {activeTab === 'prasmanan' && <div className="font-sans text-[12px] text-[#747878] mb-1">Mulai Dari</div>}
                        <span className="font-sans font-bold text-[18px] text-[#242424]">Rp {item.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start mt-4">
                      <Check size={18} className="text-[#7D8C7E] flex-shrink-0 mt-1" />
                      <p className="font-sans text-[16px] leading-[1.6] text-[#5e5f5c]">{item.desc}</p>
                    </div>
                    <a
                      href={getWhatsAppLink(getPaketMenuMessage(item, categoryLabelMap[activeTab]))}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center justify-center rounded-sm border border-[#0e0f0f] bg-[#0e0f0f] px-[24px] py-[14px] text-[14px] font-semibold uppercase text-white transition-all hover:bg-[#272727]"
                    >
                      Pesan via WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="font-sans text-[14px] text-[#5e5f5c] italic">*Terdapat banyak variasi set/seri lainnya. Hubungi kami untuk katalog lengkap PDF.</p>
            </div>
          </div>
        </section>

        {/* SET MENU BANQUET SECTION */}
        <section id="set-menu" className="py-[80px] bg-[#f5f3f3] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-[24px] mb-[48px] flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#5e5f5c] block mb-[8px]">
                Sajian Meja Bundar (Round Table)
              </span>
              <h2 className="font-serif text-[36px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#0e0f0f]">
                Set Menu Banquet
              </h2>
            </div>
            <div className="flex gap-[12px]">
              <button 
                onClick={() => scrollCarousel('up')}
                className="w-12 h-12 flex items-center justify-center border border-[#747878] hover:bg-[#0e0f0f] hover:text-[#ffffff] hover:border-[#0e0f0f] transition-all rounded-sm"
              >
                <ChevronUp size={24} />
              </button>
              <button 
                onClick={() => scrollCarousel('down')}
                className="w-12 h-12 flex items-center justify-center border border-[#747878] hover:bg-[#0e0f0f] hover:text-[#ffffff] hover:border-[#0e0f0f] transition-all rounded-sm"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
          
          {/* Vertical list track */}
          <div 
            ref={carouselRef}
            className="flex flex-col gap-[24px] py-[24px] overflow-y-auto no-scrollbar snap-y snap-mandatory max-h-[780px] max-w-[1280px] mx-auto px-[24px]"
          >
            {setMenuBanquet.map((set, index) => (
              <div key={index} className="w-full group snap-start cursor-pointer border border-[#e4e2e2] bg-[#ffffff] p-2 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-[250px] mb-[24px] overflow-hidden rounded-sm">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={`Banquet Set ${set.series}`} 
                    src={set.img} 
                  />
                  <div className="absolute top-[16px] right-[16px] flex gap-[4px]">
                    <span className="bg-[#fbf9f8]/90 backdrop-blur-md px-[12px] py-[6px] font-sans text-[10px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#0e0f0f] rounded-sm">
                      {set.badge}
                    </span>
                  </div>
                </div>
                <div className="px-[16px] pb-[16px]">
                  <div className="flex justify-between items-end mb-[16px]">
                    <h3 className="font-serif text-[28px] font-medium leading-[1.4] text-[#0e0f0f]">{set.series}</h3>
                    <span className="font-sans font-bold text-[18px] text-[#242424] mb-[4px]">Rp {set.price}</span>
                  </div>
                  
                  {/* Elegant List of Items */}
                  <div className="font-sans text-[14px] leading-[1.8] text-[#444748] mb-[24px] pb-[16px] border-b border-[#e4e2e2]">
                    {set.items.map((item, i) => (
                      <span key={i}>
                        {item}{i < set.items.length - 1 ? <span className="text-[#c4c7c7] mx-2">•</span> : ''}
                      </span>
                    ))}
                  </div>

                  <a
                    href={getWhatsAppLink(getSetMenuMessage(set))}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase text-[#0e0f0f] inline-flex items-center gap-[8px] group-hover:text-[#5e5f5c] transition-colors"
                  >
                    Pesan Paket Ini <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-[80px] max-w-[1280px] mx-auto px-[24px]">
          <div className="text-center max-w-2xl mx-auto mb-[48px]">
            <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#5e5f5c] block mb-[8px]">
              Keunggulan Kami
            </span>
            <h2 className="font-serif text-[36px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#0e0f0f]">
              Profesionalisme di Setiap Sentuhan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[48px]">
            <div className="text-center p-[32px] border border-[#c4c7c7] hover:border-[#0e0f0f] hover:shadow-xl hover:shadow-[#0e0f0f]/5 transition-all duration-300 rounded-sm group cursor-default bg-[#fbf9f8]">
              <div className="w-16 h-16 mx-auto mb-[24px] flex items-center justify-center rounded-full bg-[#efeded] transition-colors duration-300 group-hover:bg-[#0e0f0f] group-hover:text-[#ffffff]">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[24px] font-medium leading-[1.4] text-[#0e0f0f] mb-[12px]">Terjamin Halal</h3>
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Seluruh bahan, proses memasak, hingga penyajian telah memiliki standar tersertifikasi halal.</p>
            </div>
            <div className="text-center p-[32px] border border-[#c4c7c7] hover:border-[#0e0f0f] hover:shadow-xl hover:shadow-[#0e0f0f]/5 transition-all duration-300 rounded-sm group cursor-default bg-[#fbf9f8]">
              <div className="w-16 h-16 mx-auto mb-[24px] flex items-center justify-center rounded-full bg-[#efeded] transition-colors duration-300 group-hover:bg-[#0e0f0f] group-hover:text-[#ffffff]">
                <Droplets size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[24px] font-medium leading-[1.4] text-[#0e0f0f] mb-[12px]">Higienis & Bersih</h3>
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Protokol kesehatan ketat dalam pengolahan hingga pengemasan untuk menjamin kualitas makanan.</p>
            </div>
            <div className="text-center p-[32px] border border-[#c4c7c7] hover:border-[#0e0f0f] hover:shadow-xl hover:shadow-[#0e0f0f]/5 transition-all duration-300 rounded-sm group cursor-default bg-[#fbf9f8]">
              <div className="w-16 h-16 mx-auto mb-[24px] flex items-center justify-center rounded-full bg-[#efeded] transition-colors duration-300 group-hover:bg-[#0e0f0f] group-hover:text-[#ffffff]">
                <Sparkles size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[24px] font-medium leading-[1.4] text-[#0e0f0f] mb-[12px]">Pelayanan Tepat Waktu</h3>
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Tim operasional yang solid memastikan pesanan tiba dan tersaji tepat waktu di lokasi acara Anda.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-[80px] bg-[#0e0f0f] text-[#ffffff] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#242424] opacity-50"></div>
          <div className="relative z-10 max-w-2xl mx-auto px-[24px]">
            <h2 className="font-serif text-[36px] font-semibold leading-[1.3] tracking-[-0.01em] mb-[24px]">
              Percayakan Momen Berharga Anda Bersama Kami
            </h2>
            <p className="font-sans text-[18px] leading-[1.6] opacity-80 mb-[48px]">
              Hubungi tim spesialis event kami hari ini untuk konsultasi dan pemesanan. Kami siap merealisasikan konsep hidangan terbaik untuk Anda.
            </p>
            <a href="https://wa.me/6285186880510" target="_blank" rel="noreferrer" className="inline-block font-sans text-[14px] font-semibold leading-none tracking-[0.05em] uppercase bg-[#fbf9f8] text-[#0e0f0f] px-[48px] py-[24px] hover:bg-[#dbdad9] transition-all rounded-sm">
              Hubungi Kami via WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full py-[64px] px-[24px] border-t border-[#c4c7c7] bg-[#e9e8e7]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-[48px]">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-[16px]">
            <div className="font-serif text-[32px] font-medium leading-[1.2] text-[#0e0f0f]">
              Restaurant Kurnia
            </div>
            <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#5e5f5c]">
              Sejak 1985
            </span>
            <p className="font-sans text-[16px] leading-[1.6] text-[#444748] max-w-md mt-4">
              Penyedia layanan catering profesional dengan sertifikasi halal, menghadirkan kelezatan masakan otentik untuk segala bentuk perayaan Anda.
            </p>
          </div>
          
          {/* Contact Details */}
          <div className="md:col-span-4 flex flex-col gap-[24px]">
            <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#0e0f0f] border-b border-[#c4c7c7] pb-2">Informasi Kontak</span>
            
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[#5e5f5c] flex-shrink-0 mt-1" />
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">
                Jl. Jend. A. Yani 49/51,<br/>Pasuruan - Jawa Timur
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-[#5e5f5c] flex-shrink-0 mt-1" />
              <div className="font-sans text-[16px] leading-[1.6] text-[#444748]">
                <p>Telp: (0343) 424408, 426608</p>
                <p>Fax: (0343) 424189</p>
                <p className="mt-2 font-semibold">WA: 085.186.880.510</p>
                <p className="font-semibold">WA: 081.803.150.510</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-[#5e5f5c] flex-shrink-0" />
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">
                marketing.rmkurnia@gmail.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-[24px]">
            <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] uppercase text-[#0e0f0f] border-b border-[#c4c7c7] pb-2">Layanan Utama</span>
            <div className="flex flex-col gap-[12px]">
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Set Menu Banquet</p>
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Paket Prasmanan</p>
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Wedding & Engagement</p>
              <p className="font-sans text-[16px] leading-[1.6] text-[#444748]">Mealbox Packages</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto mt-[64px] pt-[24px] border-t border-[#c4c7c7] text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[14px] leading-[1.6] text-[#747878]">© 2026 Restaurant Kurnia. All rights reserved.</p>
          <div className="flex gap-4">
             <span className="font-sans text-[12px] font-bold leading-[1.2] tracking-[0.1em] text-[#0e0f0f] bg-[#e0e0dc] px-3 py-1 rounded-sm">HALAL CERTIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
