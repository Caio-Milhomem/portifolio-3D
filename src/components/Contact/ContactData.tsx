import type { CSSProperties, ReactNode } from "react";

export type ContactId = "whatsapp" | "email" | "linkedin";

export type ContactOption = {
  id: ContactId;
  name: string;
  command: string;
  text: string;

  href: string;
  accentColor: string;
  icon: ReactNode;
};

type ContactIconProps = {
  src: string;
  size?: number;
  className?: string;
};

function ContactIcon({ src, size = 46, className = "" }: ContactIconProps) {
  return (
    <span
      className={`contact-key-icon ${className}`}
      style={
        {
          width: `${size}px`,
          height: `${size}px`,
          WebkitMaskImage: `url("${src}")`,
          maskImage: `url("${src}")`,
        } as CSSProperties
      }
    />
  );
}

export const contacts: ContactOption[] = [
  {
    id: "whatsapp",

    name: "WhatsApp",

    command: "contact --channel whatsapp",

    text: "Para conversas rápidas, propostas, oportunidades, projetos ou simplesmente para trocar uma ideia.",

    // TROQUE PELO SEU NÚMERO
    href: "https://wa.me/SEU_NUMERO",

    accentColor: "#25d366",

    icon: (
      <ContactIcon
        src="/icons/whatsapp-icon.svg"
        size={48}
        className="contact-key-icon--whatsapp"
      />
    ),
  },

  {
    id: "email",

    name: "E-mail",

    command: "contact --channel email",

    text: "Para contatos profissionais, propostas, projetos ou assuntos que precisem de mais contexto.",

    // TROQUE PELO SEU E-MAIL
    href: "mailto:SEU_EMAIL",

    accentColor: "rgb(233, 156, 41)",

    icon: (
      <ContactIcon
        src="/icons/email-icon.svg"
        size={46}
        className="contact-key-icon--email"
      />
    ),
  },

  {
    id: "linkedin",

    name: "LinkedIn",

    command: "contact --channel linkedin",

    text: "Acompanhe minha trajetória profissional, experiências e projetos ou entre em contato comigo pelo LinkedIn.",

    // TROQUE PELO SEU LINKEDIN
    href: "https://www.linkedin.com/in/SEU_USUARIO",

    accentColor: "#0a66c2",

    icon: (
      <ContactIcon
        src="/icons/linkedin-icon.svg"
        size={45}
        className="contact-key-icon--linkedin"
      />
    ),
  },
];
