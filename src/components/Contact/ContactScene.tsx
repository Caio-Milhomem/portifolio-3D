import { useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";

import { Environment, ContactShadows } from "@react-three/drei";

import * as THREE from "three";

import { AvatarModel } from "../three/AvatarModel";

import { ContactIcon3D, type ContactIconName } from "./ContactIcon3D";

export type ContactId = ContactIconName;

type ContactData = {
  id: ContactId;
  icon: string;
};

type ContactSceneProps = {
  contacts: ContactData[];

  openedContact: ContactId | null;

  onSelect: (id: ContactId) => void;

  onClose: () => void;
};

/* ==============================
   POSIÇÕES
============================== */

const CONTACT_POSITIONS: Record<ContactId, [number, number, number]> = {
  whatsapp: [2, 1.4, 0],

  email: [2, 0, 0],

  linkedin: [2, -1.4, 0],
};

/* ==============================
   FASE DA ANIMAÇÃO

   Evita que os 3 objetos
   flutuem exatamente juntos.
============================== */

type ContactObjectProps = {
  id: ContactId;
  src: string;

  position: [number, number, number];

  opened: boolean;

  onSelect: (id: ContactId) => void;
};

function ContactObject({
  id,
  src,
  position,
  opened,
  onSelect,
}: ContactObjectProps) {
  const objectGroup = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);

  /*
   * Intensidade suavizada do hover.
   *
   * 0 = animação normal
   * 1 = animação agitada
   */
  const hoverStrength = useRef(0);

  const [baseX, baseY, baseZ] = position;

  useFrame((_, delta) => {
    hoverStrength.current = THREE.MathUtils.damp(
      hoverStrength.current,
      hovered ? 1 : 0,
      5,
      delta,
    );

    const hover = hoverStrength.current;

    if (!objectGroup.current) {
      return;
    }

    /*
     * Ícone parado na posição original.
     */
    objectGroup.current.position.set(baseX, baseY, baseZ);

    /*
     * Reação simples no hover.
     */
    const targetScale = THREE.MathUtils.lerp(1, 1.08, hover);

    const smoothScale = THREE.MathUtils.damp(
      objectGroup.current.scale.x,
      targetScale,
      6,
      delta,
    );

    objectGroup.current.scale.setScalar(smoothScale);

    /*
     * Pequena inclinação apenas no hover.
     */
    const targetRotation = hovered ? 0.06 : 0;

    objectGroup.current.rotation.z = THREE.MathUtils.damp(
      objectGroup.current.rotation.z,
      targetRotation,
      6,
      delta,
    );
  });

  return (
    <>
      {/* ============================
          SOMBRA
      ============================ */}

      <ContactShadows
        position={[baseX, baseY - 0.48, baseZ - 0.35]}
        opacity={0.3}
        scale={1.6}
        blur={2.5}
        far={1.8}
      />

      {/* ============================
          OBJETO
      ============================ */}

      <group
        ref={objectGroup}
        position={position}
        onPointerOver={(event) => {
          event.stopPropagation();

          setHovered(true);

          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(event) => {
          event.stopPropagation();

          setHovered(false);

          document.body.style.cursor = "default";
        }}
        onClick={(event) => {
          event.stopPropagation();

          onSelect(id);
        }}
      >
        {/* ============================
            HITBOX INVISÍVEL
        ============================ */}

        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[1.25, 1.25]} />

          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* ============================
            ÍCONE 3D
        ============================ */}

        <ContactIcon3D src={src} icon={id} />

        {/* ============================
            ESTADO ABERTO
        ============================ */}

        {opened && null}
      </group>
    </>
  );
}

/* ==============================
   CONTACT SCENE
============================== */

export function ContactScene({
  contacts,
  openedContact,
  onSelect,
  onClose,
}: ContactSceneProps) {
  return (
    <>
      {/* ============================
          CLICK CATCHER

          Plano invisível atrás da
          cena inteira.

          Clicar fora dos ícones
          fecha o painel.
      ============================ */}

      <mesh
        position={[0, 0, -3]}
        onClick={(event) => {
          event.stopPropagation();

          onClose();
        }}
      >
        <planeGeometry args={[20, 12]} />

        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* ============================
          LUZES
      ============================ */}

      <ambientLight intensity={0.45} />

      <directionalLight position={[-3, 6, 5]} intensity={0.85} />

      <directionalLight position={[5, 2, 4]} intensity={0.4} />

      <Environment preset="studio" environmentIntensity={0.15} />

      {/* ============================
          PERSONAGEM
      ============================ */}

      <AvatarModel
        scale={2.5}
        position={[-2.25, -2.15, 0]}
        rotation={[0, 0, 0]}
        activeAction="idle.001"
        followMouse={true}
      />

      {/* ============================
          CONTATOS
      ============================ */}

      {contacts.map((contact) => (
        <ContactObject
          key={contact.id}
          id={contact.id}
          src={contact.icon}
          position={CONTACT_POSITIONS[contact.id]}
          opened={openedContact === contact.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
