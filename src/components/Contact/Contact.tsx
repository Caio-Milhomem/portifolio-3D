import { useState, useEffect } from "react";

import { Canvas } from "@react-three/fiber";

import { ContactScene, type ContactId } from "./ContactScene";
import { AvatarModel } from "../three/AvatarModel";
import "./Contact.css";

type ContactItem = {
  id: ContactId;
  name: string;
  icon: string;
  text: string;
  action: string;
};

const contacts: ContactItem[] = [
  {
    id: "whatsapp",

    name: "WhatsApp",

    icon: "/icons/whatsapp-icon.svg",

    text: "Para conversas rápidas, propostas ou para trocar uma ideia diretamente comigo.",

    action: "Abrir WhatsApp →",
  },

  {
    id: "email",

    name: "E-mail",

    icon: "/icons/email-icon.svg",

    text: "Para contatos profissionais, propostas, projetos ou assuntos que precisem de mais contexto.",

    action: "Enviar e-mail →",
  },

  {
    id: "linkedin",

    name: "LinkedIn",

    icon: "/icons/linkedin-icon.svg",

    text: "Acompanhe meus projetos, experiências e entre em contato comigo pelo LinkedIn.",

    action: "Abrir LinkedIn →",
  },
];

/* ==============================
   TYPING
============================== */

function TypingContactText({ text }: { text: string }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;

    setTypedText("");

    const interval = window.setInterval(() => {
      index += 1;

      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => {
      window.clearInterval(interval);
    };
  }, [text]);

  return (
    <p className="contact-info-text">
      {typedText}

      <span className="contact-typing-cursor">_</span>
    </p>
  );
}

/* ==============================
   CONTACT
============================== */

export function Contact() {
  const [openedContact, setOpenedContact] = useState<ContactId | null>(null);

  const selectedContact =
    contacts.find((contact) => contact.id === openedContact) ?? null;

  function selectContact(id: ContactId) {
    setOpenedContact((current) => (current === id ? null : id));
  }

  function closeContact() {
    setOpenedContact(null);
  }

  return (
    <section className="contact" id="contact">
      {/* ============================
          CANVAS ÚNICO
      ============================ */}

      <div className="contact-canvas">
        <Canvas
          dpr={1}
          frameloop="always"
          camera={{
            position: [0, 0.8, 7.5],

            fov: 45,
          }}
          onPointerMissed={closeContact}
          gl={{
            alpha: true,
            antialias: true,
          }}
        >
          <ContactScene
            contacts={contacts}
            openedContact={openedContact}
            onSelect={selectContact}
            onClose={closeContact}
          />
        </Canvas>
      </div>

      {/* ============================
          CAMADA HTML
      ============================ */}

      <div className="contact-info-layer">
        {selectedContact && (
          <div
            key={selectedContact.id}
            className={`
              contact-info-panel
              contact-info-panel--${selectedContact.id}
            `}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {/* TÍTULO */}

            <h2>{selectedContact.name}</h2>

            {/* TEXTO */}

            <TypingContactText text={selectedContact.text} />

            {/* AÇÃO */}

            <span className="contact-info-action">
              {selectedContact.action}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
