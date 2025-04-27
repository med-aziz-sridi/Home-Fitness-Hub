document.addEventListener('DOMContentLoaded', () => {
    // kol workout data mta3 l'app houni
    const fitnessContent = {
        yoga: [
            {
                title: "Morning Yoga Flow",
                duration: 20,
                videoId: "VaoV1PrYft4",
                description: "Start your day with this energizing flow",
                type: "video",
                views: 1200000,
                thumbnail: "https://img.youtube.com/vi/VaoV1PrYft4/hqdefault.jpg"
            },
            {
                title: "Evening Relaxation",
                duration: 30,
                videoId: "Cb6AQktYH3I",
                description: "Wind down with calming evening practice",
                type: "video",
                views: 900000,
                thumbnail: "https://img.youtube.com/vi/Cb6AQktYH3I/hqdefault.jpg"
            },
            {
                title: "Yoga for Beginners Playlist",
                duration: 120,
                playlistId: "PLui6Eyny-UzwxbWCWDbTzEwsZnnROBTIL",
                description: "A complete beginner's yoga playlist",
                type: "playlist",
                views: 2500000,
                thumbnail: "https://i.ytimg.com/vi_webp/VaoV1PrYft4/mqdefault.webp"
            },
            {
                title: "Power Yoga Blast",
                duration: 25,
                videoId: "4pKly2JojMw",
                description: "A powerful yoga session for strength.",
                type: "video",
                views: 800000,
                thumbnail: "https://img.youtube.com/vi/4pKly2JojMw/hqdefault.jpg"
            }
        ],
        cardio: [
            {
                title: "HIIT Workout",
                duration: 25,
                videoId: "ml6cT4AZdqI",
                description: "High intensity interval training",
                type: "video",
                views: 2000000,
                thumbnail: "https://img.youtube.com/vi/ml6cT4AZdqI/hqdefault.jpg"
            },
            {
                title: "Cardio Dance Party",
                duration: 40,
                videoId: "ZWk19OVon2k",
                description: "Fun dance cardio session",
                type: "video",
                views: 1500000,
                thumbnail: "https://img.youtube.com/vi/ZWk19OVon2k/hqdefault.jpg"
            },
            {
                title: "Cardio Burn Playlist",
                duration: 90,
                playlistId: "PL4o6kH9V1ivX5W7uO7lB43CFct3u0mRlW",
                description: "Best cardio workouts playlist",
                type: "playlist",
                views: 3000000,
                thumbnail: ""
            },
            {
                title: "Tabata Cardio",
                duration: 20,
                videoId: "VHyGqsPOUHs",
                description: "Quick Tabata cardio workout.",
                type: "video",
                views: 700000,
                thumbnail: "https://img.youtube.com/vi/VHyGqsPOUHs/hqdefault.jpg"
            }
        ],
        strength: [
            {
                title: "Full Body Strength",
                duration: 35,
                videoId: "U0bhE67HuDY",
                description: "No equipment strength workout",
                type: "video",
                views: 1100000,
                thumbnail: "https://img.youtube.com/vi/U0bhE67HuDY/hqdefault.jpg"
            },
            {
                title: "Strength Training Playlist",
                duration: 100,
                playlistId: "PLrTDMO7p7cZ2vQw6p6QvQw6p6QvQw6p6Q",
                description: "Strength routines for all levels",
                type: "playlist",
                views: 800000,
                thumbnail: ""
            },
            {
                title: "Upper Body Strength",
                duration: 30,
                videoId: "IODxDxX7oi4",
                description: "Upper body strength training.",
                type: "video",
                views: 600000,
                thumbnail: "https://img.youtube.com/vi/IODxDxX7oi4/hqdefault.jpg"
            }
        ],
        dance: [
            {
                title: "Zumba Dance Workout",
                duration: 50,
                videoId: "FP0wgVhUC9w",
                description: "Fun Zumba session for all",
                type: "video",
                views: 2100000,
                thumbnail: "https://img.youtube.com/vi/FP0wgVhUC9w/hqdefault.jpg"
            },
            {
                title: "Dance Fitness Playlist",
                duration: 80,
                playlistId: "PLrTDMO7p7cZ2vQw6p6QvQw6p6QvQw6p6Q",
                description: "Dance your way to fitness",
                type: "playlist",
                views: 1200000,
                thumbnail: ""
            },
            {
                title: "Hip Hop Dance",
                duration: 35,
                videoId: "ZWk19OVon2k",
                description: "Hip hop dance workout.",
                type: "video",
                views: 900000,
                thumbnail: "https://img.youtube.com/vi/ZWk19OVon2k/hqdefault.jpg"
            }
        ],
        pilates: [
            {
                title: "Beginner Pilates",
                duration: 30,
                videoId: "lCg_gh_fppI",
                description: "Pilates for beginners.",
                type: "video",
                views: 500000,
                thumbnail: "https://img.youtube.com/vi/lCg_gh_fppI/hqdefault.jpg"
            }
        ],
        mobility: [
            {
                title: "Full Body Mobility",
                duration: 20,
                videoId: "cQME3zW1b6A",
                description: "Improve your mobility.",
                type: "video",
                views: 400000,
                thumbnail: "https://img.youtube.com/vi/cQME3zW1b6A/hqdefault.jpg"
            }
        ]
    };

    // jib favorites mil localStorage (ki fama)
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // n7sbou workouts li kamlt'hom
    let completed = JSON.parse(localStorage.getItem('completed') || '[]');

    // chkoun workout fama fi favorites
    function isFavorited(item) {
        return favorites.some(fav => fav.title === item.title && fav.type === item.type);
    }

    // zid wala na7i workout mil favorites
    function toggleFavorite(item) {
        if (isFavorited(item)) {
            favorites = favorites.filter(fav => !(fav.title === item.title && fav.type === item.type));
        } else {
            favorites.push(item);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderContent();
    }

    // chkoun workout kamltou
    function isCompleted(item) {
        return completed.some(c => c.title === item.title && c.type === item.type);
    }

    // jib lyom b string (YYYY-MM-DD)
    function getTodayStr() {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    }

    // warri a5er 14 nhar w streak mta3ek
    function renderCalendarStreak() {
        const calendar = document.getElementById('calendarStreak');
        if (!calendar) return;
        // 3ml array mta3 a5er 14 nhar
        const days = [];
        const today = new Date();
        for (let i = 13; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push(d);
        }
        // jib ayem li 5dmt fihom
        const completedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');
        // 7seb streak mta3ek
        let streak = 0;
        for (let i = days.length - 1; i >= 0; i--) {
            const ds = days[i].toISOString().slice(0, 10);
            if (completedDates.includes(ds)) streak++;
            else break;
        }
        // warri l calendar
        let html = '<div class="calendar-row">';
        days.forEach(d => {
            const ds = d.toISOString().slice(0, 10);
            const isToday = ds === getTodayStr();
            const isDone = completedDates.includes(ds);
            html += `<div class="calendar-day${isDone ? ' done' : ''}${isToday ? ' today' : ''}" title="${ds}">${d.getDate()}</div>`;
        });
        html += '</div>';
        html += `<div class="calendar-streak-count">Current streak: ${streak} 🔥</div>`;
        calendar.innerHTML = html;
    }

    // 3ml workout kamltou wala la
    function toggleCompleted(item) {
        if (isCompleted(item)) {
            completed = completed.filter(c => !(c.title === item.title && c.type === item.type));
        } else {
            completed.push(item);
            // zid lyom fil streak calendar
            let completedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');
            const todayStr = getTodayStr();
            if (!completedDates.includes(todayStr)) {
                completedDates.push(todayStr);
                localStorage.setItem('completedDates', JSON.stringify(completedDates));
            }
        }
        localStorage.setItem('completed', JSON.stringify(completed));
        renderContent();
        renderProgress();
        renderCalendarStreak();
    }

    // jib thumbnail wala placeholder
    function getThumbnail(item) {
        if (item.thumbnail && item.thumbnail.trim() !== "") return item.thumbnail;
        if (item.type === "video" && item.videoId)
            return `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
        // ken ma fama chay, 3tih placeholder
        return "https://via.placeholder.com/320x180/1a73e8/ffffff?text=No+Thumbnail";
    }

    // filter 3la workouts b buttons mta3 navbar
    let filterMode = "all";
    function filterByMode(videos, cat) {
        if (filterMode === "favorites") {
            return videos.filter(isFavorited);
        }
        if (filterMode === "done") {
            return videos.filter(isCompleted);
        }
        if (filterMode === "notDone") {
            return videos.filter(v => !isCompleted(v));
        }
        return videos;
    }

    // 3ml accordion mta3 kol categories w workouts
    function createAccordionItems(filteredContent = null, sortBy = "default") {
        const container = document.getElementById('workoutCategories');
        container.innerHTML = "";

        const content = filteredContent || fitnessContent;

        for (const [category, videos] of Object.entries(content)) {
            let sortedVideos = [...videos];
            if (sortBy === "name") {
                sortedVideos.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === "duration") {
                sortedVideos.sort((a, b) => a.duration - b.duration);
            } else if (sortBy === "popularity") {
                sortedVideos.sort((a, b) => b.views - a.views);
            }

            // warri ken li match m3a filter
            const filteredVideos = filterByMode(sortedVideos, category);

            // skip ken ma fama hata video
            if (filteredVideos.length === 0) continue;

            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            categoryElement.innerHTML = `
                <div class="category-header">
                    <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="category-content"></div>
            `;

            const contentDiv = categoryElement.querySelector('.category-content');
            filteredVideos.forEach((video, idx) => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                if (isCompleted(video)) videoCard.classList.add('completed');

                // click 3la image wala title y7ell page mta3 workout
                videoCard.innerHTML = `
                    <a href="exercise.html?cat=${category}&id=${videos.indexOf(video)}" class="video-title" style="display:block;text-decoration:none;">
                        <img class="video-thumbnail" src="${getThumbnail(video)}" alt="thumbnail" style="cursor:pointer;">
                        <span style="display:block;color:var(--primary);font-weight:bold;font-size:1.1rem;text-align:left;margin-top:0.5rem;">${video.title}</span>
                    </a>
                    <p>${video.description}</p>
                    <p>Duration: ${video.duration} min</p>
                `;

                contentDiv.appendChild(videoCard);
            });

            // click 3la header y7ell wala ysaker accordion
            const header = categoryElement.querySelector('.category-header');
            header.addEventListener('click', () => {
                contentDiv.classList.toggle('open');
                const icon = header.querySelector('.fa-chevron-down');
                if (contentDiv.classList.contains('open')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = '';
                }
            });

            container.appendChild(categoryElement);
        }
    }

    // warri progress bar w stats
    function renderProgress() {
        const tracker = document.getElementById('progressTracker');
        const total = Object.values(fitnessContent).flat().length;
        const done = completed.length;
        const percent = total ? Math.round((done / total) * 100) : 0;
        tracker.innerHTML = `
            <span><b>Progress:</b></span>
            <div class="progress-bar-bg">
                <div class="progress-bar" style="width:${percent}%"></div>
            </div>
            <span>${done} / ${total} completed (${percent}%)</span>
        `;
    }

    // search 3la workouts b title, description, wala category
    function filterContent(query) {
        if (!query.trim()) {
            renderContent();
            return;
        }
        const filtered = {};
        for (const [cat, videos] of Object.entries(fitnessContent)) {
            const filteredVideos = videos.filter(v =>
                v.title.toLowerCase().includes(query.toLowerCase()) ||
                v.description.toLowerCase().includes(query.toLowerCase()) ||
                cat.toLowerCase().includes(query.toLowerCase())
            );
            if (filteredVideos.length) filtered[cat] = filteredVideos;
        }
        createAccordionItems(filtered, document.getElementById('sortSelect').value);
    }

    // render kol chay b sort w filter tawa
    function renderContent() {
        createAccordionItems(null, document.getElementById('sortSelect').value);
        renderProgress();
        renderCalendarStreak();
    }

    // dark mode: 7ot wala na7i w 5azenha
    function setDarkMode(enabled) {
        if (enabled) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    }

    // click 3la btn ybadel dark mode
    document.getElementById('themeToggle').addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    });

    // ken dark mode mkhzn, 7otou ki t7al page
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark-mode');
    }

    // event mta3 search bar
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterContent(e.target.value);
    });

    // event mta3 sort dropdown
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        renderContent();
    });

    // buttons mta3 navbar
    document.getElementById('allBtn').addEventListener('click', () => {
        filterMode = "all";
        setActiveNavBtn('allBtn');
        renderContent();
    });
    document.getElementById('favoritesBtn').addEventListener('click', () => {
        filterMode = "favorites";
        setActiveNavBtn('favoritesBtn');
        renderContent();
    });
    document.getElementById('doneBtn').addEventListener('click', () => {
        filterMode = "done";
        setActiveNavBtn('doneBtn');
        renderContent();
    });
    document.getElementById('notDoneBtn').addEventListener('click', () => {
        filterMode = "notDone";
        setActiveNavBtn('notDoneBtn');
        renderContent();
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
        filterMode = "all";
        setActiveNavBtn('homeBtn');
        renderContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // warri button li active fi navbar
    function setActiveNavBtn(id) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    // awel render ki t7al page
    setActiveNavBtn('allBtn');
    renderContent();
});