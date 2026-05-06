export const ErrorMsg = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div>
      <h1>Erreur</h1>
      <p>{message}</p>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};
