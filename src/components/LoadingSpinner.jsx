// Loading indicator: small rotating circle + text
export default function LoadingSpinner() {
    return (
        <div className="loading-message">
            <span className="spinner"></span>
            <p>Loading weather...</p>
        </div>
    );
}