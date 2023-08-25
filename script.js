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

// Your existing code...

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDSEgQW3AVCyq2GEK7ySOwiIo7QGdcJkx0",
    authDomain: "voting-ac3b3.firebaseapp.com",
    projectId: "voting-ac3b3",
    storageBucket: "voting-ac3b3.appspot.com",
    messagingSenderId: "1058093814912",
    appId: "1:1058093814912:web:0177e3035d91e88f05c265",
    measurementId: "G-X20NQNRWVT"
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const database = firebase.database();

// Get a reference to the "projects" node in the database
const projectsRef = database.ref('projects');

// Function to handle voting for a project
function handleVote(projectId) {
    const projectRef = projectsRef.child(projectId);
    
    projectRef.transaction(function(currentData) {
        // Increment the vote count
        return {
            ...currentData,
            voteCount: (currentData.voteCount || 0) + 1
        };
    });
}

// Function to update vote counts in the UI
function updateVoteCounts() {
    projectsRef.on('value', function(snapshot) {
        const projects = snapshot.val();
        
        for (const projectId in projects) {
            const voteCount = projects[projectId].voteCount || 0;
            const voteCountElement = document.getElementById(`${projectId}-count`);
            if (voteCountElement) {
                voteCountElement.textContent = `${projects[projectId
