import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim() || !fcmToken.trim()) {
      toast.error('All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/firebase/send-notification', {
        title: title.trim(),
        body: body.trim(),
        deviceToken: fcmToken.trim()
      });

      if (response.data.success) {
        toast.success('Notification sent successfully!');
        // Clear form
        setTitle('');
        setBody('');
        setFcmToken('');
      }
    } catch (error) {
      toast.error('Failed to send notification.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="firebase-form">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingBody" label="Body" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingFcmToken" label="FCM Token" className="mb-3">
            <Form.Control
              type="text"
              placeholder="FCM Token"
              value={fcmToken}
              onChange={(e) => setFcmToken(e.target.value)}
            />
          </FloatingLabel>

          <Button 
            variant="primary" 
            type="submit" 
            className="full-width" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Notification'}
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
