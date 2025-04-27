// Helper: parse query string
function getQueryParams() {
    const params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, k, v) {
        params[k] = decodeURIComponent(v);
    });
    return params;
}

// Should match the structure in scripts.js
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
        }
    ]
};

function getThumbnail(item) {
    if (item.thumbnail && item.thumbnail.trim() !== "") return item.thumbnail;
    if (item.type === "video" && item.videoId)
        return `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
    return "https://via.placeholder.com/320x180/1a73e8/ffffff?text=No+Thumbnail";
}

function getTodayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

function renderExercise() {
    const params = getQueryParams();
    const cat = params.cat;
    const id = parseInt(params.id, 10);
    if (!cat || isNaN(id) || !fitnessContent[cat] || !fitnessContent[cat][id]) {
        document.getElementById('exerciseContainer').innerHTML = "<p>Exercise not found.</p>";
        return;
    }
    const item = fitnessContent[cat][id];

    // Load favorites and completed
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let completed = JSON.parse(localStorage.getItem('completed') || '[]');
    let completedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');

    function isFavorited() {
        return favorites.some(fav => fav.title === item.title && fav.type === item.type);
    }
    function isCompleted() {
        return completed.some(c => c.title === item.title && c.type === item.type);
    }

    // Button text based on state
    const favText = isFavorited() ? "★ Unfavorite" : "☆ Favorite";
    const doneText = isCompleted() ? "✗ Mark as Undone" : "✓ Mark as Done";

    function toggleFavorite() {
        if (isFavorited()) {
            favorites = favorites.filter(fav => !(fav.title === item.title && fav.type === item.type));
        } else {
            favorites.push(item);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderExercise();
    }
    function toggleCompleted() {
        if (isCompleted()) {
            completed = completed.filter(c => !(c.title === item.title && c.type === item.type));
        } else {
            completed.push(item);
            // Mark today as completed in calendar
            const todayStr = getTodayStr();
            if (!completedDates.includes(todayStr)) {
                completedDates.push(todayStr);
                localStorage.setItem('completedDates', JSON.stringify(completedDates));
            }
        }
        localStorage.setItem('completed', JSON.stringify(completed));
        renderExercise();
    }

    // Video/player
    let videoEmbed = '';
    if (item.type === "playlist" && item.playlistId) {
        videoEmbed = `<iframe width="100%" height="350" src="https://www.youtube.com/embed/videoseries?list=${item.playlistId}" frameborder="0" allowfullscreen></iframe>`;
    } else if (item.type === "video" && item.videoId) {
        videoEmbed = `<iframe width="100%" height="350" src="https://www.youtube.com/embed/${item.videoId}" frameborder="0" allowfullscreen></iframe>`;
    }

    // Music player (list all mp3s in /music)
    const musicTracks = [
        { name: "Unnamed Memories", file: "music/Unnamed Memories.mp3" },
        { name: "Malo Tebya", file: "music/Malo Tebya.mp3" },
        { name: "Blackout", file: "music/Blackout.mp3" }
    ];
    let musicPlayer = `
        <div style="margin:1.5rem 0;">
            <b>Workout Music:</b>
            <select id="musicSelect" class="music-select">
                ${musicTracks.map((t, i) => `<option value="${t.file}">${t.name}</option>`).join('')}
            </select>
            <audio id="audioPlayer" controls style="width:100%;margin-top:0.5rem;" src="${musicTracks[0].file}">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;

    // Main content
    document.getElementById('exerciseContainer').innerHTML = `
        <div class="video-card exercise-detail" style="margin:auto;">
            <img class="video-thumbnail" src="${getThumbnail(item)}" alt="thumbnail" style="margin-bottom:1rem;">
            <h2>${item.title}</h2>
            <div style="margin-bottom:1rem;">${videoEmbed}</div>
            <p>${item.description}</p>
            <p><b>Duration:</b> ${item.duration} min</p>
            <button class="exercise-action-btn favorite${isFavorited() ? ' favorited' : ''}" id="favBtn">${favText}</button>
            <button class="exercise-action-btn done${isCompleted() ? ' completed' : ''}" id="doneBtn">${doneText}</button>
            ${musicPlayer}
        </div>
        <div class="exercise-nav">
            <button id="backBtn" class="nav-btn">←</button>
            <button id="nextBtn" class="nav-btn">→</button>
        </div>
    `;

    // Button events
    document.getElementById('favBtn').onclick = function(e) {
        e.preventDefault();
        toggleFavorite();
    };
    document.getElementById('doneBtn').onclick = function(e) {
        e.preventDefault();
        toggleCompleted();
    };

    // Back/Next navigation (cycle through category)
    document.getElementById('backBtn').onclick = function() {
        const prevId = (id - 1 + fitnessContent[cat].length) % fitnessContent[cat].length;
        window.location.href = `exercise.html?cat=${cat}&id=${prevId}`;
    };
    document.getElementById('nextBtn').onclick = function() {
        const nextId = (id + 1) % fitnessContent[cat].length;
        window.location.href = `exercise.html?cat=${cat}&id=${nextId}`;
    };

    // Music select event (ensure it works)
    setTimeout(() => {
        const musicSel = document.getElementById('musicSelect');
        const audio = document.getElementById('audioPlayer');
        if (musicSel && audio) {
            musicSel.addEventListener('change', function() {
                audio.src = this.value;
                audio.load();
                audio.play();
            });
        }
    }, 100);
}

// On load
window.onload = renderExercise;
