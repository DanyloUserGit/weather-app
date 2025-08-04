import { userInstance } from "@/lib/users";
import { User } from "@/types";
import { useEffect, useState } from "react";
import Button from "../global/Button";
import Loader from "../global/Loader";
import Typography from "../global/Typography";
import Card from "./Card";

export default function List() {
  const [users, setUsers] = useState<User[]>([]);
  const [load, setLoad] = useState(false);

  const getUsers = async () => {
    setLoad(true);
    const res = await userInstance.get("?results=5");
    setUsers((prev) => [...prev, ...res.data.results]);
    setLoad(false);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {!load ? (
        <div className="min-h-screen bg-neutral-800 p-6 ">
          <Typography variant="title">User List</Typography>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <Card key={index} user={user} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button onClick={getUsers} variant="action">
              Load More
            </Button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
