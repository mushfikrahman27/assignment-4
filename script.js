
let jobApplications = [
    { id: 'job_01', company: "EcoLoop Systems", position: "Sustainability Tech Lead", location: "Oslo (Remote)", type: "Full-time", salary: "$145,000", status: "all", desc: "Developing carbon-tracking algorithms and circular economy dashboards for global manufacturing clients." },
    { id: 'job_02', company: "Velociti FinTech", position: "Senior Payments Engineer", location: "New York", type: "Full-time", salary: "$190,000", status: "all", desc: "Optimizing high-frequency transaction pipelines and integrating secure crypto-settlement layers." },
    { id: 'job_03', company: "Studio Muse", position: "Interactive UX Designer", location: "London", type: "Contract", salary: "£450/day", status: "all", desc: "Crafting immersive educational interfaces and motion-heavy branding for high-end boutique clients." },
    { id: 'job_04', company: "AeroAI", position: "Computer Vision Specialist", location: "San Francisco", type: "Hybrid", salary: "$170,000", status: "all", desc: "Training vision models for autonomous drone delivery systems and obstacle avoidance." },
    { id: 'job_05', company: "HealthPlex", position: "EHR Backend Architect", location: "Remote", type: "Full-time", salary: "$135,000", status: "all", desc: "Securing patient data infrastructure and building real-time collaboration tools for surgical teams." },
    { id: 'job_06', company: "PixelPeak Games", position: "Game Engine Developer", location: "Tokyo", type: "Full-time", salary: "¥9.5M", status: "all", desc: "Refining core physics engines and rendering pipelines for next-gen mobile gaming experiences." },
    { id: 'job_07', company: "Stellar Cloud", position: "Site Reliability Engineer", location: "Berlin", type: "Full-time", salary: "€85,000", status: "all", desc: "Maintaining 99.9% uptime for global SaaS platforms through automation and chaos engineering." },
    { id: 'job_08', company: "UrbanRoot", position: "Logistics Developer", location: "Chicago", type: "Part-time", salary: "$65/hr", status: "all", desc: "Streamlining 'last-mile' delivery routes for local urban farming cooperatives." }
];

 
let currentFilter = 'all';

 
function renderDashboard() {
    const listElement = document.getElementById('dynamic-content-area');
    
     
    const displayList = jobApplications.filter(job => 
        currentFilter === 'all' ? true : job.status === currentFilter
    );
 
    document.getElementById('total-val').innerText = jobApplications.length;
    document.getElementById('interview-val').innerText = jobApplications.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-val').innerText = jobApplications.filter(j => j.status === 'rejected').length;
    
 
    document.getElementById('job-count-label').innerText = `${displayList.length} jobs`;

 
    if (displayList.length === 0) {
        listElement.innerHTML = `
            <div class="empty-state">
                <img src="https://cdn-icons-png.flaticon.com/512/10531/10531853.png" class="empty-img" alt="No jobs">
                <h2 class="empty-title">No jobs available</h2>
                <p class="empty-subtitle">Check back soon for new job opportunities in the ${currentFilter} category.</p>
            </div>`;
        return;
    }
 
    listElement.innerHTML = displayList.map(item => `
        <article class="job-card">
            <div class="trash-icon" title="Remove Application" onclick="removeEntry('${item.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </div>
            
            <header>
                <h4 class="company-name">${item.company}</h4>
                <p class="role-title">${item.position}</p>
            </header>
            
            <div class="card-meta">
                ${item.location} • ${item.type} • ${item.salary}
            </div>
            
            <div class="status-pill">
                ${item.status === 'all' ? 'NOT APPLIED' : item.status.toUpperCase()}
            </div>
            
            <p class="job-summary">${item.desc}</p>
            
            <footer class="card-actions">
                <button class="action-btn btn-interview ${item.status === 'interview' ? 'active-status' : ''}" 
                        onclick="updateJobStatus('${item.id}', 'interview')">
                    INTERVIEW
                </button>
                <button class="action-btn btn-rejected ${item.status === 'rejected' ? 'active-status' : ''}" 
                        onclick="updateJobStatus('${item.id}', 'rejected')">
                    REJECTED
                </button>
            </footer>
        </article>
    `).join('');
}

 
function updateJobStatus(targetId, targetState) {
    const targetJob = jobApplications.find(j => j.id === targetId);
    
    if (targetJob.status === targetState) {
        targetJob.status = 'all';
    } else {
        targetJob.status = targetState;
    }
    
    renderDashboard();
}

 
function removeEntry(targetId)
 {
    jobApplications = jobApplications.filter(j => j.id !== targetId);
    renderDashboard();
}
 


document.getElementById('tabGroup').addEventListener('click', (event) => {
    if (event.target.classList.contains('tab-btn')) {
        // Update UI Active State
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
     
        currentFilter = event.target.dataset.tab;
        renderDashboard();
    }
});

 
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
});