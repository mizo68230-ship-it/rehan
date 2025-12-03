// بيانات أوقات الصلاة لمحافظات مصر (تقريبية للعرض فقط)
const prayerTimesData = {
    cairo: {
        city: "القاهرة",
        fajr: "4:25 ص",
        sunrise: "5:50 ص",
        dhuhr: "12:05 م",
        asr: "3:35 م",
        maghrib: "6:10 م",
        isha: "7:30 م"
    },
    giza: {
        city: "الجيزة",
        fajr: "4:27 ص",
        sunrise: "5:52 ص",
        dhuhr: "12:06 م",
        asr: "3:36 م",
        maghrib: "6:11 م",
        isha: "7:31 م"
    },
    alex: {
        city: "الإسكندرية",
        fajr: "4:35 ص",
        sunrise: "6:00 ص",
        dhuhr: "12:10 م",
        asr: "3:40 م",
        maghrib: "6:15 م",
        isha: "7:35 م"
    },
    mansoura: {
        city: "الدقهلية (المنصورة)",
        fajr: "4:30 ص",
        sunrise: "5:55 ص",
        dhuhr: "12:07 م",
        asr: "3:37 م",
        maghrib: "6:12 م",
        isha: "7:32 م"
    },
    tanta: {
        city: "الغربية (طنطا)",
        fajr: "4:32 ص",
        sunrise: "5:57 ص",
        dhuhr: "12:08 م",
        asr: "3:38 م",
        maghrib: "6:13 م",
        isha: "7:33 م"
    },
    zagazig: {
        city: "الشرقية (الزقازيق)",
        fajr: "4:28 ص",
        sunrise: "5:53 ص",
        dhuhr: "12:06 م",
        asr: "3:36 م",
        maghrib: "6:11 م",
        isha: "7:31 م"
    },
    minya: {
        city: "المنيا",
        fajr: "4:35 ص",
        sunrise: "5:58 ص",
        dhuhr: "12:05 م",
        asr: "3:35 م",
        maghrib: "6:12 م",
        isha: "7:32 م"
    },
    asyut: {
        city: "أسيوط",
        fajr: "4:38 ص",
        sunrise: "6:01 ص",
        dhuhr: "12:07 م",
        asr: "3:37 م",
        maghrib: "6:14 م",
        isha: "7:34 م"
    },
    aswan: {
        city: "أسوان",
        fajr: "4:45 ص",
        sunrise: "6:10 ص",
        dhuhr: "12:10 م",
        asr: "3:40 م",
        maghrib: "6:18 م",
        isha: "7:38 م"
    }
};

// بيانات الرموز والأسماء العربية للصلوات
const prayers = [
    { id: "fajr", name: "الفجر", icon: "fas fa-moon", timeKey: "fajr" },
    { id: "sunrise", name: "الشروق", icon: "fas fa-sun", timeKey: "sunrise" },
    { id: "dhuhr", name: "الظهر", icon: "fas fa-sun", timeKey: "dhuhr" },
    { id: "asr", name: "العصر", icon: "fas fa-cloud-sun", timeKey: "asr" },
    { id: "maghrib", name: "المغرب", icon: "fas fa-sunset", timeKey: "maghrib" },
    { id: "isha", name: "العشاء", icon: "fas fa-moon-stars", timeKey: "isha" }
];

// دالة لتحديث التاريخ
function updateDates() {
    const today = new Date();
    
    // التاريخ الهجري (تقريبي/ثابت – للتجربة)
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const hijriDay = 15;
    const hijriMonth = hijriMonths[8]; // رمضان
    const hijriYear = 1445;
    
    // التاريخ الميلادي
    const gregorianDay = today.getDate();
    const gregorianMonth = today.toLocaleString('ar-EG', { month: 'long' });
    const gregorianYear = today.getFullYear();
    
    const hijriElement = document.getElementById('hijriDate');
    const gregElement = document.getElementById('gregorianDate');

    if (hijriElement) hijriElement.textContent = `${hijriDay} ${hijriMonth} ${hijriYear} هـ`;
    if (gregElement) gregElement.textContent = `${gregorianDay} ${gregorianMonth} ${gregorianYear} م`;
}

// دالة لتحديد الصلاة الحالية (تجريبية – يمكنك تطويرها لاحقًا)
function getCurrentPrayer() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // منطق بسيط للتجربة (مش حساب حقيقي)
    if (currentTimeInMinutes < 6 * 60) return "fajr";
    if (currentTimeInMinutes < 12 * 60) return "dhuhr";
    if (currentTimeInMinutes < 16 * 60) return "asr";
    if (currentTimeInMinutes < 19 * 60) return "maghrib";
    return "isha";
}

// دالة لعرض أوقات الصلاة
function displayPrayerTimes(city = "cairo") {
    const prayerData = prayerTimesData[city];
    const currentPrayer = getCurrentPrayer();
    const container = document.getElementById('prayerTimesContainer');
    
    if (!container || !prayerData) return;

    let html = '';
    
    prayers.forEach(prayer => {
        const isCurrent = prayer.id === currentPrayer;
        const time = prayerData[prayer.timeKey];
        
        html += `
        <div class="col-md-4 col-lg-2 col-6">
            <div class="prayer-time-card ${isCurrent ? 'current' : ''}">
                ${isCurrent ? '<div class="current-prayer-indicator">الآن</div>' : ''}
                <div class="prayer-icon">
                    <i class="${prayer.icon}"></i>
                </div>
                <div class="prayer-name">${prayer.name}</div>
                <div class="prayer-time-value">${time}</div>
                ${isCurrent ? '<div class="prayer-time-remaining">تذكير بالصلاة الحالية</div>' : ''}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

/* مشغل القرآن الكريم */

// خريطة للسور وروابط الصوت
const surahAudioMap = {
    fatiha: {
        name: "سورة الفاتحة",
        src: "001.mp3"
    },
    ikhlas: {
        name: "سورة الإخلاص",
        src: "112.mp3"
    },
    falaq: {
        name: "سورة الفلق",
        src: "113.mp3"
    },
    nas: {
        name: "سورة الناس",
        src: "114.mp3"
    }
};

function initQuranPlayer() {
    const surahSelect = document.getElementById('surahSelect');
    const audio = document.getElementById('quranAudio');
    const source = document.getElementById('quranSource');
    const currentSurahName = document.getElementById('currentSurahName');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    if (!surahSelect || !audio || !source || !currentSurahName) return;

    // تغيير السورة
    surahSelect.addEventListener('change', function () {
        const key = this.value;
        const surah = surahAudioMap[key];
        if (!surah) return;

        source.src = surah.src;
        audio.load();
        currentSurahName.textContent = surah.name;
        audio.play();
    });

    // زر تشغيل
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            audio.play();
        });
    }

    // زر إيقاف مؤقت
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            audio.pause();
        });
    }
}

/* عداد التسبيح */

function initTasbeehCounter() {
    const countEl = document.getElementById('tasbeehCount');
    const tasbeehBtn = document.getElementById('tasbeehBtn');
    const resetBtn = document.getElementById('resetTasbeehBtn');

    if (!countEl || !tasbeehBtn || !resetBtn) return;

    let count = 0;

    tasbeehBtn.addEventListener('click', () => {
        count += 1;
        countEl.textContent = count;
        // أنيمشن بسيطة
        countEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            countEl.style.transform = 'scale(1)';
        }, 150);
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        countEl.textContent = count;
    });
}

// تهيئة الموقع
function initializeSite() {
    // تحديث التاريخ
    updateDates();
    
    // عرض أوقات الصلاة الافتراضية
    displayPrayerTimes();
    
    // تغيير المحافظة
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
        citySelect.addEventListener('change', function () {
            displayPrayerTimes(this.value);
        });
    }

    // مشغل القرآن
    initQuranPlayer();

    // عداد التسبيح
    initTasbeehCounter();

    // سكرول ناعم للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // تأثيرات تفاعلية للبطاقات
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // تأثيرات على الروابط في النافبار
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// تشغيل التهيئة بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeSite);
