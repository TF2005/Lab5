import { useState } from 'react';
import ErrorMessage from './ErrorMessage.jsx';

// Search bar: input field and search button
export default function SearchBar({ onSearch, onType }) {
    const [text, setText] = useState(''); // the text in the input field
    const [error, setError] = useState(''); // the error message to display if needed

    // On every keystroke: keep the text and clear the error
    function handleChange(e) {
        setText(e.target.value);
        setError('');
        onType(); // tells App the search is being edited
    }

    // When the form is submitted (button or Enter key)
    function handleSubmit(e) {
        e.preventDefault(); // prevents the page from reloading
        const city = text.trim();
        // Empty field: show an error and send nothing
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        setError('');
        onSearch(city); // tells App to start the search
    }

    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="city-input"
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onFocus={e => e.target.select()}
                    placeholder="📍 Enter a city name..."
                />
                <button type="submit">🔍︎ Search</button>
            </form>
            {error && <ErrorMessage message={error} />}
        </>
    );
}