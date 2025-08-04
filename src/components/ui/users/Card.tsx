import { User } from "@/types";
import { useState } from "react";
import Button from "../global/Button";
import Typography from "../global/Typography";
import Modal from "../weather/Modal";
import { userApiInstance } from "@/lib/users/userApi";
import Image from "next/image";

export default function Card({
  user,
  savedUser = false,
}: {
  user: User;
  savedUser?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const [showWeather, setShowWeather] = useState(false);

  const handleSave = async () => {
    try {
      const { data } = await userApiInstance.post("save", user);
      if (data.success) {
        setSaved(true);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="bg-neutral-700 rounded-xl shadow p-4 flex flex-col items-center text-center">
      <Image
        src={user.picture.large}
        className="w-24 h-24 rounded-full mb-4"
        alt="Profile"
      />
      <Typography variant="title">
        {user.name.first} {user.name.last}
      </Typography>
      <Typography variant="text">{user.gender}</Typography>
      <Typography variant="text">
        {user.location.city}, {user.location.country}
      </Typography>
      <Typography className="max-[640px]:text-[12px]" variant="link">
        {user.email}
      </Typography>

      <div className="mt-4 flex gap-2">
        {!savedUser && (
          <Button onClick={handleSave} disabled={saved} variant="action">
            {saved ? "Saved" : "Save"}
          </Button>
        )}
        <Button onClick={() => setShowWeather(true)}>Weather</Button>
      </div>

      {showWeather && (
        <Modal
          lat={user.location.coordinates.latitude}
          lon={user.location.coordinates.longitude}
          onClose={() => setShowWeather(false)}
        />
      )}
    </div>
  );
}
