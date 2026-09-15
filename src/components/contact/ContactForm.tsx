"use client";

import { useActionState, useState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import styles from "./ContactForm.module.css";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [hasReset, setHasReset] = useState(false);

  if (state.success && !hasReset) {
    return (
      <div className={styles.successBanner} role="status" aria-live="polite">
        <h3 className={styles.successHeading}>Dispatch Confirmed</h3>
        <p className={styles.successText}>
          {state.message || "Thank you for reaching out. Your inquiry has been transmitted."}
        </p>
        <button
          type="button"
          onClick={() => setHasReset(true)}
          className={styles.resetBtn}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <form action={formAction} className={styles.form} noValidate>
        {/* Anti-spam honeypot */}
        <div aria-hidden="true" className={styles.honeypot}>
          <label htmlFor="_hp">Leave this field blank</label>
          <input
            type="text"
            id="_hp"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.fieldRow}>
          {/* Name Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              <span>Name</span>
              <span className={styles.requiredIndicator} aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isPending}
              placeholder="e.g. Maya Chen"
              aria-invalid={!!state.errors?.name}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
              className={styles.input}
            />
            {state.errors?.name && (
              <p id="name-error" className={styles.fieldError} role="alert">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              <span>Email</span>
              <span className={styles.requiredIndicator} aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isPending}
              placeholder="e.g. name@organization.com"
              aria-invalid={!!state.errors?.email}
              aria-describedby={state.errors?.email ? "email-error" : undefined}
              className={styles.input}
            />
            {state.errors?.email && (
              <p id="email-error" className={styles.fieldError} role="alert">
                {state.errors.email[0]}
              </p>
            )}
          </div>
        </div>

        {/* Project Scope / Topic */}
        <div className={styles.fieldGroup}>
          <label htmlFor="scope" className={styles.label}>
            <span>Inquiry Scope</span>
          </label>
          <select
            id="scope"
            name="scope"
            disabled={isPending}
            defaultValue="Engineering Engagement"
            className={styles.select}
          >
            <option value="Engineering Engagement">Full-Stack / Frontend Engineering</option>
            <option value="Technical Architecture">Architecture & Systems Consulting</option>
            <option value="Contract Project">Product Contract & Development</option>
            <option value="General Conversation">General Conversation & Exchange</option>
          </select>
        </div>

        {/* Message Field */}
        <div className={styles.fieldGroup}>
          <label htmlFor="message" className={styles.label}>
            <span>Message</span>
            <span className={styles.requiredIndicator} aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={isPending}
            placeholder="Outline your project scope, timeline, requirements, or inquiry..."
            aria-invalid={!!state.errors?.message}
            aria-describedby={state.errors?.message ? "message-error" : undefined}
            className={styles.textarea}
          />
          {state.errors?.message && (
            <p id="message-error" className={styles.fieldError} role="alert">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        {/* Form Footer */}
        <div className={styles.formFooter}>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitBtn}
          >
            <span>{isPending ? "Transmitting..." : "Transmit Inquiry"}</span>
            <span aria-hidden="true">→</span>
          </button>
          <p className={styles.disclaimer}>
            Zero spam. Directly routed to primary inbox.
          </p>
        </div>
      </form>
    </div>
  );
}
