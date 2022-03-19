import { useState } from 'react';
import Avatar from './avatar';
import '../styles/composeform.css';

function ComposeForm({ onSubmit }) {
  const [editorValue, setEditorValue] = useState('');
  const handleEditorValueChange = (e) => setEditorValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editorValue);
    setEditorValue('');
  }

  return (
    <form className="compose-form" onSubmit={handleSubmit}>
      <div className="compose-form-container">
        <Avatar />
        <textarea
          value={editorValue}
          onChange={handleEditorValueChange}
          className="compose-form-textarea"
          placeholder="Tweet now!"
        />
      </div>
      <button className="compose-form-submit">Tweet</button>
    </form>
  )
}

export default ComposeForm