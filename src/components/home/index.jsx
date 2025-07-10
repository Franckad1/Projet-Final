import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dbProvider from "../../Providers/dbProvider";
import { useAuth } from "../../contexts/auth";

const Home = () => {
  // État pour stocker la liste des événements
  const [events, setEvents] = useState([]);

  // État pour afficher ou non la popup de confirmation
  const [showPopup, setShowPopup] = useState(false);

  // Stocke l'identifiant de l'événement sélectionné pour suppression
  const [eventToDelete, setEventToDelete] = useState(null);

  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  // Récupère tous les événements au chargement de la page
  useEffect(() => {
    const getAllData = async () => {
      const list = await dbProvider.getAllData("events");
      setEvents(list);
    };
    getAllData();
  }, []);

  // Ouvre la popup de confirmation pour supprimer un événement
  const handleDeleteClick = (id) => {
    setEventToDelete(id);
    setShowPopup(true);
  };

  // Confirme la suppression de l'événement sélectionné
  const confirmDelete = async () => {
    if (eventToDelete) {
      await dbProvider.deleteData("events", eventToDelete);
      const updatedList = await dbProvider.getAllData("events");
      setEvents(updatedList);
      setEventToDelete(null);
      setShowPopup(false);
    }
  };

  // Annule la suppression d'un événement
  const cancelDelete = () => {
    setEventToDelete(null);
    setShowPopup(false);
  };

  return (
    <>
      {userLoggedIn ? (
        <div className="max-w-5xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
          {/* Bouton pour ajouter un nouvel événement */}
          <div className="text-right mb-8">
            <button
              onClick={() => navigate("/form/0")}
              className="px-4 py-2 text-sm sm:text-base font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Add a New Event
            </button>
          </div>

          {/* Affichage quand aucun événement n'est enregistré */}
          {events.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-300 mb-1">
                No events
              </h3>
              <p className="text-sm text-gray-500">
                Get started by adding your first event.
              </p>
            </div>
          ) : (
            // Affichage de la liste des événements
            <div className="space-y-6">
              <div className="text-left mb-8">
                <p className="px-4 py-2 text-lg sm:text-base font-medium text-white">
                  {events.length > 1 ? "Total events : " : "Event : "}
                  {events.length}
                </p>
              </div>

              {/* Parcours de chaque événement */}
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`relative border rounded-lg p-6 text-white shadow-md transition duration-300 ${
                    event.data.disponibilite === "available"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {/* Bouton de suppression */}
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(event.id)}
                    className="absolute top-3 right-3 text-sm text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-2 py-1 rounded transition"
                    title="Delete"
                  >
                    ✕
                  </button>

                  {/* Lien vers la page de modification de l’événement */}
                  <Link to={`/Form/${event.id}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                      <div className="flex">
                        <span className="font-medium w-28 text-left">
                          Date :
                        </span>
                        <span>
                          {event.data.date.toDate().toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-28 text-left">
                          Place / Event :
                        </span>
                        <span>{event.data.lieux}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-28 text-left">
                          City :
                        </span>
                        <span>{event.data.ville}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-28 text-left">
                          Country :
                        </span>
                        <span>{event.data.pays}</span>
                      </div>
                      <div className="flex sm:col-span-2">
                        <span className="font-medium w-28 text-left">
                          Disponibility :
                        </span>
                        <span
                          className={`px-3 py-1 rounded-md text-sm font-semibold ${
                            event.data.disponibilite === "available"
                              ? "bg-green-800 text-white"
                              : "bg-red-800 text-white"
                          }`}
                        >
                          {event.data.disponibilite}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Fenêtre de confirmation de suppression */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-75 bg-transparent z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Confirmer la suppression de cet événement ?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Message si l'utilisateur n'est pas connecté
        <div className="flex flex-1 justify-center items-center text-center mt-80">
          <p className="text-7xl text-gray-500">Vous ne passerez PAS!!!!!!!</p>
          <Link to={"/"}> Retourne D'où tu viens</Link>
        </div>
      )}
    </>
  );
};

export default Home;
