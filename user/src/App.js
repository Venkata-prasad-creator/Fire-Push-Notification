import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { requestFCMToken, onMessageListener } from './utils/firebaseUtils';

function App() {
  const [fcmToken, setFcmToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState(null);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        setLoading(true);
        setError(null);
        setInstructions(null);
        const token = await requestFCMToken();
        setFcmToken(token);
      } catch(err) {
        if (err.type === 'NOTIFICATIONS_BLOCKED') {
          setError(err.message);
          setInstructions(err.instructions);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFCMToken();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const setupMessageListener = async () => {
      try {
        const unsubscribe = onMessageListener().then((payload) => {
          if (isSubscribed) {
            toast(
              <div>
                <strong>{payload.notification.title}</strong>
                <p>{payload.notification.body}</p>
              </div>,
              {position: "top-right"}
            );
            console.log("Received foreground message", payload);
          }
        });
        return unsubscribe;
      } catch (err) {
        if (isSubscribed) {
          console.error("error", err);
        }
      }
    };

    const messageListenerPromise = setupMessageListener();

    return () => {
      isSubscribed = false;
      messageListenerPromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, []);

  const handleRetry = () => {
    setError(null);
    setFcmToken(null);
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <div className="container firebase-form p-4">
        <div className="row">
          {loading && (
            <div className="col-md-12 mb-4">
              <div className="alert alert-info">
                Loading... Please wait while we request notification permissions.
              </div>
            </div>
          )}
          {error && (
            <div className="col-md-12 mb-4">
              <div className="alert alert-danger">
                <h4 className="alert-heading">{error}</h4>
                {instructions && (
                  <>
                    <hr />
                    <p className="mb-0">Follow these steps to enable notifications:</p>
                    <ol className="mt-2">
                      {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </>
                )}
                <hr />
                <button 
                  className="btn btn-outline-danger"
                  onClick={handleRetry}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          {fcmToken && (
            <div className="col-md-12 mb-4">
              <div className="alert alert-success">
                <h4 className="alert-heading">Successfully enabled notifications!</h4>
                <hr />
                <small className="text-muted">FCM Token: {fcmToken}</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
