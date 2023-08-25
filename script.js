// Get references to DOM elements
const votingForm = document.getElementById('voting-form');
const voteButton = document.getElementById('vote-button');
const project1Count = document.getElementById('project1-count');
const project2Count = document.getElementById('project2-count');
const project3Count = document.getElementById('project3-count');

// Initialize vote counts
let votes = {
    project1: 0,
    project2: 0,
    project3: 0
};

// Handle vote submission
voteButton.addEventListener('click', function() {
    const selectedProject = votingForm.projects.value;
    if (selectedProject && votes.hasOwnProperty(selectedProject)) {
        votes[selectedProject]++;
        updateVoteCounts();
    }
});

// Update vote counts on the page
function updateVoteCounts() {
    project1Count.textContent = `Project 1: ${votes.project1}`;
    project2Count.textContent = `Project 2: ${votes.project2}`;
    project3Count.textContent = `Project 3: ${votes.project3}`;
}

// Initial update of vote counts
updateVoteCounts();
