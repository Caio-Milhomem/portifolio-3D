import { useState } from "react";

import { TechKeyButton } from "../ui/TechKeyButton/TechKeyButton";

import { TerminalWindow } from "../ui/TerminalWindow/TerminalWindow";

import { contacts, type ContactId } from "./ContactData";

import "./Contact.css";

/* ==============================
   CONTACT
============================== */

export function Contact() {
  const [activeContact, setActiveContact] = useState<ContactId | null>(null);

  const selectedContact = activeContact
    ? (contacts.find((contact) => contact.id === activeContact) ?? null)
    : null;

  const isOpen = selectedContact !== null;

  function toggleContact(id: ContactId) {
    setActiveContact((current) => (current === id ? null : id));
  }

  function closeContact() {
    setActiveContact(null);
  }

  return (
    <section
      className={`contact ${isOpen ? "contact--active" : "contact--idle"}`}
      id="contact"
      onClick={closeContact}
    >
      {/* ============================
          TERMINAL
      ============================ */}

      <div
        className={`contact-terminal ${
          selectedContact ? `contact-terminal--${selectedContact.id}` : ""
        }`}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {selectedContact && (
          <TerminalWindow
            key={selectedContact.id}
            open
            title="contact.exe"
            command={selectedContact.command}
            heading={selectedContact.name}
            text={selectedContact.text}
            confirmQuestion={`Digite S se quiser entrar em contato pelo ${selectedContact.name} ou N para voltar.`}
            onConfirmYes={() => {
              const href = selectedContact.href;

              /*
               * Primeiro volta a interface
               * para o estado inicial.
               *
               * Isso também desmonta o
               * TerminalWindow e zera todos
               * os estados internos dele.
               */
              closeContact();

              if (href.startsWith("mailto:")) {
                window.location.href = href;

                return;
              }

              window.open(href, "_blank", "noopener,noreferrer");
            }}
            onConfirmNo={() => {
              closeContact();
            }}
            onClose={closeContact}
          />
        )}
      </div>

      {/* ============================
          BOTÕES
      ============================ */}

      <div
        className="contact-key-list"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-key-wrapper contact-key-wrapper--${contact.id}`}
          >
            <TechKeyButton
              icon={contact.icon}
              active={activeContact === contact.id}
              onClick={() => toggleContact(contact.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
