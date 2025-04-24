import { useState } from "react";
import styles from "./FeedBackForm.module.css";

export function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setTimeout(() => {
      if (name.trim() && message.trim()) {
        setSubmitted(true);
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Обратная связь</h1>
      
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="name">Имя:</label>
        <input
          className={styles.input}
          id="name"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="message">Сообщение:</label>
        <textarea
          className={styles.textarea}
          id="message"
          placeholder="Ваше сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      
      <button className={styles.button} onClick={handleSubmit}>
        Отправить
      </button>
      
      {submitted && (
        <div className={styles.successMessage}>
          Спасибо, {name}! Ваше сообщение отправлено.
        </div>
      )}
    </div>
  );
}