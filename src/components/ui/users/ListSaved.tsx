import { User, UsersListResponse } from "@/types";
import { useEffect, useState } from "react";
import Card from "./Card";
import Typography from "../global/Typography";
import Button from "../global/Button";
import { userApiInstance } from "@/lib/users/userApi";
import Loader from "../global/Loader";

export default function ListSaved() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [load, setLoad] = useState(false);

  const loadUsers = async (pageNumber: number) => {
    setLoad(true);
    try {
      const res = await userApiInstance.get(`list?page=${pageNumber}`);
      const data: UsersListResponse = res.data;

      if (pageNumber === 1) {
        setUsers(data.users);
      } else {
        setUsers((prev) => [...prev, ...data.users]);
      }

      setTotalUsers(data.totalUsers);
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    loadUsers(1);
  }, []);

  const handleLoadMore = () => {
    loadUsers(page + 1);
  };

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-neutral-800 p-6 ">
          <Typography variant="title">Saved Users</Typography>
          <div className="mt-5">
            {" "}
            {users.length === 0 ? (
              <Typography variant="text">No saved users.</Typography>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {users.map((user, index) => (
                  <>
                    {user.name && (
                      <Card key={index} user={user} savedUser={true} />
                    )}
                  </>
                ))}
              </div>
            )}
            {users.length < totalUsers && (
              <div className="mt-6 text-center">
                <Button onClick={handleLoadMore} variant="action">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
