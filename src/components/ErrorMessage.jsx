// Displays an error message received from the parent component
export default function ErrorMessage({ message }) {
  return <p className="error-message">{message}</p>;
}