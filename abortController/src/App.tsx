import { useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

type FetchStatus =
  | 'idle'
  | 'pending'
  | 'error'
  | 'success'
  | 'delayed'
  | 'cancelled';

type User = {
  name: string;
};

function App() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('idle');
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<number | null>(null);

  async function getUsers() {
    const controller = new AbortController();
    controllerRef.current = controller;
    setFetchStatus('pending');

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setFetchStatus('delayed');
    }, 2000);

    try {
      const response = await fetch(
        'https://hub.dummyapis.com/delay?seconds=10',
        {
          signal: controllerRef.current.signal,
        }
      );
      console.log(response)

      const resUsers = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          signal: controllerRef.current.signal,
        }
      );
      if (controllerRef.current.signal.aborted) {
        setFetchStatus('cancelled');
        return;
      }

      const dataUsers = await resUsers.json();
      console.log(dataUsers)
      setFetchStatus('success');
      setUsers(dataUsers);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setFetchStatus('cancelled');
      } else {
        // Other types of errors
        setFetchStatus('error');
        console.error('Error fetching users:', error);
      }
    } finally {
      // Clear the timeout after the request is completed
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Abort Controller</h1>
      <div className="card">
        <button
          onClick={getUsers}
          disabled={fetchStatus === 'delayed' || fetchStatus === 'pending'}
        >
          Load Users
        </button>
        {fetchStatus === 'delayed' && (
          <>
            <div>Request is artificially delayed. It will took 10 secs</div>
            <button onClick={() => controllerRef?.current?.abort()}>
              Cancel Request
            </button>
          </>
        )}
        {fetchStatus === 'cancelled' && <div>Cancelled !</div>}
        {fetchStatus === 'error' && <div>Error !</div>}
        {fetchStatus === 'success' && (
          <pre>{users?.map((e: User) => <p key={e.name}>{e.name}</p>)}</pre>
        )}
        <h3>fetchStatus : {fetchStatus}</h3>
      </div>
    </>
  );
}

export default App;
