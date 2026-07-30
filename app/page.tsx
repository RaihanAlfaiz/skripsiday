"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import LandingHero from "../components/LandingHero";
import MuseumLobby from "../components/MuseumLobby";
import VideoCinema from "../components/VideoCinema";
import PersonalExhibition from "../components/PersonalExhibition";
import HallOfMemories from "../components/HallOfMemories";
import MemoryMap from "../components/MemoryMap";
import VipPassBadge from "../components/VipPassBadge";
import Guestbook from "../components/Guestbook";
import TheTeam from "../components/TheTeam";
import EndingSection from "../components/EndingSection";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { Member } from "./api/members/route";
import { MediaItem } from "./api/gallery/route";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [selectedExhibition, setSelectedExhibition] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically fetch members metadata and gallery media from API routes
    async function fetchData() {
      try {
        const [membersRes, galleryRes] = await Promise.all([
          fetch("/api/members"),
          fetch("/api/gallery"),
        ]);

        const membersData = await membersRes.json();
        const galleryData = await galleryRes.json();

        if (membersData.members) setMembers(membersData.members);

        // Media items array (images + videos)
        if (galleryData.media && galleryData.media.length > 0) {
          setMediaList(galleryData.media);
          // All media sources array for gallery layouts
          setGalleryImages(galleryData.media.map((m: MediaItem) => m.src));
        } else if (galleryData.images) {
          setGalleryImages(galleryData.images);
          setMediaList(galleryData.images.map((src: string) => ({ src, type: "image" })));
        }
      } catch (err) {
        console.error("Failed to fetch museum archive data:", err);
      }
    }

    fetchData();
  }, []);

  const handleEnterMuseum = () => {
    const lobbyElem = document.getElementById("lobby-section");
    if (lobbyElem) {
      lobbyElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateNavbar = (target: string) => {
    if (target === "landing") {
      setSelectedExhibition(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "lobby") {
      setSelectedExhibition(null);
      setTimeout(() => {
        const lobbyElem = document.getElementById("lobby-section");
        if (lobbyElem) lobbyElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (target === "cinema") {
      setSelectedExhibition(null);
      setTimeout(() => {
        const cinemaElem = document.getElementById("cinema-section");
        if (cinemaElem) cinemaElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (target === "hall") {
      setSelectedExhibition("hall-of-memories");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "map") {
      setSelectedExhibition(null);
      setTimeout(() => {
        const mapElem = document.getElementById("map-section");
        if (mapElem) mapElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (target === "vip") {
      setSelectedExhibition(null);
      setTimeout(() => {
        const vipElem = document.getElementById("vip-section");
        if (vipElem) vipElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (target === "guestbook") {
      setSelectedExhibition(null);
      setTimeout(() => {
        const gbElem = document.getElementById("guestbook-section");
        if (gbElem) gbElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (target === "team") {
      setSelectedExhibition(null);
      setTimeout(() => {
        const teamElem = document.getElementById("team-section");
        if (teamElem) teamElem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const selectedMemberData = members.find((m) => m.id === selectedExhibition);

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      {/* 1. Cinematic Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          {/* Top Sticky Museum Navbar */}
          <Navbar
            currentView={selectedExhibition || "lobby"}
            onNavigate={handleNavigateNavbar}
          />

          {/* Exhibition View Transitions */}
          {selectedExhibition === "hall-of-memories" ? (
            <PageTransition viewKey="hall-of-memories">
              <HallOfMemories
                galleryImages={galleryImages}
                onBack={() => {
                  setSelectedExhibition(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </PageTransition>
          ) : selectedMemberData ? (
            <PageTransition viewKey="selected-member">
              <PersonalExhibition
                member={selectedMemberData}
                galleryImages={galleryImages}
                onBack={() => {
                  setSelectedExhibition(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </PageTransition>
          ) : (
            <PageTransition viewKey="museum-main">
              {/* Full Museum Tour Flow */}
              <LandingHero onEnter={handleEnterMuseum} />

              <MuseumLobby
                members={members}
                galleryImages={galleryImages}
                onSelectExhibition={(id) => {
                  setSelectedExhibition(id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Dedicated Video Cinema Theater Section */}
              <div id="cinema-section">
                <VideoCinema media={mediaList} />
              </div>

              <div id="map-section">
                <MemoryMap />
              </div>

              <div id="vip-section">
                <VipPassBadge members={members} />
              </div>

              <div id="guestbook-section">
                <Guestbook />
              </div>

              <div id="team-section">
                <TheTeam
                  members={members}
                  onSelectMember={(id) => {
                    setSelectedExhibition(id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>

              <EndingSection members={members} />
            </PageTransition>
          )}

          <Footer />
        </>
      )}
    </main>
  );
}
