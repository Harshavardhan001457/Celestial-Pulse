// Configuration for the 4 celestial bodies
const celestialObjects = [
    {
        name: "Moon",
        type: "Satellite",
        baseMag: -12.7,
        constellation: "Taurus",
        icon: "moon",
        color: "text-blue-100"
    },
    {
        name: "Mars",
        type: "Planet",
        baseMag: 1.5,
        constellation: "Gemini",
        icon: "orbit",
        color: "text-red-400"
    },
    {
        name: "Polaris",
        type: "Star",
        baseMag: 1.97,
        constellation: "Ursa Minor",
        icon: "star",
        color: "text-yellow-200"
    },
    {
        name: "Halley's Comet",
        type: "Comet",
        baseMag: 25.0,
        constellation: "Hydra",
        icon: "comet",
        color: "text-cyan-400"
    }
];

function updateDashboard() {
    const now = new Date();
    const hour = now.getHours();
    const dashboard = document.getElementById('dashboard-grid');
    dashboard.innerHTML = '';

    // Update Clock
    document.getElementById('live-clock').innerText = now.toLocaleTimeString();

    celestialObjects.forEach(obj => {
        // Simulate visibility (Visible from 6 PM to 6 AM)
        const isVisible = (hour >= 18 || hour <= 6);
        // Stars (Polaris) are always "up" in the North
        const status = (obj.name === "Polaris" || isVisible) ? "Visible" : "Below Horizon";
        const statusColor = status === "Visible" ? "bg-green-500" : "bg-red-500";
        
        // Simulate slight magnitude fluctuations
        const currentMag = (obj.baseMag + (Math.random() * 0.05)).toFixed(2);

        const card = `
            <div class="glass-card p-6 rounded-2xl relative overflow-hidden">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-white/5 rounded-lg ${obj.color}">
                        <i data-lucide="${obj.icon}"></i>
                    </div>
                    <span class="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusColor}/20 text-white border border-${statusColor}/50">
                        <span class="w-2 h-2 rounded-full ${statusColor} ${status === 'Visible' ? 'pulse-green' : ''}"></span>
                        ${status}
                    </span>
                </div>
                
                <h3 class="text-2xl font-space font-bold mb-1">${obj.name}</h3>
                <p class="text-gray-400 text-xs uppercase tracking-widest mb-4">${obj.type} • ${obj.constellation}</p>
                
                <div class="space-y-3 pt-4 border-t border-white/5">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Apparent Mag</span>
                        <span class="font-mono text-blue-300">${currentMag}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Altitude</span>
                        <span class="font-mono">${status === 'Visible' ? Math.floor(Math.random() * 90) + '°' : '- -'}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Azimuth</span>
                        <span class="font-mono">${Math.floor(Math.random() * 360)}° NE</span>
                    </div>
                </div>
            </div>
        `;
        dashboard.innerHTML += card;
    });

    // Re-initialize icons
    lucide.createIcons();
    
    // Simulate satellite count jitter
    document.getElementById('sat-count').innerText = (1240 + Math.floor(Math.random() * 10)).toLocaleString();
}

// Initial Call
updateDashboard();

// Update every second
setInterval(updateDashboard, 1000);
