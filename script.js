// Select DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistoryList = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history-button');

// Function to retrieve search history from Local Storage
function getSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

// Function to save search history to Local Storage
function saveSearchHistory(history) {
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Function to add a new search term to history
function addSearchTerm(term) {
    if (!term) return; // Do not add empty terms

    let history = getSearchHistory();

    // Avoid duplicate consecutive entries
    if (history.length === 0 || history[history.length - 1] !== term) {
        history.push(term);
        saveSearchHistory(history);
        renderSearchHistory();
    }
}

// Function to render search history in the DOM
function renderSearchHistory() {
    const history = getSearchHistory();
    // Clear current list
    searchHistoryList.innerHTML = '';

    // Populate list with history items
    history.forEach((term) => {
        const li = document.createElement('li');
        li.textContent = term;
        // Allow users to click on history items to search again
        li.addEventListener('click', () => {
            searchInput.value = term;
            performSearch();
        });
        searchHistoryList.appendChild(li);
    });
}

// Function to perform search (placeholder for actual search logic)
function performSearch() {
    const query = searchInput.value.trim();
    if (query === '') {
        alert('Please enter a search query.');
        return;
    }

    // Placeholder for actual search functionality
    // For demonstration, we'll just log the search term
    console.log(`Searching for: ${query}`);

    // Add search term to history
    addSearchTerm(query);

    // Optionally, clear the search input
    // searchInput.value = '';
}

// Event listeners
searchButton.addEventListener('click', performSearch);

// Allow pressing Enter to trigger search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Clear history
clearHistoryButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your search history?')) {
        localStorage.removeItem('searchHistory');
        renderSearchHistory();
    }
});

// Initial rendering of search history on page load
document.addEventListener('DOMContentLoaded', renderSearchHistory);
